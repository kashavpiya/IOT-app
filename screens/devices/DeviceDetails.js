import React, { useState, useRef, useContext, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from "../../shared/Constant";
import { DeviceContext } from "../../states/device/DeviceContext";
import TopNavBar from "../../components/TopNavBar";
import DeviceSettings from "./components/DeviceSettings";
import DeviceSelection from "./components/DeviceSelection";
import RenameDialog from "./components/RenameDialog";
import AddUserDialog from "./components/AddUserDialog";
import TemperatureDialog from "./components/TemperatureDialog";
import GoogleNestDialog from "./components/GoogleNestDialog";
import AlexaDialog from './components/AlexaDialog';

import * as Notifications from 'expo-notifications';




const DeviceDetails = ({ route, navigation }) => {
  const device = route.params.data;
  const { startShower } = useContext(DeviceContext);
  const [name, setName] = useState(device.name);
  const [newName, setNewName] = useState(device.name);
  const [renameDialog, setRenameDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [tempDialog, setTempDialog] = useState(false);
  const [gglNestDialog, setGglNestDialog] = useState(false);
  const [alexaDialog, setAlexaDialog] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [dotColor, setDotColor] = useState('gray');
  const [waiting, setWaiting] = useState(false); // New state for waiting

  const [currentTime, setCurrentTime] = useState(new Date());

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null, // Send immediately
    });
  };

  const start = async (command) => {
    try {
      if (command === 'SHOWERPREHEAT') {
        setWaiting(true); // Update state to indicate "Waiting" state
      }
      await startShower(device.id, command);
      if (command === 'SHOWEROFF') {
        setMessage(`Stopped ${device.name} successfully`);
        setConnected(false);
      } else {
        setMessage(`Started ${device.name} successfully`);
        setConnected(true);
      }

      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: device.timezone, // Add the device's timezone
        })
      );
      console.log(currentTime);
      
      

      if (command === 'SHOWERPREHEAT') {
        setTimeout(() => {
          setConnected(true);
          setWaiting(false); // Update state to end "Waiting" state
          sendNotification('Shower is Ready!', `${device.name} is now ready.`);
        }, 10000);
        
      }
      // Simulate a delay of 10 seconds
      
    } catch (error) {
      setMessage(`Error starting ${device.name}`);
      setConnected(false);
      setWaiting(false); // Update state to end "Waiting" state in case of error
    }
  };

  useEffect(() => {
    if (connected) setDotColor('green');
    else setDotColor('gray');
    setName(newName);
    device.name = newName;

    // Add this code to handle notifications when the app is in the foreground
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);
    return () => subscription.remove();
  }, [connected, newName]);

  const handleNotification = (notification) => {
    // Handle the received notification when the app is in the foreground
    console.log(notification);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <TopNavBar />
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            name='chevron-left'
            size={24}
            color={ELECTRIC_BLUE}
            onPress={() => navigation.navigate('AllDevices')}
            style={{
              marginTop: height(3),
            }}
          />
          <Text style={styles.deviceName}>
            {name}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{ fontSize: 14, textDecorationLine: 'underline', fontFamily: 'NunitoSans_400Regular', marginRight: width(2) }}>
            Connected
          </Text>
          <MaterialCommunityIcons name='circle' color={dotColor} size={8} />
        </View>

        <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 999,
            borderWidth: 10,
            borderColor: (waiting) ? 'grey' : ELECTRIC_BLUE,
            marginTop: height(3),
          }}
          onPress={() => start('SHOWERPREHEAT')}
          disabled={waiting} // Disable the button during the "Waiting" state
        >
          <View style={styles.buttonContainer}>
            {waiting ? (
              <>
                <MaterialCommunityIcons name='thermometer-plus' size={50} color={'white'} />
                <Text style={styles.startWaiting}>Waiting</Text>
              </>
              
            ) : (
              <>
                <MaterialCommunityIcons name='thermometer-plus' size={50} color={ELECTRIC_BLUE} />
                <Text style={styles.start}>PreHeat</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      

      <TouchableOpacity
            style={styles.button}
            onPress={() => start('SHOWERON')}
          >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons name='shower-head' size={50} color={ELECTRIC_BLUE} />
              <Text style={styles.start}>Start</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => start('SHOWEROFF')}
          >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons name='shower-head' size={50} color={ELECTRIC_BLUE} />
              <Text style={() => styles.start}>Stop</Text>
            </View>
          </TouchableOpacity>
          </View>


        <DeviceSettings
          navigation={navigation}
          deviceId={device.id}
          setRenameDialog={setRenameDialog}
          setAddUserDialog={setAddUserDialog}
          setTempDialog={setTempDialog}
/*           setGglNestDialog={setGglNestDialog}
          setAlexaDialog={setAlexaDialog} */
        />
      </ScrollView>
      <Portal>
        <RenameDialog
          currentName={name}
          deviceId={device.id}
          rename={setNewName}
          renameDialog={renameDialog}
          setRenameDialog={setRenameDialog}
          setMessage={setMessage}
        />
        <AddUserDialog
          addUserDialog={addUserDialog}
          deviceId={device.id}
          setAddUserDialog={setAddUserDialog}
          setMessage={setMessage}
        />
        <TemperatureDialog
          tempDialog={tempDialog}
          setTempDialog={setTempDialog}
        />
{/*         <GoogleNestDialog
          gglNestDialog={gglNestDialog}
          setGglNestDialog={setGglNestDialog}
        />
        <AlexaDialog
          alexaDialog={alexaDialog}
          setAlexaDialog={setAlexaDialog}
        /> */}
      </Portal>

      {message &&
        <Snackbar
          visible={message !== ''}
          onDismiss={() => setMessage('')}
          duration={3000}
        >
          {message}
        </Snackbar>
      }
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  startButtonContainer: {
    alignItems: 'center',
    marginBottom: height(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width(5)
  },
  deviceName: {
    fontSize: 20,
    color: ELECTRIC_BLUE,
    marginTop: height(3),
    fontFamily: 'NunitoSans_400Regular'
  },
  start: {
    fontSize: 15,
    color: ELECTRIC_BLUE,
    fontFamily: 'NunitoSans_400Regular'
  },
  startWaiting: {
    fontSize: 15,
    color: ELECTRIC_BLUE,
    fontFamily: 'NunitoSans_400Regular',
    top: -23
  },
  buttonContainer: {
    alignItems: 'center',
  },
  
  button: {
   backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 10,
    borderColor: ELECTRIC_BLUE,
    marginTop: height(3),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height(1),
    justifyContent: 'center'
  },
});

export default DeviceDetails;