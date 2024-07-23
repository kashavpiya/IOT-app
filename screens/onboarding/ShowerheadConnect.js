import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Appbar, ProgressBar, ActivityIndicator, TextInput, Portal, Modal, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WifiManager from 'react-native-wifi-reborn';
import NetInfo from "@react-native-community/netinfo";
import { width, height } from 'react-native-dimension';
import * as Location from 'expo-location';
import Snackbar from 'react-native-paper';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import showerhead from '../../assets/showerhead.png';
import Guideline from './components/Guideline.js';

const ShowerheadConnect = ({ navigation, route }) => {
  const { connectionInfo, id, pin } = route.params || null;
  const { ssid, password } = connectionInfo;
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [msgVisible, setMsgVisible] = useState(false);

  const locationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMessage('Please allow location to enable connection to Power Shower');
      return;
    }
  }

  const connectToWifi = async () => {
    setConnecting(true);
    try {
      const res = await WifiManager.connectToProtectedSSID(ssid, password, false, false);
      console.log(res);
      try {
        const state = await NetInfo.fetch();
        setConnecting(false);
        setConnected(true);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      setConnecting(false);
      setConnected(false);
    }
  };

  useEffect(() => {
    locationPermission();
    connectToWifi();
  }, []);

  return (
    <ScrollView>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Action
              icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title='Connect to Power Shower' />
            <Appbar.Action
              icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
              onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
            />
          </Appbar.Header>
          <ProgressBar progress={0.5} color={ELECTRIC_BLUE} />
          <View style={styles.content}>
            <Image source={showerhead} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 12, marginBottom: height(1) }}>Network Name</Text>
              <Divider style={{ marginBottom: height(1) }} />
              <View style={styles.nameContainer}>
                <Text style={styles.networkName}>{ssid}</Text>
                {connecting ?
                  <ActivityIndicator animating />
                  :
                  (connected ?
                    <MaterialCommunityIcons name='check' size={20} />
                    :
                    <TouchableOpacity onPress={() => connectToWifi()}>
                      <MaterialCommunityIcons name='cached' size={24} color={ELECTRIC_BLUE} />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
            <TextInput
              label='Password'
              value={password}
              textColor={ELECTRIC_BLUE}
              underlineColor='transparent'
              activeUnderlineColor={ELECTRIC_BLUE}
              style={styles.input}
              theme={{
                colors: {
                  primary: 'white'
                },
                roundness: 15
              }}
              secureTextEntry
              editable={false}
            />
            <TouchableOpacity
              style={{
                marginTop: height(3)
              }}
              onPress={() => setVisible(true)}
            >
              <Text style={{ textDecorationLine: 'underline' }}>View Connection Guidelines</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: height(5) }}
              onPress={() => navigation.navigate('Onboarding', { screen: 'NetworkConnect', id: id, pin: pin })}
            >
              <ActionButton iconName='' text='Next' />
            </TouchableOpacity>
          </View>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={() => setVisible(false)}
              style={{
                padding: 20,
              }}
            >
              <Guideline setVisible={setVisible} />
            </Modal>
          </Portal>

          {message &&
          <Snackbar
            visible={msgVisible}
            onDismiss={() => setMsgVisible(false)}
            duration={5000}
          >
            {message}
          </Snackbar>
          }
        </View>
      </TouchableWithoutFeedback>
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
    color: ELECTRIC_BLUE,
    marginTop: height(2),
    fontSize: 15
  },
  input: {
    backgroundColor: '#E2E2E2',
    borderColor: 'gray',
    color: 'white',
    width: width(80),
    borderRadius: 15,
    marginVertical: height(2),
  },
  btnContainer: {
    marginTop: height(3),
    backgroundColor: '#E2E2E2',
    padding: 15,
    borderRadius: 10
  },
  helperText: {
    width: width(80),
    fontSize: 12,
    textAlign: 'center',
    marginVertical: height(1)
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E2E2E2',
    marginTop: height(5),
    width: width(80),
    borderRadius: 20
  },
  networkName: {
    fontSize: 16,
    color: ELECTRIC_BLUE
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default ShowerheadConnect;
