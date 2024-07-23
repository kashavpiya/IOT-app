import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { height } from 'react-native-dimension';
import { Divider } from "react-native-paper";

const AlexaDialog = ({ alexaDialog, setAlexaDialog }) => {

  return (
    <Modal
      isVisible={alexaDialog}
      onBackdropPress={() => setAlexaDialog(false)}
      swipeDirection={['down']}
      onSwipeComplete={() => setAlexaDialog(false)}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            marginBottom: height(1),
            fontFamily: 'NunitoSans_400Regular'
          }}
        >
          Amazon Alexa
        </Text>
        <Divider />
        <Text
          style={{
            fontSize: 16,
            marginTop: height(1),
            fontFamily: 'NunitoSans_400Regular'
          }}
        >
          Set up your Power Shower with Amazon Alexa by opening up the
          Amazon Alexa App and following the Add New Device directions.
        </Text>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    height: '50%',
  },
  modalContent: {
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  }
})

export default AlexaDialog;