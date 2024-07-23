import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Dialog, TextInput } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { AuthContext } from '../../states/auth/AuthContext';

const ChangeEmailDialog = ({ visible, setVisible, currentEmail }) => {
  const [email, setEmail] = useState(currentEmail);
  const { changeInfo } = useContext(AuthContext);

  const submit = () => {
    changeInfo('email', email);
  }

  return (
    <Dialog
      visible={visible}
      onDismiss={setVisible}
      style={{
        backgroundColor: 'white'
      }}
    >
      <Dialog.Title style={{ fontSize: 20 }}>
        Change your email
      </Dialog.Title>
      <Dialog.Content>
        <TextInput
          value={email}
          autoCapitalize="none"
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          activeUnderlineColor={ELECTRIC_BLUE}
          onChangeText={email => setEmail(email)}
          style={styles.input}
          theme={{
            colors: {
              primary: 'white'
            },
            roundness: 15
          }}
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
});

export default ChangeEmailDialog;
