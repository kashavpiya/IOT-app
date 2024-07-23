import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Appbar, ProgressBar, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import ActionButton from '../../components/ActionButton';
import { useLinkTo } from '@react-navigation/native';
import { height, width } from 'react-native-dimension';

const NetworkConnect = ({ navigation }) => {

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title='Device Setup Complete' />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        />
      </Appbar.Header>
      <ProgressBar progress={1} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <Text style={styles.mainText}>Power Shower is now connected to your account!</Text>

        <Divider style={{width: width(80), color: '#b2b2b2', height: 1, marginBottom: height(1) }}/>

        <Text style={styles.mainText1}>Next install Power Shower in your shower</Text>

        <TouchableOpacity style={{ marginTop: '50%' }} onPress={() => navigation.navigate('Onboarding', { screen: 'OStart' })}>
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    width: width(75),
    fontWeight: 'bold',
    marginVertical: height(10),
    fontSize: 18,
    color: '#00f462',
    textAlign: 'center',
  },
  mainText1: {
    width: width(75),
    fontWeight: 'bold',
    marginVertical: height(2),
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E2E2E2',
    padding: 20,
    borderRadius: 10,
    marginBottom: '10%',
    width: 350,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    width: '80%',
    textAlign: 'center',
    fontSize: 15
  },
});

export default NetworkConnect;
