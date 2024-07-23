import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  TextInput,
  Dialog,
} from 'react-native-paper';
import { height } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../../shared/Constant';

const NetworkInputDialog = (props) => {
  const {
    manualDialog,
    setManualDialog,
    network,
    setNetwork,
    password,
    setPassword,
    submit,
  } = props;

  return (
    <Dialog
      visible={manualDialog}
      onDismiss={setManualDialog}
      style={{
        backgroundColor: 'white'
      }}
    >
      <Dialog.Title style={{ fontSize: 18 }}>Enter network manually</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label='Network Name'
          value={network}
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          activeUnderlineColor={ELECTRIC_BLUE}
          style={styles.input}
          onChangeText={(text) => setNetwork(text)}
          theme={{
            colors: {
              primary: 'white'
            },
            roundness: 15
          }}
        />
        <TextInput
          label='Password'
          value={password}
          textColor={ELECTRIC_BLUE}
          underlineColor='transparent'
          activeUnderlineColor={ELECTRIC_BLUE}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          theme={{
            colors: {
              primary: 'white'
            },
            roundness: 15
          }}
        />
      </Dialog.Content>
      <View style={{ flexDirection: 'row' }}>
        <Dialog.Actions>
          <TouchableOpacity
            onPress={() => setManualDialog(false)}
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
      </View>
    </Dialog>
  )
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: '100%',
    borderRadius: 15,
    marginBottom: height(2),
  },
})

export default NetworkInputDialog;