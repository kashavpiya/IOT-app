import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native';
import { Appbar, ProgressBar, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import image from '../../assets/connectingwifi.png';

const ShowerWifiInput = ({ navigation, route }) => {
  const { id, pin } = route.params || '';
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const nextStep = () => {
    if (!(ssid === '' || password === '')) {
      const data = {
        ssid: ssid,
        password: password
      }
      console.log(data);
      navigation.navigate(
        'Onboarding',
        {
          screen: 'ShowerheadConnect',
          connectionInfo: data,
          id: id,
          pin: pin
        }
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content title='Manual Connection' />
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
            onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
          />
        </Appbar.Header>
        <ProgressBar progress={0.375} color={ELECTRIC_BLUE} />
        <View style={styles.content}>
          <Image
            source={image}
            size={150}
            style={{ marginTop: height(3)}} />
          <Text style={styles.mainText}>
            Set up your Power Shower network manually
          </Text>
          <TextInput
            placeholder='Network Name'
            value={ssid}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={id => setSsid(id)}
            style={styles.input}
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
          <TextInput
            placeholder='Password'
            value={password}
            autoCapitalize="none"
            textColor={ELECTRIC_BLUE}
            underlineColor='transparent'
            activeUnderlineColor={ELECTRIC_BLUE}
            onChangeText={pw => setPassword(pw)}
            style={styles.input}
            theme={{
              colors: {
                primary: 'white'
              },
              roundness: 15
            }}
          />
          <Text style={styles.subText}>
          The Power Shower network credentials are provided in your package.
          </Text>
          <TouchableOpacity onPress={nextStep} style={{ marginTop: height(10) }}>
            <ActionButton iconName='' text='Next' disabled={ssid === '' || password === ''} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
  mainText: {
    width: width(75),
    fontWeight: 'bold',
    marginTop: height(3),
    marginBottom: height(3),
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

export default ShowerWifiInput;
