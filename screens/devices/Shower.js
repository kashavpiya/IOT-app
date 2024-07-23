import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DeviceContext } from '../../states/device/DeviceContext';
import { height, width } from 'react-native-dimension';
import { Portal, Snackbar } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { scheduleNotificationAsync, Notifications } from 'expo-notifications';
import SwitchSelector from 'react-native-switch-selector';
import { ELECTRIC_BLUE } from '../../shared/Constant';
// import { ScrollView } from 'react-native-gesture-handler';
import RenameDialog from "./components/RenameDialog";
import AddUserDialog from "./components/AddUserDialog";
import TemperatureDialog from "./components/TemperatureDialog";
import VoiceDialog from "./components/VoiceDialog";
import DeleteDeviceDialog from './components/DeleteDeviceDialog';


const Shower = ({ navigation, route }) => {
    const device = route.params.data;
    const { getStatus, fetchDevices, updateSettings, checkDeviceConnection, deleteDevice } = useContext(DeviceContext);
    const [name, setName] = useState(device.name);
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [svgColor, setSvgColor] = useState(device.mode === 0 ? '#3C54F2' : 'grey');
    const [mode, setMode] = useState(device.mode);
    const [resp, setResp] = useState();
    const [notificationSent, setNotificationSent] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [ready, setReady] = useState(false);
    const [showerState, setShowerState] = useState("off");
    
    
    


    const [newName, setNewName] = useState(device.name);
    const [renameDialog, setRenameDialog] = useState(false);
    const [addUserDialog, setAddUserDialog] = useState(false);
    const [tempDialog, setTempDialog] = useState(false);
    const [voiceDialog, setVoiceDialog] = useState(false);
    const [deleteDeviceDialog, setDeleteDeviceDialog] = useState(false);

    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
            <path d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z"/>
        </svg>
        `;


        const checkDeviceStatus = async () => {
            try {
              const deviceId = device.id;
              const response = await getStatus(deviceId);
              setResp(response);
        
              if (response && response.payload) {
                if (response.payload.sleep === 1) {
                    setShowerState("sleep");
                } else if (response.payload.status === 0) {
                    setShowerState("off");
                } else if (response.payload.status === 1) {
                    setShowerState("on");
                } else if (response.payload.status === 2) {
                    setShowerState("heating");
                } else if (response.payload.status === 3) {
                    setShowerState("ready");
                    setNotificationSent(true);
                    setTimeout(() => {
                        setNotificationSent(false);
                    }, 120000); 
      
                    await scheduleNotificationAsync({
                        content: {
                            title: 'Shower is Ready!',
                            body: `${device.name} is now ready.`,
                        },
                        trigger: null, // Send immediately
                    });
                } else if (response.payload.status = 4) {
                    setShowerState("error");
                } else {
                  setShowerState("off");
                }
              } 
              
              
            } catch (error) {
                console.error("Error checking device status:", error);
                //setConnected(false); // Assume device is disconnected in case of an error
            }
          };
      
        useEffect(() => {
            checkDeviceStatus();
            const interval = setInterval(checkDeviceStatus, 5000); 
            return () => clearInterval(interval);
          }, [device.id, getStatus]);


          useEffect(() => {
            const checkConnection = async () => {
              const conn = await checkDeviceConnection(device.id);
              setConnected(conn);
              console.log("Connected", conn);
            };
        
            checkConnection();
          }, [device.id, checkDeviceConnection]);
          
          
    return (
        <View style={styles.container}>
            <ImageBackground
            source={require('../../assets/start-bg-big.png')}
            style={styles.backgroundImage}>
                <View style={styles.overlay} />
                <MaterialCommunityIcons
                    name='chevron-left'
                    size={46}
                    color={'white'}
                    onPress={() => {navigation.goBack();}}
                    style={{
                    marginTop: height(8),
                    marginLeft: width(5),
                }}
                />
                <ScrollView style={{marginBottom: height(5)}}>
                <View style={styles.topContainer}>
                    <View style ={styles.subContainer}>
                        <Text style={styles.subText}>
                            SHOWER
                        </Text>
                        <View style={styles.iconContainer}>
                            <Text style={styles.normalText}>
                                {name}        
                            </Text>
                            <MaterialCommunityIcons
                                    name={connected ? 'wifi':  'wifi-off'}
                                    size={22}
                                    color={'white'}
                                    sstyle={styles.icon}
                                />
                        </View>
                        
                    </View>
                    
                    <View style ={styles.subContainer}>
                        <Text style={styles.subText}>
                            SHOWER STATUS
                            
                        </Text>
                        <Text style={[styles.readyText, { color:
                            connected === false ? '#FF0B0B':
                            showerState === 'off' ? '#FF0B0B' :
                            showerState === 'sleep' ? '#FF0B0B' :
                            showerState === 'on' ? 'green' :
                            showerState === 'error' ? '#FF0B0B' :
                            showerState === 'heating' ? '#FF4D0B' : '#03F8D3'
                        }]}>
                            {
                            connected === false ? 'Sleeping - Tap shower head to wake up':
                            showerState === 'sleep' ? 'Sleeping - Tap shower head to wake up' :
                            showerState === 'off' ? 'Shower is off' :
                            showerState === 'on' ? 'Shower is on' :
                            showerState === 'error' ? 'Pre-heat timed out': 
                            showerState === 'heating' ? 'Pre Heating - Please wait' : 'Shower Ready'}
                        </Text>
                    </View>
                </View>

                <View style={styles.settingsContainer}>
                    <Text style={[styles.subText, { paddingLeft: width(15), paddingBottom: height(1)  }]}>SETTINGS</Text>
                    <ScrollView style={styles.settingsItems}>
                        {/* <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Shower Heads', { screen: `TapMode_${device.id}` })}>
                            <MaterialCommunityIcons name="gesture-tap" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Tap Mode</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View>
                        </TouchableOpacity> */}


                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Shower Heads', { screen: `Sensor_${device.id}` })}>
                            <SvgXml
                                width={30} 
                                height={30} 
                                xml={svgContent}
                            />
                                <Text style={styles.settingsText}>Sensitivity</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                    <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                                </View> 
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Shower Heads', { screen: `Temperature_${device.id}` })}>
                            <MaterialCommunityIcons name="thermometer-low" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Temperature</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity>


                        {/* <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Shower Heads', { screen: `Timer_${device.id}` })}>
                            <MaterialCommunityIcons name="timelapse" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Timer</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity> */}


                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Shower Heads', { screen: `Battery_${device.id}` })}>
                            <MaterialCommunityIcons name="battery"  style={{transform: [{ rotate: '90deg' }],}} size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Battery</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.eachItem} onPress={() => setRenameDialog(true)}>
                            <MaterialCommunityIcons name="pencil-outline" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Name</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.eachItem} onPress={() => setAddUserDialog(true)}>
                            <MaterialCommunityIcons name="account-multiple-plus" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Share Device</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.eachItem, { borderBottomColor: "#D3D3D3", borderBottomWidth: 1 }]} onPress={() => setDeleteDeviceDialog(true)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={30} color={'white'}/>
                            <Text style={styles.settingsText}>Delete Device</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: width(1.5) }}>
                                <MaterialCommunityIcons name='chevron-right' size={24} color={'#D3D3D3'}/>
                            </View> 
                        </TouchableOpacity>
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
                        <VoiceDialog
                        voiceDialog={voiceDialog}
                        setVoiceDialog={setVoiceDialog}
                        />
                        <DeleteDeviceDialog 
                        deleteDeviceDialog={deleteDeviceDialog}
                        setDeleteDeviceDialog={setDeleteDeviceDialog}
                        deviceId={device.id}
                        navigation={navigation} 
                        />
                    </Portal>
                </View>


            </ScrollView>
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
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.35)', 
      },
      topContainer:{
        marginLeft: width(30),
      },
      subContainer:{
        marginBottom: height(6),
      },
      subText: {
        color: '#D3D3D3',
        fontSize: RFValue(10),
        fontFamily: 'SofiaSans_400Regular',
        marginBottom: height(.5),
      },
      iconContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginRight: width(5),
      },
      normalText: {
        color: 'white',
        fontSize: RFValue(17),
        fontFamily: 'SofiaSans_400Regular',
        alignItems: 'center',
      },
      readyText:{
        color: 'cyan',
        fontSize: RFValue(20),
        fontFamily: 'SofiaSans_400Regular',
        fontStyle: 'italic',
      },
      settingsContainer: {
        marginTop: height(2),
        marginLeft: width(10),
        marginRight: width(5),
      },
      eachItem: {
        flexDirection: 'row',
        borderTopColor: "#D3D3D3",
        borderTopWidth: 1,
        paddingVertical: height(2),
    },
    settingsText: {
        color: 'white',
        fontSize: RFValue(15),
        fontFamily: 'SofiaSans_400Regular',
        paddingLeft: width(6),
        paddingTop: 4,
    },
    icon: {
        marginRight: width(5),
    }
});
 
export default Shower;