import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Appbar,
  ProgressBar,
  Portal,
  TextInput,
  ActivityIndicator
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';
import * as Location from 'expo-location';
import axios from 'axios';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import image1 from '../../assets/wifiCon.png';

const IP_ADDRESS = '192.168.4.1';

const NetworkConnect = ({ navigation, route }) => {
  const { id, pin } = route.params || null;
  const [network, setNetwork] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [connectedNetwork, setConnectedNetwork] = useState('');

  console.log(id);
  console.log(pin);

  const locationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log('Permission granted', location);
  };

  const getConnectionInfo = async () => {
    console.log('getting connection info');
    try {
      const response = await axios({
        method: 'GET',
        url: `http://${IP_ADDRESS}/wifiConnectInfo.json`,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;
      console.log(data);
      
      setConnectedNetwork(data.ap);
      // console.log('connected to: ' + connectedNetwork);
    } catch (error) {
      console.log("error:" + error);
    }
  }

  const getConnectionStatus = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://${IP_ADDRESS}/wifiConnectStatus`,
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
    } catch (error) {
      console.log('Error getting connection status');
      console.log(error);
    }
  }

  const submit = async () => {
    try {
      setSending(true);
      console.log(network + " " + password);
      /* const response = axios({
        method: 'POST',
        url: `http://${IP_ADDRESS}/wifiConnect.json`,
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'my-connect-ssid': network,
          'my-connect-pwd': password
        },
        data: {'timestamp': Date.now()}
      });
      console.log(response); */
      setSending(false);
      setSent(true);
      // setConnectedNetwork(network);

      await Linking.openURL(`http://${IP_ADDRESS}`);


    } catch (error) {
      console.log('error!');
      console.log(error);
      setSent(false);
    }
    // await getConnectionStatus();
  };

  useEffect(() => {
    locationPermission();
    getConnectionInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title='Select Network' />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        />
      </Appbar.Header>
      <ProgressBar progress={4/8} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <View style={{ alignItems: 'center' }}>
          <Image source={image1} style={styles.image} />
          <Text style={styles.header}>Power Shower Connection</Text>
          {/* <View style={styles.networkContainer}>
            <TextInput
              label='Network Name'
              value={network}
              textColor={ELECTRIC_BLUE}
              underlineColor='transparent'
              activeUnderlineColor={ELECTRIC_BLUE}
              style={styles.input}
              onChangeText={(text) => setNetwork(text)}
              theme={{
                colors: {
                  primary: 'white'
                },
                roundness: 15
              }}
            />
            <TextInput
              label='Password'
              value={password}
              textColor={ELECTRIC_BLUE}
              underlineColor='transparent'
              activeUnderlineColor={ELECTRIC_BLUE}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              theme={{
                colors: {
                  primary: 'white'
                },
                roundness: 15
              }}
            /> 
          </View>*/}
          
         <Text style={styles.subText}>
            1. Hitting connect will redirect you to a webpage where you can enter your WiFi name and password. When it indicates connected, please come back to the app and press next to finish the setup. 
          </Text>
          <TouchableOpacity
            onPress={submit}
            style={{
              backgroundColor: ELECTRIC_BLUE,
              padding: 10,
              borderRadius: 15
            }}
          >
            <Text style={{ color: 'white' }}>Connect</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>
            2. If you received a successful connection message, Press Next
          </Text>
        </View>
        {/* <View style={{ marginTop: height(2), marginLeft: width(10) }}>
          <Text>Power Shower connected to:{' '}
            <Text>
              {connectedNetwork === '' ? 'None' : connectedNetwork}
            </Text>
          </Text>
        </View> */}
        {/* {sending && <ActivityIndicator animating style={{ marginTop: height(2) }}/>}
        {sent && <MaterialCommunityIcons name='checked' />} */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding', { screen: 'ReconnectWiFi', id: id, pin: pin })}
          style={{ marginTop: '10%', alignItems: 'center', marginBottom: height(10) }}
        >
          <ActionButton iconName='' text='Next' />
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
    
  },
  image: {
    marginTop: height(3),
    resizeMode: 'contain',
    height: height(30,)
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: height(2)
  },
  subText: {
    width: 300,
    marginTop: height(1),
    fontSize: 15,
  },
  networkContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: height(1),
    width: width(90),
    borderRadius: 10,
    alignItems: 'center'
  },
  networkName: {
    fontSize: 16,
    marginLeft: width(2),
    marginRight: width(38)
  },
  network: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height(2)
  },
  linkText: {
    color: ELECTRIC_BLUE,
    textDecorationLine: 'underline'
  },
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: '100%',
    borderRadius: 15,
    marginBottom: height(2),
  },mainText: {
    width: width(75),
    fontWeight: 'bold',
    marginTop: height(5),
    fontSize: 18,
  },subText: {
    width: width(75),
    marginTop: height(2),
    fontSize: 18,
    marginBottom: height(2),
  },
});

export default NetworkConnect;
