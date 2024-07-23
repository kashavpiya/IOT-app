import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, List, Divider } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { DeviceContext } from "../../../states/device/DeviceContext";

const DeviceSelection = (props) => {
  const {
    isModalVisible,
    setModalVisible,
    modalPosition,
    navigation
  } = props;
  const { devices } = useContext(DeviceContext);

  const selectDevice = (id) => {
    setModalVisible(false);
    navigation.navigate('Devices', { screen: `DeviceDetails_${id}` });
  }

  return (
    <Modal
      visible={isModalVisible}
      onDismiss={() => setModalVisible(false)}
      contentContainerStyle={
        [styles.modalContainer, { top: modalPosition.top - height(5), left: modalPosition.left - width(25) }]
      }
    >
      <Text style={styles.selectText}>Select a device</Text>
      {Object.keys(devices).map((id) => (
        <TouchableOpacity
          key={id}
          onPress={() => selectDevice(id)}
        >
          <List.Item
            title={devices[id].name}
          />
          <Divider />
        </TouchableOpacity>
      ))}
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  selectText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default DeviceSelection;