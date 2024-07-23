import React, { useState, useEffect } from 'react';
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
  Divider,
  ActivityIndicator,
  Snackbar,
  Portal
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";
import { width, height } from 'react-native-dimension';
import * as Location from 'expo-location';
import axios from 'axios';
import WifiManager from 'react-native-wifi-reborn';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import image from '../../assets/connectingwifi.png';
import PasswordInputDialog from './components/PasswordInputDialog';
import NetworkInputDialog from './components/NetworkInputDialog';
import SendingDataDialog from './components/SendingDataDialog';

const IP_ADDRESS = '192.168.4.1';

const NetworkConnect = ({ navigation }) => {
  const [network, setNetwork] = useState('');
  const [password, setPassword] = useState('');
  const [pwDialog, setPwDialog] = useState(false);
  const [manualDialog, setManualDialog] = useState(false);
  const [data, setData] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendDataDialog, setSendDataDialog] = useState(false);

  const locationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log('Permission granted', location);
  };

  const scanWifi = () => {
    NetInfo.fetch().then(state => {
      const ssid = state.details.ssid;
      setNetwork(ssid);
    });
  }

  // const connectToWifi = async (ssid, pw) => {
  //   console.log(ssid + " " + pw);
  //   try {
  //     await WifiManager.connectToProtectedSSID(ssid, pw, false, false);
  //     setConnected(true);
  //     setData({ ssid: network, password: password });
  //     setSending(true);
  //   } catch (err) {
  //     return console.log(err);
  //   }
  //   setConnecting(false);
  // };

  const submit = () => {
    setPwDialog(false);
    setManualDialog(false);
    setConnecting(true);
    // connectToWifi(network, password);
    setData({ ssid: network, password: password });
    sendData(data);
  };

  const sendData = async (data) => {
    console.log('hi');
    try {
      const response = await axios({
        method: 'POST',
        url: `http://${IP_ADDRESS}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      });
      console.log(response);
      setSending(false);
      setConnecting(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    locationPermission();
    scanWifi();
    if (connected) sendData(data);
    if (sending) setSendDataDialog(true);
  }, [data, sending]);

  useEffect(() => {
    console.log(data);
    sendData(data);
  }, [data]);

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
      <ProgressBar progress={0.625} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <Image source={image} style={styles.image} />
        <View style={styles.networkContainer}>
          <Text style={{ fontSize: 16, marginBottom: height(1), marginLeft: width(2) }}>Local Network</Text>
          <Divider />
          <TouchableOpacity
            style={styles.network}
            onPress={() => setPwDialog(true)}
          >
            <Text style={styles.networkName}>{network}</Text>
            {connecting && <ActivityIndicator animating={true} />}
            {connected && <MaterialCommunityIcons name='check' size={20} color={ELECTRIC_BLUE} style={{ marginRight: width(2) }} />}
            {data === null && <MaterialCommunityIcons name='lock-alert' size={20} style={{ marginRight: width(2) }} />}
            <MaterialCommunityIcons name='wifi' size={18} style={{ marginRight: width(2) }} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: height(5) }}>
          <Text style={styles.subText}>
            Tips:
          </Text>
          <Text style={styles.subText}>
            - 5GHz networks are not supported 
            - Network name’s and password are case sensitive
            - If you are unable to connect you can select your network{' '} 
            <Text
              style={styles.linkText}
              onPress={() => setManualDialog(true)}
            >
              manually
            </Text>
              .
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding', { screen: 'DeviceName' })}
          style={{ marginTop: '10%', alignItems: 'center' }}
        >
          <ActionButton iconName='' text='Next' disabled={data === null}/>
        </TouchableOpacity>
      </View>
      
      <Portal>
        <PasswordInputDialog
          pwDialog={pwDialog}
          setPwDialog={setPwDialog}
          network={network}
          password={password}
          setPassword={setPassword}
          submit={submit}
        />
        <NetworkInputDialog
          manualDialog={manualDialog}
          setManualDialog={setManualDialog}
          network={network}
          setNetwork={setNetwork}
          password={password}
          setPassword={setPassword}
          submit={submit}
        />
        <SendingDataDialog
          sendDataDialog={sendDataDialog}
          setSendDataDialog={setSendDataDialog}
        />
      </Portal>
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
    marginTop: height(3)
  },
  subText: {
    width: 300,
    marginTop: height(1),
    fontSize: 15,
  },
  networkContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E2E2E2',
    marginTop: height(5),
    width: width(90),
    borderRadius: 10
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
});

export default NetworkConnect;
