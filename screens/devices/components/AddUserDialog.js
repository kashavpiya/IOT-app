import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Dialog, TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from "../../../shared/Constant";
import { DeviceContext } from "../../../states/device/DeviceContext";

const AddUserDialog = ({ deviceId, addUserDialog, setAddUserDialog }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false); // State to manage message visibility

  const { shareDevice } = useContext(DeviceContext);

  const share = async () => {
    if (username !== '') {
      try {
        const res = await shareDevice(deviceId, username);
        setTimeout(() => {
          setAddUserDialog(false);
        }, 2000);
        if (res === "Shared device successfully") {
          setMessage(res); // Set success message from response
        } else {
          setMessage("Cannot share this device"); 
        }
        showMessage(); // Show success message
        console.log(res);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        showMessage(); // Show error message
      }
    }
  };

  useEffect(() => {
    setUsername(username);
  }, [username]);

  // Function to show message for a few seconds
  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
      setMessage(''); // Clear message after timeout
    }, 3000); // Message display duration (5 seconds)
  };

  return (
    <TouchableWithoutFeedback>
      <Dialog
        visible={addUserDialog}
        onDismiss={() => {
          setAddUserDialog(false);
          setMessage(""); // Reset message when dialog dismisses
        }}
        style={{
          backgroundColor: 'white'
        }}
      >
        <Dialog.Title style={{ fontSize: 18, fontFamily: 'NunitoSans_400Regular' }}>
          Add a new user
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            placeholder='Username'
            value={username}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={name => setUsername(name)}
            style={styles.input}
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
          {messageVisible && (
            <Text style={{ color: message === 'Shared device successfully'? 'green' : 'red', marginTop: 1 }}>{message}</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity
            onPress={() => setAddUserDialog(false)}
            style={{
              backgroundColor: '#E2E2E2',
              padding: 10,
              borderRadius: 15
            }}
          >
            <Text style={{ color: ELECTRIC_BLUE }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={share}
            style={{
              backgroundColor: ELECTRIC_BLUE,
              padding: 10,
              borderRadius: 15
            }}
          >
            <Text style={{ color: 'white' }}>Share</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: width(75),
    marginBottom: height(2),
    borderRadius: 15
  },
  linkBtn: {
    backgroundColor: ELECTRIC_BLUE,
    alignItems: 'center',
    padding: 10,
    width: width(50),
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontFamily: 'NunitoSans_400Regular'
  }
})

export default AddUserDialog;
