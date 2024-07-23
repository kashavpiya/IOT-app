import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Dialog, Portal, Divider } from 'react-native-paper';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { height, width } from 'react-native-dimension';

const LogOutDialog = ({ visible, setVisible, logout }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={setVisible}
        style={{
          backgroundColor: 'white'
        }}
      >
        <Dialog.Title>Log Out</Dialog.Title>
        <View style={{ alignItems: 'center' }}>
          <Divider bold style={{ width: width(75), marginBottom: height(2) }}/>
        </View>
        <Dialog.Content>
          <Text>Are you sure to log out?</Text>
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
            onPress={logout}
            style={{
              backgroundColor: ELECTRIC_BLUE,
              padding: 10,
              borderRadius: 15
            }}
          >
            <Text style={{ color: 'white' }}>Log Out</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LogOutDialog;
