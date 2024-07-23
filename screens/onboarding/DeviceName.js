import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { Appbar, ProgressBar, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import image1 from '../../assets/showerHeadClean.png';
import { DeviceContext } from '../../states/device/DeviceContext';

const DeviceName = ({ navigation, route }) => {
  const { id, pin } = route.params || 'PS02';
  const [deviceName, setDeviceName] = useState('');
  const { addDevice, updateSettings } = useContext(DeviceContext);

  const saveDevice = async () => {
    if (id !== '' && deviceName !== '' && pin !== '') {
      const data = {
        id: id,
        name: deviceName,
        pin: pin
      }
      try {
        const res = await addDevice(data);
        await updateSettings(id, 90, 30, 1200, 0, 101 );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Onboarding', { screen: 'RestartDev' })
    } else {
      console.log('Device ID or Device Name is undefined!');
    }
    await updateSettings(id, 90, 30, 1200, 0, 101 );

  }

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title='Name Your Device' />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        />
      </Appbar.Header>
      <ProgressBar progress={6/8} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <Image source={image1} style={styles.image} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter your device name'
            value={deviceName}
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            style={styles.input}
            theme={{
              roundness: 10
            }}
            maxLength={20}
            onChangeText={(text) => setDeviceName(text)}
          />
          <MaterialCommunityIcons
            name='close-circle'
            color='gray'
            size={24}
            onPress={() => setDeviceName('')}
            style={styles.deleteIcon}
          />
        </View>
        <Text style={styles.subText}>Suggestions</Text>
        <TouchableOpacity onPress={() => setDeviceName('Master Bathroom')} style={styles.button}>
          <Text style={styles.buttonText}>Master Bathroom</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeviceName('Guest Bathroom')} style={styles.button}>
          <Text style={styles.buttonText}>Guest Bathroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveDevice}
          style={{ marginTop: '10%' }}
        >
          <ActionButton iconName='' text='Save' />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
  image: {
    marginTop: height(5)
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subText: {
    marginTop: '12%',
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: '80%',
    borderRadius: 10,
    marginTop: height(3)
  },
  button: {
    backgroundColor: '#E2E2E2',
    padding: 20,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  inputContainer: {
    width: width(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  deleteIcon: {
    position: 'absolute',
    right: width(15),
    top: height(5)
  }
});

export default DeviceName;
