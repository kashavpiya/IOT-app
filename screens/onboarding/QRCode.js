import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import qrcode from '../../assets/qrcodesimulator.png';
import ActionButton from '../../components/ActionButton';

const QRCode = ({ navigation, route }) => {
  const { id } = route.params || '';

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title='Scan Code' />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        />
      </Appbar.Header>
      <ProgressBar progress={0.375} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <Image source={qrcode} style={styles.image} />
        <Text style={styles.mainText}>
        Select the QR code located on the back of your shower head 
        </Text>
      
        <Text style={styles.subText}>
          Tips:
        </Text>
        <Text style={styles.subText}>
          - If you are unable to scan QR code click{' '}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('Onboarding', { screen: 'ShowerWifiInput', id: id })}>
            here
          </Text>
            .
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding', { screen: 'QRCodeScanner', id: id  })}
          style={{ marginTop: height(15) }}>
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
    alignItems: 'center'
  },
  image: {
    marginTop: height(15)
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    width: width(70),
    fontWeight: 'bold',
    marginTop: height(5),
    marginBottom: height(2),
    fontSize: 18,
  },
  subText: {
    width: '70%',
    fontSize: 16,
  },
  linkText: {
    color: ELECTRIC_BLUE,
    fontSize: 18
  },
  button: {
    backgroundColor: ELECTRIC_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  }
});

export default QRCode;
