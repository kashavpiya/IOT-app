import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DeviceContext } from './DeviceContext';
import { AuthContext } from '../auth/AuthContext';


const DeviceProvider = ({ children }) => {
  const { state } = useContext(AuthContext);
  const { accessToken } = state.user;
  const userId = state.user ? state.user.id : null;
  const username = state.user ? state.user.username : null;

  console.log("logggingg");
  console.log(userId);
  console.log(username);

  const [devices, setDevices] = useState({});
  const [selectedTemperature, setSelectedTemperature] = useState(90);
  

  useEffect(() => {
    console.log(accessToken);
    const allDevices = async () => {
      try {
        const response = await axios({
          method: 'POST',
          url: 'https://api.powershower.net/api/iot/user/query',
          headers: { 'Authorization': `Bearer ${accessToken}` },
          data: {
            'userId': userId,
            'username': username
          }
        });
        const deviceList = response.data.deviceList.reduce((acc,device) => {
          acc[device.deviceId] = {
            id: device.deviceId,
            name: device.deviceName,
            shared: device.shared,
            valid: device.valid,
            temp: device.temp,
            idlet: device.idlet,
            maxwater: device.maxwater,
            mode: device.mode,
            rg: device.rg
          };
          return acc;
        }, {});
        setDevices(deviceList);
      } catch (error) {
        console.log(error.response);
      }
    }
    allDevices();
  }, []);

  const addDevice = async (deviceData) => {
    const reqBody = {
      'deviceId': deviceData.id,
      'shared': 'false',
      'valid': 'true',
      'device_name': deviceData.name,
      'pin': deviceData.pin,
      'userId': userId
    };
    console.log(reqBody);
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/addDevice',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: reqBody,        
      });
      setDevices({
        ...devices,
        id: deviceData,
      });
      return res.data.message;
    } catch(error) {
      console.log(error);
    }
  };

  const startShower = async (id, command) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/device/showerControl',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {
          "device_id": id,
          "command": command,
          // "temp": temperature
        }
      });
      console.log(response.data.message);
    } catch (error) { 
      console.log(error.message);
    }
  };


  const getStatus = async (id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://api.powershower.net/api/iot/user/queryDeviceId?deviceId=${id}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getSavings = async () => {
    try {
      console.log("api called with", username, userId)
      const response = await axios({
        method: 'GET',
        url: `https://api.powershower.net/api/iot/user/querySaving?userId=${userId}&username=${username}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getNewSavings = async () => {
    try {
      console.log("api called with", username, userId)
      const response = await axios({
        method: 'GET',
        url: `https://api.powershower.net/api/iot/user/queryNewSaving?userId=${userId}&username=${username}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const getHistory = async () => {
    try {
      console.log("api called with", username, userId)
      const response = await axios({
        method: 'GET',
        url: `https://api.powershower.net/api/iot/user/queryAllHistory?userId=${userId}&username=${username}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const changeDeviceName = async (id, newName) => {
    const device = devices[id];
    const data = {
      deviceId: device.id,
      device_name: newName,
      shared: device.shared,
      valid: device.valid,
      pin: device.pin,
      userId: userId
    };
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/updateDevice',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: data
      });
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  const shareDevice = async (deviceId, username) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/shareDevice?username='
              + username + '&deviceId=' + deviceId + '&userId='+ userId,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      return error.response.data;
    }
  }

  const updateSelectedTemperature = (temperature) => {
    setSelectedTemperature(temperature);
    console.log(temperature);
  };

  const updateSettings = async (id, temp, idlet, maxwater, mode, rg) => {
    if (idlet === null && temp !== null) {
      idlet = devices[id].idlet;
      maxwater = devices[id].maxwater;
      mode = devices[id].mode;
      rg = devices[id].rg;
    }
    if (idlet === null && mode !== null) {
      idlet = devices[id].idlet;
      maxwater = devices[id].maxwater;
      temp = devices[id].temp;
      rg = devices[id].rg;
    }
    if (idlet === null && rg !== null) {
      idlet = devices[id].idlet;
      maxwater = devices[id].maxwater;
      temp = devices[id].temp;
      mode = devices[id].mode;
    }
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/settingDeviceInfo',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {
          "device_id": id,
          "temp": temp,
          "idlet": idlet,
          "mode": mode,
          "rg": rg,
          "maxwater": maxwater,
          "userId": userId,
          "username": username
        }
      });
      console.log(response.data.message);
    } catch (error) { 
      console.log(error.message);
    }
  };

  const deleteUser = async (targetUserId) => {
    console.log(targetUserId);
    
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/delete-user',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {
          'userId': targetUserId
        }
      });
      AsyncStorage.removeItem('userData');
      setState(state => ({
        ...state,
        user: null,
        isAuthenticated: false,
        loading: true,
      }));
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }
  
  const getNotifications = async (id) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.powershower.net/api/notification/push?device_id=${id}'
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.powershower.net/api/iot/user/query',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {
          'userId': userId,
          'username': username
        }
      });
      const deviceList = response.data.deviceList.reduce((acc, device) => {
        acc[device.deviceId] = {
          id: device.deviceId,
          name: device.deviceName,
          shared: device.shared,
          valid: device.valid,
          temp: device.temp,
          idlet: device.idlet,
          maxwater: device.maxwater,
          mode: device.mode,
          rg: device.rg
        };
        return acc;
      }, {});
      setDevices(deviceList);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkDeviceConnection = async (deviceId) => {
    try {
      const response = await axios.get(`https://api.powershower.net/api/iot/device/connection-status?deviceId=${deviceId}`);
      console.log(response.data.connected);
      return response.data.connected;
    } catch (error) {
      console.log('fail');
      console.log(error);
      return false;
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `https://api.powershower.net/api/iot/user/deleteDevice?deviceId=${deviceId}&userId=${userId}`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <DeviceContext.Provider
      value={{
        devices,
        addDevice,
        startShower,
        getHistory,
        changeDeviceName,
        shareDevice,
        updateSelectedTemperature,
        getStatus,
        updateSettings,
        getNotifications,
        fetchDevices,
        getSavings,
        checkDeviceConnection,
        deleteDevice,
        deleteUser,
        getNewSavings,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
 
export default DeviceProvider;