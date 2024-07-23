import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllDevices from '../screens/devices/AllDevices';
import DeviceDetails from '../screens/devices/DeviceDetails';
import Battery from '../screens/devices/Battery';
import History from '../screens/devices/History';
import Timer from '../screens/devices/timer';
import { DeviceContext } from '../states/device/DeviceContext';
import NewStart from '../screens/devices/NewStart';
import NewSettings from '../screens/devices/NewSettings';
import Temperature from '../screens/devices/Temperature';
import Sensor from '../screens/devices/Sensor';
import TapInformation from '../screens/devices/TapInformation';
import Shower from '../screens/devices/Shower';
import TapMode from '../screens/devices/TapMode';

const DevicesStack = createStackNavigator();

const DevicesNavigator = () => {
  const { devices } = useContext(DeviceContext);

  const deviceScreens = [
    {
      name: 'AllDevices',
      component: AllDevices,
      options: {
        headerShown: false,
      },
    },
    ...Object.keys(devices).map((id) => ({
      name: `Settings_${id}`,
      component: NewSettings,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `DeviceDetails_${id}`,
      component: DeviceDetails,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `Battery_${id}`,
      component: Battery,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `History_${id}`,
      component: History,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `TapMode_${id}`,
      component: TapMode,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `Timer_${id}`,
      component: Timer,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `NewStart_${id}`,
      component: NewStart,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `Shower_${id}`,
      component: Shower,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `Temperature_${id}`,
      component: Temperature,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `Sensor_${id}`,
      component: Sensor,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
    ...Object.keys(devices).map((id) => ({
      name: `TapInformation_${id}`,
      component: TapInformation,
      initialParams: { data: devices[id] },
      options: { headerShown: false },
    })),
  ];

  return (
    <DevicesStack.Navigator initialRouteName="AllDevices">
      {deviceScreens.map((device) => (
        <DevicesStack.Screen key={device.name} {...device} />
      ))}
    </DevicesStack.Navigator>
  );
};

export default DevicesNavigator;
