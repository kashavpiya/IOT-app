import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ELECTRIC_BLUE } from '../../shared/Constant';

const parseWifiQRCode = (data) => {
  const wifiInfo = data.substring(5);
  const parts = wifiInfo.split(';');

  const ssid = parts.find(part => part.startsWith("S:")).substring(2);
  const securityType = parts.find(part => part.startsWith("T:")).substring(2);
  const password = parts.find(part => part.startsWith("P:")).substring(2);
  
  return {
    ssid: ssid,
    password: password,
  }; 
}

const QRCodeScanner = ({ navigation, route }) => {
  const { id } = route.params || '';
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error requesting camera permission:', error);
        setHasPermission(false);
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const parsedData = parseWifiQRCode(data);
    navigation.navigate('Onboarding', { screen: 'ShowerheadConnect', connectionInfo: parsedData, id: id });
  };

  if (hasPermission === null || hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No Access</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Scan Your Device Code</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
      />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Onboarding', { screen: 'ShowerheadConnect' })}
        style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraContainer: {
    width: '80%',
    height: '40%',
    overflow: 'hidden',
    marginTop: '5%'
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '25%'
  },
  button: {
    backgroundColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: '75%',
    justifyContent: 'center',
    marginTop: '45%'
  },
  buttonText: {
    color: ELECTRIC_BLUE,
    fontSize: 18
  }
});

export default QRCodeScanner;
