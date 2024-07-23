import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import DeviceList from './components/DeviceList';
import { DeviceContext } from '../../states/device/DeviceContext';
import ActionButton from '../../components/ActionButton';
import TopNavBar from '../../components/TopNavBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';
import { RFValue } from 'react-native-responsive-fontsize';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

/* const openURL = () => {
  Linking.openURL('https://www.powershower.app/')
};
 */
const AllDevices = ({ navigation }) => {

  const { devices, fetchDevices } = useContext(DeviceContext);

  useFocusEffect(
    useCallback(() => {
      
      fetchDevices();
    }, [])
  );


  return (
    <View style={styles.container}>
      <ScrollView>
        <TopNavBar />
        {(Object.keys(devices).length === 0) ? 
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Onboarding', { screen: 'OStart' })}>
              <Text style={styles.buttonText1}>Set Up Power Shower</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <View style={styles.itemContainer}>
              <Text style={styles.text}>SHOWER HEADS</Text>
              <DeviceList />
            </View>
            <View style={[styles.itemContainer, {marginTop: height(5)}]}>
              
            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding', { screen: 'OStart' })}
              style={styles.containerCon}
            >
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons name='plus' size={24} color={ELECTRIC_BLUE}/>
                    <Text style={styles.buttonText}>Add New Device</Text>
                    <MaterialCommunityIcons name='chevron-right' size={26} color={'white'} style={{ paddingRight: width(2) }}/>
                </View>
                
              </TouchableOpacity>
            </View>
          </View>
        }
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  itemContainer: {
    alignItems: 'center',
    marginTop: height(3)
  },
  text: {
    marginBottom: height(2),
    fontSize: RFValue(17),
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color:'white',
    flex:1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: height(1),
    backgroundColor: '#363636',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    elevation: 2,
    width: width(90),

  },
  containerCon: {
      height: 70,
      marginTop: height(1),
  },
    button1: { 
      marginTop: heightPercentageToDP(20),
      backgroundColor: ELECTRIC_BLUE,
      paddingHorizontal: width(10),
      paddingVertical: height(2),
      borderRadius: 25
    },
    buttonText1: {
      fontSize: 18,
      color: 'white',
      fontFamily: 'SofiaSans_400Regular',
    },
});

export default AllDevices;