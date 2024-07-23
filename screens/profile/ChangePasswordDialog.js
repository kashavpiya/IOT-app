import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Dialog, TextInput, IconButton } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { AuthContext } from '../../states/auth/AuthContext';

const ChangePasswordDialog = ({ visible, setVisible, currentPassword }) => {
  const [password  , setPassword] = useState(currentPassword);
  const [showPassword, setShowPassword] = useState(false);
  const { changeInfo, resetPassword } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const { state } = useContext(AuthContext);
  const { username } = state.user;
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  const submit = async () => {
    try {
      const response = await resetPassword(username, code, password);
      console.log(response);
      setTimeout(() => {
        if (response === "Password reset successfully!") {
          setVisible(false);
        }
      }, 2000);
      if (response === "Password reset successfully!") {
        setMessage(response); // Set success message from response
      } else {
        setMessage("Error changing password"); 
      }
      showMessage(); 
    } catch (error) {
      console.error('Error changing password:', error);
    } 
  }

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
      setMessage(''); // Clear message after timeout
    }, 5000); // Message display duration (5 seconds)
  };

  return (
    <Dialog
      visible={visible}
      onDismiss={setVisible}
      style={{
        backgroundColor: 'white'
      }}
    >
      <Dialog.Title style={{ fontSize: 20 }}>
        Change your Password
      </Dialog.Title>
      <Dialog.Content>
        <Text style={styles.subText}>A Verification Code was sent to your email.</Text>
        <TextInput
            value={code}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={(text) => setCode(text)}
            style={styles.input}
            placeholder="Verification Code"
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
        <TextInput
          value={password}
          autoCapitalize="none"
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          secureTextEntry={!showPassword}
          activeUnderlineColor={ELECTRIC_BLUE}
          placeholder="New Password"
          onChangeText={newPassword => setPassword(newPassword)}
          style={styles.input}
          theme={{
            colors: {
              primary: 'white'
            },
            roundness: 15
          }}
        />
        {messageVisible && (
            <Text style={{ color: message === 'Password reset successfully!'? 'green' : 'red', marginTop: 1 }}>{message}</Text>
          )}
        <IconButton
          icon={showPassword ? 'eye-off' : 'eye'}
          color={ELECTRIC_BLUE}
          size={20}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          style={styles.eyeIcon}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <TouchableOpacity
          onPress={() => setVisible(false)}
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
  );
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
      eyeIcon: {
        position: 'absolute',
        right: width(5.4), // Adjust the right position as needed
        top: height(12.4),
      },
      subText: {
        color: ELECTRIC_BLUE,
        marginBottom: height(1),
        
      }
});

export default ChangePasswordDialog;