import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DeviceContext } from '../../states/device/DeviceContext';
import logo from '../../assets/logoformobile.png'; 
import { height, width } from 'react-native-dimension';
import { Snackbar } from 'react-native-paper';
import { Audio } from 'expo-av';
import { SvgXml } from 'react-native-svg';
import { scheduleNotificationAsync, Notifications } from 'expo-notifications';
import SwitchSelector from 'react-native-switch-selector';
import { ELECTRIC_BLUE } from '../../shared/Constant';

const NewStart = ({ navigation, route }) => {
    const device = route.params.data;
    const { startShower, selectedTemperature, getStatus, fetchDevices, updateSettings, checkDeviceConnection } = useContext(DeviceContext);
    const [name, setName] = useState(device.name);
    const [waiting, setWaiting] = useState(false);
    const [ready, setReady] = useState(false);
    const [connected, setConnected] = useState(false);
    const [batteryStatus, setBatteryStatus] = useState('full');
    const [message, setMessage] = useState('');
    const [sound, setSound] = useState();
    const [svgColor, setSvgColor] = useState(device.mode === 0 ? '#3C54F2' : 'grey');
    const [mode, setMode] = useState(device.mode);
    const [resp, setResp] = useState();
    const [notificationSent, setNotificationSent] = useState(false);


    //For DEBUG purposes, hide on main build
    const [statusResponse, setStatusResponse] = useState('');
    const [statusResponse2, setStatusResponse2] = useState('');



    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="${'white'}">
      <path d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z"/>
    </svg>
`;

  const options = [
    
    { label: 'Sensor', value: 0 },
    { label: 'Tap', value: 1 },
  ];


  useEffect(() => {
    if (device.mode !== undefined) {
      setMode(device.mode);
    }
  }, [device.mode]);
    


    useEffect(() => {
      const fetchData = async () => {
          await fetchDevices();
      };

      fetchData();
  }, []);

    useEffect(() => {
      setSvgColor(device.mode === 0 ? '#3C54F2' : 'grey');
    }, [device.mode]);  

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/bubble-pop.mp3') 
      );
      setSound(sound);
    };

    const calculateBatteryPercentage = (voltage) => {
      let abv = voltage - 3.5;
      if (abv < 0) {
        abv = 0;
      }
    
      const batteryPercentage = Math.min(Math.max((abv / (4.1 - 3.5)) * 100, 0), 100);
      return batteryPercentage;
    };

    const checkDeviceStatus = async () => {
      try {
        const deviceId = device.id;
        const response = await getStatus(deviceId);
        setResp(response);
  
        if (response && response.payload) {
          //For DEBUG purposes, hide on main build
          setStatusResponse(`Device Status: ${JSON.stringify(response)}`);

          setStatusResponse2(`mode: ${mode}, name: ${device.name}`);
          
          // Device is connected
          // setConnected(true);
          if (response.payload.v !== undefined) {
            setBatteryStatus(calculateBatteryPercentage(response.payload.v));
          }
  
          // Check if the status is 3
          if (response.payload.status === 3) {
            // Set ready to true
            setReady(true);
            setWaiting(false);
            setNotificationSent(true);

            setTimeout(() => {
              setNotificationSent(false);
            }, 120000); // 60 seconds

            await scheduleNotificationAsync({
              content: {
                  title: 'Shower is Ready!',
                  body: `${device.name} is now ready.`,
              },
              trigger: null, // Send immediately
            });
          } else {
            // If status is not 3, set ready to false
            setReady(false);
          }
        } else {
          // Device is disconnected
          // setConnected(false);
        }
      } catch (error) {
        // Handle error
        console.error("Error checking device status:", error);
        setConnected(false); // Assume device is disconnected in case of an error
      }
    };

    useEffect(() => {
      
    
      // Call checkDeviceStatus immediately and then set up the interval
      checkDeviceStatus();
    
      // Set up the interval to check device status periodically
      const interval = setInterval(checkDeviceStatus, 5000); // Check every 5 seconds
    
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, [device.id, getStatus]);
    

    useEffect(() => {
      const checkDeviceConnectionForDevice = async (deviceId) => {
        try {
          const isConnected = await checkDeviceConnection(deviceId);
          console.log(`Device ${deviceId} connected:`, isConnected);
          setConnected(isConnected);
        } catch (error) {
          console.error(`Error checking device connection for device ${deviceId}:`, error);
        }
      };
    
      // Call checkDeviceConnectionForDevice with device.id
      if (device.id) {
        checkDeviceConnectionForDevice(device.id);
      }
    }, [device.id, checkDeviceConnection]);
    


    useEffect(() => {
      if (ready) {
        // Play ding sound when device is ready
        sound && sound.replayAsync();
      }
    }, [ready]);

    const getBatteryColor = (batteryValue) => {
      if (batteryValue >= 0 && batteryValue <= 20) {
          return '#FC0000';
      } else if (batteryValue > 20 && batteryValue <= 70) {
          return '#F47A00';
      } else {
          return 'white';
      }
    };

    const getBatteryIcon = (batteryValue) => {
      if (batteryValue >= 0 && batteryValue <= 20) {
          return 'battery-10';
      } else if (batteryValue > 20 && batteryValue <= 50) {
          return 'battery-50';
      } else if (batteryValue > 50 && batteryValue <= 80) {
          return 'battery-80';
      } else {
          return 'battery';
      }
    };

    const start = async (command) => {
        try {
          if (command === 'SHOWERPREHEAT') {
            setWaiting(true); // Update state to indicate "Waiting" state
          }
          await startShower(device.id, command);
          if (command === 'SHOWEROFF') {
            setMessage(`Stopped ${device.name} successfully`);
            setReady(false);
            setWaiting(false);
            
          } else {
            setMessage(`Started ${device.name} successfully`);
            
          }
    
          
          
        } catch (error) {
          setMessage(`Error starting ${device.name}`);
          
          setWaiting(false); // Update state to end "Waiting" state in case of error
        }
      };

      

    useEffect(() => {
      loadSound();
      return () => {
        sound && sound.unloadAsync();
      };
    }, []);

    
    return (
        <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/start-bg-big.png')}
            style={styles.backgroundImage}>
            <View style={styles.topContainer}>
            <Image source={logo} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.navigate('Devices', { screen: `Settings_${device.id}` })} style={styles.settings}>
                <MaterialCommunityIcons name='cog-outline' size={30} style={{color: 'white'}} />
            </TouchableOpacity>
            </View>

            {/* For DEBUG purposes, hide on main build */}
            {/* <TouchableOpacity onPress={checkDeviceStatus} style={styles.refresh}>
              <Text style={{ marginLeft: width(5), width: width(20), height: 40, backgroundColor: 'blue' }}>REFRESH</Text>
              <Text style={styles.statusResponse}>{statusResponse}</Text>
              <Text style={styles.statusResponse2}>{statusResponse2}</Text>
            </TouchableOpacity> */}

            
            <View style={styles.deviceContainer}>
              <TouchableOpacity  onPress={() => navigation.navigate('AllDevices')} style={{marginTop: height(5)}}>
                  <View style={styles.deviceNameContainer}>
                      <Text style={styles.deviceName}>
                          {name + "  "}
                      </Text>
                      <MaterialCommunityIcons name='chevron-right' size={25} style={{color: 'white'}} />
                  </View>
              </TouchableOpacity>
            </View>
                
            <View style={styles.bottomContainer}>

            
                <View style={styles.status}>
                    <View>
                      <MaterialCommunityIcons
                        name={connected ? 'wifi' : 'wifi-off'}
                        size={35}
                        style={{ color: connected ? 'white' : 'grey' }}
                      />
                    </View>
                    <MaterialCommunityIcons name='minus' size={40} style={{color: 'white'}} />
                    <View>
                        <TouchableOpacity onPress={() => start('SHOWERON')}>
                            <MaterialCommunityIcons name='water-outline' size={40} style={{color: 'white'}} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[
                        styles.outside,
                            {borderColor: waiting ? '#3C54F2' : ready ? '#3C54F2' :'white',},
                        ]}>
                    <TouchableOpacity
                        style={[
                            styles.startShowerButton,
                            { borderColor: waiting ? '#3C54F2' : ready ? '#3C54F2' : 'white' },
                        ]}
                        onPress={() => start('SHOWERPREHEAT')}
                        disabled={waiting} // Disable the button if waiting is true
                    >
                        <Text style={styles.startButtonText}>
                            {waiting ? '' : ready ? 'SHOWER' : 'START'}
                        </Text>
                        <Text style={styles.showerButtonText}>
                            {waiting ? 'WAIT' : ready ? 'READY' : 'SHOWER'}
                        </Text>
                        <MaterialCommunityIcons name='wave' size={40} style={{ color: 'white' }} />
                    </TouchableOpacity>
                </View>
                

                <View style={styles.status}>
                <View>
                <TouchableOpacity
                    onPress={() => {
                      if (connected) {
                        navigation.navigate('Devices', { screen: `Battery_${device.id}` });
                      }
                    }}
                    disabled={!connected}
                  >
                    <MaterialCommunityIcons
                        name={connected ? getBatteryIcon(batteryStatus) : 'battery'}
                        size={35}
                        style={{
                            color: connected ? getBatteryColor(batteryStatus) : 'grey',
                            transform: [{ rotate: '90deg' }],
                        }}
                    />
                  </TouchableOpacity>
                  
              </View>
                    <MaterialCommunityIcons name='minus' size={40} style={{color: 'white'}} />
                    <View>
                    <TouchableOpacity onPress={() => start('SHOWEROFF')}>
                            <MaterialCommunityIcons name='water-off-outline' size={40} style={{color: 'white'}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style ={styles.bottomStatusBar}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('Devices', { screen: `Sensor_${device.id}` })}>
                  <SvgXml
                      width={30} 
                      height={30} 
                      xml={svgContent}
                  />
                </TouchableOpacity>

              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('Devices', { screen: `TapInformation_${device.id}` })}>
                  <MaterialCommunityIcons name="gesture-tap" size={30} color="white" />
               </TouchableOpacity>               
                
                
            </View>
            
            <View style={styles.bottomSelection}>
            
            <SwitchSelector 
                options={options}
                initial={mode}
                onPress={async (value) => {
                  setMode(value);
                  
                  // Call updateSettings and fetchDevices using await
                  try {
                    await updateSettings(device.id, null, null, null, value, null);
                    await fetchDevices();
                    await startShower(device.id, 'SHOWEROFF');
                    console.log('Settings updated successfully');
                  } catch (error) {
                    console.log('Error updating settings or fetching devices:', error);
                  }
                }}
                buttonColor={ELECTRIC_BLUE} // Customize this color as needed
                textStyle={{ color: 'white', fontFamily: 'SofiaSans_400Regular', }}
                backgroundColor={'#363636'} // Customize text color as needed
                selectedTextStyle={{ color: 'white' }}
              />
            </View>

            

            
            {message &&
        <Snackbar
          visible={message !== ''}
          onDismiss={() => setMessage('')}
          duration={3000}
        >
          {message}
        </Snackbar>
      }
        </ImageBackground>
        </View>
    );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    resizeMode: 'contain',
    height: height(9),
    width: width(45),
  },
  topContainer: {
    flex: 1,
    paddingTop: height(7),
    
   
    alignItems: 'center',
  },
  bottomContainer: {
    
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width(6),
    marginBottom: height(5),
  },
  startShowerButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Black opaque background
    borderRadius: width(60), // Make it a circle
    width: width(50), // Set the width to be equal to the borderRadius
    height: width(50), // Make it a circle
    padding: width(8), // Adjust padding as needed
    borderColor: 'white', 
    borderStyle: 'dotted',
    borderWidth: 5,
    borderDash: [3, 2],
    alignItems: 'center', // Align texts vertically
    justifyContent: 'center', // Align texts horizontally
  },
  startButtonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: 'SofiaSans_400Regular',
  },
  showerButtonText: {
    color: 'white',
    fontSize: RFValue(19),
    fontFamily: 'SofiaSans_400Regular',
    // textShadowColor: 'white',
    // textShadowRadius: 5
  },
  addDisplay: {
    marginTop: height(5),
    alignItems: 'center',
  },
  deviceName: {
    color: 'white',
    fontSize: RFValue(18),
    fontFamily: 'SofiaSans_400Regular',
  },
  deviceNameContainer: {
    alignItems: 'center',
    paddingBottom: height(4),
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  outside:{
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: width(60),
  },
  settings: {
    position: 'absolute',
    right: width(4), // Adjust the right position
    top: height(9), // Adjust the top position
  },
  bottomStatusBar: {
    flexDirection: 'row',
    width: width(42),
    marginHorizontal: width(29),
    justifyContent: 'space-between',
    marginBottom: height(2),
    marginTop: height(4),
    // backgroundColor: 'rgba(255, 255, 255, 0.05)', // Translucent background color
    // borderRadius: 20, // Rounded corners
    // paddingVertical: height(1), // Add padding vertically for spacing
    // paddingHorizontal: width(10),
  },
  statusBarText: {
    color: 'grey'
  },
  bottomSelection: {
    marginBottom: height(3),
    width: width(70),
    marginHorizontal: width(15),
  }, 
  deviceContainer: {
    paddingTop: height(25),
    marginBottom: height(7),
  },

  statusResponse: {
    color: 'red',
    position: 'absolute',
    top: height(5),
    paddingHorizontal: width(5),
  },
  statusResponse2: {
    color: 'red',
    position: 'absolute',
    top: height(18),
    paddingHorizontal: width(5),
  },
});

export default NewStart;
