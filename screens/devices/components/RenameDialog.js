import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity } from 'react-native';
import { Dialog, TextInput } from 'react-native-paper';
import { height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from "../../../shared/Constant";
import { DeviceContext } from '../../../states/device/DeviceContext';

const RenameDialog = ({ currentName, deviceId, renameDialog, setRenameDialog, rename, setMessage }) => {
  const [name, setName] = useState(currentName);
  const { changeDeviceName } = useContext(DeviceContext);
  const submit = async () => {
    const res = await changeDeviceName(deviceId, name);
    setRenameDialog(false);
    setMessage(res);
    rename(name);
  }

  return (
    <Dialog
      visible={renameDialog}
      onDismiss={setRenameDialog}
      style={{
        backgroundColor: 'white'
      }}
    >
      <Dialog.Title style={{ fontSize: 18 }}>
        Rename this device
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
          value={name}
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          activeUnderlineColor={ELECTRIC_BLUE}
          maxLength={20}
          onChangeText={(text) => setName(text)}
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
            marginBottom: height(2),
          }}
        />
        <MaterialCommunityIcons
          name='close-circle'
          color='black'
          size={24}
          onPress={() => setName('')}
          style={{
            position: 'absolute',
            right: '15%',
            top: '27%'
          }}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <TouchableOpacity
          onPress={() => setRenameDialog(false)}
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
          style={{
            backgroundColor: ELECTRIC_BLUE,
            padding: 10,
            borderRadius: 15
          }}
        >
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </Dialog.Actions>
    </Dialog>
  )
};

export default RenameDialog;