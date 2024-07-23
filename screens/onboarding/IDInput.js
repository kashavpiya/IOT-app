import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Appbar, ProgressBar, TextInput, Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import { DeviceContext } from '../../states/device/DeviceContext';

const IDInput = ({ navigation }) => {
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [visible, setVisible] = useState('');
  const [message, setMessage] = useState('');
  const { getStatus } = useContext(DeviceContext);

  const nextStep = async () => {
    if (id !== '' && pin !== '') {
      console.log(id);
      console.log(pin);
      
      // try {
      //   const statusResponse = await getStatus(id);

      //   console.log('Status Response:', statusResponse);

      //   if (statusResponse.message === 'No device data found for this device') {
      //     // Proceed to the next screen
      //     navigation.navigate('Onboarding', { screen: 'TurnOnButton', id: id, pin: pin });
      //   } else {
      //     // Display a message indicating that the device is already registered
      //     setMessage('Device already registered.');
      //     setVisible(true);
      //   }
      // } catch (error) {
      //   console.error('Error fetching status:', error);
      //   setMessage('Error fetching status.');
      //   setVisible(true);
      // }

      // //update device pin here if we are inserting pin when the user adds it
      navigation.navigate('Onboarding', { screen: 'TurnOnButton', id: id, pin: pin });
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content title='Enter ID' />
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
            onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
          />
        </Appbar.Header>
        <ProgressBar progress={1/8} color={ELECTRIC_BLUE} />
        <View style={styles.content}>
          <MaterialCommunityIcons
            name='file-document-outline'
            size={150}
            color={ELECTRIC_BLUE}
            style={{ marginTop: height(3)}} />
          <Text style={styles.mainText}>
            Enter the 10-digit ID and 4-digit Pin located on your PowerShower sticker
          </Text>
          <TextInput
            placeholder='Device ID'
            value={id}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={id => setId(id)}
            style={styles.input}
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
          <TextInput
            placeholder='PIN'
            value={pin}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={pin => setPin(pin)}
            style={styles.input}
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
          {/* <Text style={styles.subText}>
            The Device ID and Pin is also located on the last page of your paper instruction manual.
          </Text> */}
          <TouchableOpacity onPress={nextStep} style={{ marginTop: height(10) }}>
            <ActionButton iconName='' text='Next   ' disabled={id.length !== 10 || pin.length !== 4} />
          </TouchableOpacity>
          
        </View>

        {message &&
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={5000}
          >
            {message}
          </Snackbar>
        }
      </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    width: width(85),
    fontWeight: 'bold',
    marginTop: height(5),
    marginBottom: height(5),
    fontSize: 18,
    textAlign: 'center'
  },
  subText: {
    width: width(80),
    fontSize: 14,
  },
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: width(80),
    marginBottom: height(2),
    borderRadius: 15
  },
  heading: {
    marginTop: height(5),
    marginBottom: height(1),
    fontSize: 18,
  }
});

export default IDInput;
