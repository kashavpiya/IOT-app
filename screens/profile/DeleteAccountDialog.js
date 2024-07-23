import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { ELECTRIC_BLUE } from '../../shared/Constant';

const DeleteAccountDialog = ({ visible, setVisible, deleteAcc }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={setVisible}
        style={{
          backgroundColor: 'white'
        }}
      >
        <Dialog.Title>Delete Account</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure to delete your account?</Text>
        </Dialog.Content>
        <Dialog.Actions>
            <TouchableOpacity onPress={() => setVisible(false)} style={{
              backgroundColor: '#E2E2E2',
              padding: 10,
              borderRadius: 15
            }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteAcc}  style={{
              backgroundColor: ELECTRIC_BLUE,
              padding: 10,
              borderRadius: 15}}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </Dialog.Actions>   
      </Dialog>
    </Portal>
  );
};

export default DeleteAccountDialog;
