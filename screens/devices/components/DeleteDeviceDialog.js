import React, { useState, useContext } from "react";
import { Text, TouchableOpacity } from 'react-native';
import { Dialog, TextInput } from 'react-native-paper';
import { height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from "../../../shared/Constant";
import { DeviceContext } from '../../../states/device/DeviceContext';

const DeleteDeviceDialog = ({ deviceId, deleteDeviceDialog, setDeleteDeviceDialog, navigation }) => {
  const { deleteDevice } = useContext(DeviceContext);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [textConfirm, setTextConfirm] = useState("");

  const submit = async () => {
    console.log(deviceId);
    if (textConfirm.toLowerCase() === "delete") {
      try {
        const res = await deleteDevice(deviceId);
        if (res === "Device deleted successfully") {
          setMessage(res); // Set success message from response
        } else {
          setMessage("Cannot delete this device");
        }
        showMessage(); // Show message
        console.log(res);
        setTimeout(() => {
          setDeleteDeviceDialog(false);
          // navigation.navigate('AllDevices');
          navigation.goBack();
        }, 3000);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        showMessage(); // Show error message
      }
    }
  };

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
      setMessage(''); // Clear message after timeout
    }, 3000); // Message display duration (3 seconds)
  };

  return (
    <Dialog
      visible={deleteDeviceDialog}
      onDismiss={() => setDeleteDeviceDialog(false)}
      style={{ backgroundColor: 'white' }}
    >
      <Dialog.Title style={{ fontSize: 18 }}>
        Type "Delete" to remove this device
      </Dialog.Title>
      
      <Dialog.Content
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        <TextInput
          value={textConfirm}
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          activeUnderlineColor={ELECTRIC_BLUE}
          onChangeText={(text) => setTextConfirm(text)}
          theme={{
            colors: {
              primary: 'white'
            },
            roundness: 15
          }}
          style={{
            backgroundColor: '#E2E2E2',
            borderColor: 'gray',
            color: 'white',
            width: '100%',
            borderRadius: 15,
            
          }}
        />
        <MaterialCommunityIcons
          name='close-circle'
          color='black'
          size={24}
          onPress={() => setTextConfirm('')}
          style={{
            position: 'absolute',
            right: '15%',
            top: '27%'
          }}
        />
      </Dialog.Content>
      {messageVisible && (
        <Text style={{ color: message === 'Device deleted successfully' ? 'green' : 'red', marginTop: 0, paddingLeft: 20 }}>
          {message}
        </Text>
      )}
      <Dialog.Actions>
        <TouchableOpacity
          onPress={() => {
            setDeleteDeviceDialog(false);
            setTextConfirm('');
          }}
          style={{
            backgroundColor: '#E2E2E2',
            padding: 10,
            borderRadius: 15
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={submit}
          disabled={textConfirm.toLowerCase() !== "delete"}
          style={{
            backgroundColor: textConfirm.toLowerCase() === "delete" ? ELECTRIC_BLUE : '#E2E2E2',
            padding: 10,
            borderRadius: 15
          }}
        >
          <Text style={{ color: textConfirm.toLowerCase() === "delete" ? 'white' : 'black' }}>Submit</Text>
        </TouchableOpacity>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteDeviceDialog;