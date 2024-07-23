import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import SettingItem from './SettingItem';

const DeviceSettings = (props) => {
  const {
    navigation,
    deviceId,
    setRenameDialog,
    setAddUserDialog,
    setTempDialog,
    setGglNestDialog,
    setAlexaDialog,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SETTINGS</Text>
      <View style={styles.rowContainer}>
        <SettingItem
          icon='battery'
          title='Battery'
          action={() => navigation.navigate('Devices', { screen: `Battery_${deviceId}` })}
        />
        <SettingItem
          icon='account-multiple-plus'
          title='Users'
          action={() => setAddUserDialog(true)}
        /> 
        
        <SettingItem
          icon='chart-timeline-variant'
          title='Savings'
          action={() => navigation.navigate('MainApp', { screen: 'Savings' })}
        />
      </View>
      <View style={styles.rowContainer}>
        <SettingItem
          icon='history'
          title='History'
          action={() => navigation.navigate('Devices', { screen: `History_${deviceId}` })}
        />
        <SettingItem
          icon='pencil-outline'
          title='Name'
          action={() => setRenameDialog(true)}
        />
        <SettingItem icon='bell-outline' title='Alert' />
      </View>
      <View style={styles.rowContainer}>
        <SettingItem
          icon='thermometer-low'
          title='Temperature'
          action={() => setTempDialog(true)}
        />
        <SettingItem
          icon='timelapse' 
          title='Timer' 
          action={() => navigation.navigate('Devices', { screen: `Timer_${deviceId}` })} 
        />
       
        {/* <SettingItem
          icon='google'
          title='Google Nest'
          action={() => setGglNestDialog(true)}
        />
        <SettingItem
          icon='logo-amazon'
          title='Amazon Alexa'
          action={() => setAlexaDialog(true)}
        /> */}
    </View>   
    {/* <View style={styles.rowContainer}>
    <SettingItem
          icon='timelapse' 
          title='Timer' 
          action={() => navigation.navigate('Devices', { screen: `Timer_${deviceId}` })} 
        />
    </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height(2)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height(2),
    marginBottom: height(1),
  },
  heading: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'NunitoSans_400Regular',
    color: '#8E8E8F'
  }
});

export default DeviceSettings;