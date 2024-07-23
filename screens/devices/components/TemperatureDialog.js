import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { height } from 'react-native-dimension';
import { Divider } from "react-native-paper";

const TemperatureDialog = ({ tempDialog, setTempDialog }) => {

  return (
    <Modal
      isVisible={tempDialog}
      onBackdropPress={() => setTempDialog(false)}
      swipeDirection={['down']}
      onSwipeComplete={() => setTempDialog(false)}
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
          Temperature
        </Text>
        <Divider />
        <Text
          style={{
            fontSize: 16,
            marginTop: height(1),
            fontFamily: 'NunitoSans_400Regular'
          }}
        >
          No one likes to be hit in the face with cold water.
          Power Shower monitors the temperature until the shower is warm (85F / 30C).
          Make temperature adjustments with your traditional hot and cold shower handles.
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
    borderRadius: 20
  }
})

export default TemperatureDialog;