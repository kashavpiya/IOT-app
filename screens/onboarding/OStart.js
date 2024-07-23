import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Appbar, ProgressBar, TextInput, Snackbar} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { DeviceContext } from '../../states/device/DeviceContext';
import logo from '../../assets/mainlogo.png';

const OStart = ({ navigation }) => {

  const [visible, setVisible] = useState('');
  const [message, setMessage] = useState('');


  return (
      <ScrollView style={styles.container}>
          <View style={styles.navContainer}>
            <MaterialCommunityIcons
              name='chevron-left'
              color={'black'}
              size={24}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.centerContainer}>
              <Image source={logo} style={styles.image} />
            </View>
          </View>
        
          <View style={styles.card}>
            <View style={styles.cardView}>
              <View>
                <Text style={styles.cardTitleText}>1. Onboard Device</Text>
                <Text style={styles.cardtext}>Connect your Power Shower to WiFi</Text>
                <Text style={styles.cardSubText}>≈ 5 min</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.gradientButton} onPress={() => navigation.navigate('Onboarding', { screen: 'IDInput' })}>    
                  <Text style={styles.buttonText}>Onboarding</Text>
                </TouchableOpacity> 
              </View>     
            </View>
          </View>


          <View style={styles.card}>
            <View style={styles.cardView}>
              <View>
                <Text style={styles.cardTitleText}>2. Install Smart Shower Head</Text>
                <Text style={styles.cardtext}>How to install and position Power Shower</Text>
                <Text style={styles.cardSubText}>≈ 10 min</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.gradientButton} onPress={() => navigation.navigate('Onboarding', { screen: 'Installation' })}>    
                  <Text style={styles.buttonText}>Install</Text>
                </TouchableOpacity> 
              </View>  
            </View>
          </View>


          <View style={styles.card}>
            <View style={styles.cardView}>
              <View>
                <Text style={styles.cardTitleText}>3. Quick Start</Text>
                <Text style={styles.cardtext}>Learn how it works</Text>
                <Text style={styles.cardSubText}>≈ 3 min</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={styles.gradientButton} onPress={() => navigation.navigate('Onboarding', { screen: 'QuickStart' })}>    
                  <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity> 
              </View>
            </View>
          </View>


      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
      },
      navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height(8),
        marginHorizontal: width(8),
      },
      centerContainer: {
        flex: 1,
        alignItems: 'center',
      },
      image: {
        resizeMode: 'contain',
        height: height(15),
        width: width(40),
      },
      cardtext: {
        fontSize: 16,
        fontFamily: 'SofiaSans_400Regular',
        color: '#6e6e6e',
        lineHeight: 28,
      },
      cardSubText: {
        fontSize: 16,
        fontFamily: 'SofiaSans_400Regular',
        color: '#9f9fa0',
        
      },
      cardView: {
        paddingVertical: height(3),
        paddingHorizontal: width(10),
        
      },
      card: {
        backgroundColor: '#d9d9d9',
        width: width(90),
        marginHorizontal: width(5),
        marginBottom: height(2),
        marginTop: height(2),
        borderRadius: 20,
      },
      cardTitleText: {
        color: '#555555',
        fontFamily: 'SofiaSans_400Regular',
        fontSize: 21,
        paddingBottom: height(2),
        fontWeight: 'bold',
      },
      gradientButton: {
        marginTop: height(3),
        backgroundColor: ELECTRIC_BLUE,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 6,
        width: width(65),
      },
      buttonText: {
        fontFamily: 'SofiaSans_400Regular',
        textDecorationLine: 'none',
        color: 'white',
        fontSize: 18,
        paddingVertical: height(1),
      },
});

export default OStart;
