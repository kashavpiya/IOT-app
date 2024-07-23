import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import SwitchSelector from 'react-native-switch-selector';
import Slider from '@react-native-community/slider';
import { DeviceContext } from '../../states/device/DeviceContext';
import { RFValue } from 'react-native-responsive-fontsize';
import logo from '../../assets/logoformobile.png'
import { LinearGradient } from 'expo-linear-gradient';

const Sensor = ({ route, navigation }) => {
  
  const device = route.params.data;
  const { startShower, updateSettings, fetchDevices } = useContext(DeviceContext);
  const [sensorStatus, setSensorStatus] = useState(device.mode);
  const [ depth, setDepth ] = useState(Math.ceil(device.rg / 2.56));

  const openURL = () => {
    Linking.openURL(
      'https://www.youtube.com/watch?v=ZWcIoWgC1V8'
    );
  };


  useEffect(() => {
    fetchDevices();
  }, []);

  const options = [
    { label: 'Min', value: 30 },
    { label: 'Mid', value: 60 },
    { label: 'Max', value: 101 }
  ];

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.navContainer}>
          <MaterialCommunityIcons
            name='chevron-left'
            color={'white'}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.centerContainer}>
            <Image source={logo} style={styles.image} />
          </View>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>SENSITIVITY</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardTitleText}>Sensitivity Adjustment</Text>
          <Text style={styles.cardtext}>If adjustments are needed for a large shower or smaller person, adjust sensitivity control. Watch the video for how to set up correctly.</Text>
          <View style={styles.selector}>
              <SwitchSelector 
                  options={options}
                  initial={sensorStatus}
                  onPress={async (value) => {
                    setDepth(value);
                    console.log(value);
                    // Call updateSettings using await
                    try {
                        await updateSettings(device.id, null, null, null, null, value);
                        await startShower(device.id, "SHOWEROFF");
                        await fetchDevices();
                        console.log('Settings updated successfully');
                    } catch (error) {
                        console.log('Error updating settings:', error);
                    }
                    }} 
                  buttonColor={ELECTRIC_BLUE} 
                  textStyle={{ color: 'white', fontFamily: 'SofiaSans_400Regular', }}
                  backgroundColor={'#434343'} 
                  selectedTextStyle={{ color: 'white' }}
              />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['rgba(6, 253, 120, 0.08)', 'rgba(0, 28, 211, 1)']}
        start={{ x: 0, y: 1.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
          
          
          <Text style={styles.gradientTitleText}>
            Sensor
          </Text>
          <Text style = {styles.gradientSubText}>
            Power Shower's built in sensor allows for the water to shut off when you step away from the shower head.
          </Text>

          <TouchableOpacity style={styles.gradientButton} onPress={openURL}>    
              <Text style={styles.buttonText}>Recommended Video</Text>
          </TouchableOpacity>

      </LinearGradient>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
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
    width: width(75),
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    color: '#8e8e8e',
    lineHeight: 28,
  },
  cardView: {
    paddingVertical: height(3),
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#313131',
    width: width(90),
    marginHorizontal: width(5),
    marginBottom: height(2),
    marginTop: height(2),
    borderRadius: 20,
  },
  cardTitleText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: height(2),
  },
  title: {
    width: width(80),
    marginHorizontal: width(10),
    marginVertical: height(2),
  },
  titleText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  gradientCard: {
    backgroundColor: '#313131',
    width: width(90),
    marginHorizontal: width(5),
    marginBottom: height(2),
    marginTop: height(4),
    borderRadius: 20,
    paddingVertical: height(4),
    paddingHorizontal: width(5),
  },
  gradientTitleText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: height(2),
  },
  gradientSubText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 16,
    lineHeight: 28,
  },
  gradientButton: {
    marginTop: height(3),
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 6,
  },
  buttonText: {
    fontFamily: 'SofiaSans_400Regular',
    textDecorationLine: 'none',
    color: 'white',
    fontSize: 18,
  },
  selector:{
    marginTop: height(3),
    width: '80%',
  }
});

export default Sensor;