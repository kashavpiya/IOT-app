import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { useLinkTo } from '@react-navigation/native';
import logo from '../assets/logoformobile.png';
import ActionButton from './ActionButton';




const TopNavBar = () => {
  const linkTo = useLinkTo();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const plusIconRef = useRef();

  const toggleModal = () => {
    if (plusIconRef.current) {
      plusIconRef.current.measure((x, y) => {
        setModalPosition({ top: x + 40, left: y + 40 })
      });
    }
    setModalVisible(!isModalVisible);
  };

  const handleAddDevice = () => {
    toggleModal();
    linkTo('/Onboarding');
  };

  return (
    <View style={styles.navContainer}>
      <Image source={logo} style={styles.image} /> 


      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={
            [styles.modalContainer, { top: modalPosition.top, left: modalPosition.left }]
          }
        >
          <TouchableOpacity
            onPress={handleAddDevice}>
            <ActionButton iconName='plus' text='Add New Device' />
          </TouchableOpacity>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(8),
    marginHorizontal: width(8)
  },
  image: {
    resizeMode: 'contain',
    height: height(15),
    width: width(40),
  },
  modalContainer: {
    position: 'absolute',
    zIndex: 1
  },
});

export default TopNavBar;
