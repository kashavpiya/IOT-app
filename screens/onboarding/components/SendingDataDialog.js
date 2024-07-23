import React from 'react';
import { Text } from 'react-native';
import { Dialog } from 'react-native-paper';
import { height } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../../shared/Constant';

const SendingDataDialog = (props) => {
  const { sendDataDialog, setSendDataDialog } = props;

  return (
    <Dialog
      visible={sendDataDialog}
      onDismiss={setSendDataDialog}
      style={{
        backgroundColor: 'white'
      }}
    >
      <Dialog.Content>
        <Text>Sending network credentials to Power Shower</Text>
      </Dialog.Content>
    </Dialog>
  )
};

export default SendingDataDialog;