import React, { useState, useRef, useContext, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Portal, Snackbar } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from "../../shared/Constant";
import { DeviceContext } from "../../states/device/DeviceContext";
import TopNavBar from "../../components/TopNavBar";
import DeviceSettings from "./components/DeviceSettings";
import DeviceSelection from "./components/DeviceSelection";
import RenameDialog from "./components/RenameDialog";
import AddUserDialog from "./components/AddUserDialog";
import TemperatureDialog from "./components/TemperatureDialog";
import VoiceDialog from "./components/VoiceDialog";
import AlexaDialog from './components/AlexaDialog';
import { SvgXml } from 'react-native-svg'; //
import sensorSvg from '../../assets/sensor.svg'

const NewSettings = ({ route, navigation }) => {
  const device = route.params.data;
  const [name, setName] = useState(device.name);
  const [newName, setNewName] = useState(device.name);
  const [renameDialog, setRenameDialog] = useState(false);
  const [addUserDialog, setAddUserDialog] = useState(false);
  const [tempDialog, setTempDialog] = useState(false);
  const [voiceDialog, setVoiceDialog] = useState(false);
  const [alexaDialog, setAlexaDialog] = useState(false);
  const [message, setMessage] = useState('');

  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#FFFFFF">
    <path d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z"/>
  </svg>
`;


  return (
    <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
            <MaterialCommunityIcons
                name='chevron-left'
                size={24}
                color={'white'}
                onPress={() => navigation.navigate('Devices', { screen: `NewStart_${device.id}` })} 
                style={{
                marginTop: height(3),
                }}
            />
        </View>
        <View style={styles.heading}>
        <Text style={styles.headingText}>
                Settings
            </Text>
        </View>

        <View style={styles.settingsItems}>
                

                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Devices', { screen: `History_${device.id}` })}>
                    <MaterialCommunityIcons name="history" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>History</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Devices', { screen: `Temperature_${device.id}` })}>
                    <MaterialCommunityIcons name="thermometer-low" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Temperature</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Devices', { screen: `Timer_${device.id}` })}>
                    <MaterialCommunityIcons name="timelapse" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Timer</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Devices', { screen: `Battery_${device.id}` })}>
                    <MaterialCommunityIcons name="battery"  style={{transform: [{ rotate: '90deg' }],}} size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Battery</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate('Devices', { screen: `Sensor_${device.id}` })}>
                <SvgXml
                    width={30} 
                    height={30} 
                    xml={svgContent}
                />
                    <Text style={styles.settingsText}>Motion Sensor</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.eachItem}>
                    <MaterialCommunityIcons name="bell-outline" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Alerts</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.eachItem} onPress={() => setRenameDialog(true)}>
                    <MaterialCommunityIcons name="pencil-outline" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Name</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => setAddUserDialog(true)}>
                    <MaterialCommunityIcons name="account-multiple-plus" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Share Device</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eachItem} onPress={() => setVoiceDialog(true)}>
                    <MaterialCommunityIcons name="account-voice" size={30} color={'white'}/>
                    <Text style={styles.settingsText}>Voice</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <MaterialCommunityIcons name='chevron-right' size={24} color={'#7e7e7e'}/>
                    </View>
                    
                </TouchableOpacity>

                
        </View>
        
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
{/*         <GoogleNestDialog
          gglNestDialog={gglNestDialog}
          setGglNestDialog={setGglNestDialog}
        />
        <AlexaDialog
          alexaDialog={alexaDialog}
          setAlexaDialog={setAlexaDialog}
        /> */}
      </Portal>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:  1,
        backgroundColor: '#363636',
    },
    heading: {
        borderBottomColor: "#7e7e7e",
        borderBottomWidth: 1,
        width: width(90),
        marginHorizontal: width(5)
    },
    headingText:{
        textAlign: 'center',
        color: "white",
        fontSize: RFValue(18),
        fontFamily: 'SofiaSans_400Regular',
        paddingBottom: height(3),
    },
    topContainer: {
        paddingVertical: height(5),
        paddingHorizontal: width(5),
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    settingsItems: {
        
    },
    eachItem: {
        flexDirection: 'row',
        borderBottomColor: "#7e7e7e",
        borderBottomWidth: 1,
        width: width(90),
        marginHorizontal: width(5),
        paddingVertical: height(2),
        
    },
    settingsText: {
        color: 'white',
        fontSize: RFValue(17),
        fontFamily: 'SofiaSans_400Regular',
        paddingLeft: width(6),
        paddingTop: 4,
    }

});

export default NewSettings;