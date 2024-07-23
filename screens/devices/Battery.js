import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image
} from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DeviceContext } from '../../states/device/DeviceContext';
import logo from '../../assets/logoformobile.png'
import { LinearGradient } from 'expo-linear-gradient';

const Battery = ({ route, navigation }) => {
  const device = route.params.data;
  const { getStatus } = useContext(DeviceContext);
  const [batteryStatus, setBatteryStatus] = useState(0);

  const calculateBatteryPercentage = (voltage) => {
    let abv = voltage - 3.5;
    if (abv < 0) {
      abv = 0;
    }
  
    const batteryPercentage = Math.min(Math.max((abv / (4.1 - 3.5)) * 100, 0), 100);
    return batteryPercentage;
  };

  

  useEffect(() => {
    const checkDeviceStatus = async () => {
      try {
        const deviceId = device.id;
        const response = await getStatus(deviceId);
        if (response && response.payload) {
          if (response.payload.batt !== undefined) {
            // setBatteryStatus(response.payload.batt);
            batteryPercentage = Math.ceil(response.payload.batt / 10) * 10;
            setBatteryStatus(batteryPercentage);
            console.log(response.payload.batt);
          }
        }   
      } catch (error) {
        console.error("Error checking device status:", error);
      }
    };

    checkDeviceStatus();
  }, [device.id, getStatus]);

  const openURL = () => {
    Linking.openURL(
      'https://www.youtube.com/watch?v=ZWcIoWgC1V8'
    );
  };

  const getBatteryColor = (batteryValue) => {
    if (batteryValue >= 0 && batteryValue <= 20) {
      return '#FC0000';
    } else if (batteryValue > 20 && batteryValue <= 70) {
      return '#F47A00';
    } else {
      return '#4BF400';
    }
  };

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
        <Text style={styles.titleText}>BATTERY</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardtext}>
            Current Battery Percentage
          </Text>

          <Text style={{ fontSize: 70, color: getBatteryColor(batteryStatus)}}>
            {batteryStatus}% 
          </Text>
        </View> 
      </View>

      <LinearGradient
        colors={['rgba(6, 253, 120, 0.08)', 'rgba(0, 28, 211, 1)']}
        start={{ x: 0, y: 1.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
          
          
          <Text style={styles.gradientTitleText}>
            Automatically Recharges
          </Text>
          <Text style = {styles.gradientSubText}>
            The internal battery is self charging with the flow of your shower. Expect the number to fluctuate over time.
          </Text>

          
          
            <TouchableOpacity style={styles.gradientButton} onPress={openURL}>    
                <Text style={styles.buttonText}>Watch the video</Text>
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
    // flexDirection: 'row',
  },
  card: {
    backgroundColor: '#313131',
    width: width(90),
    marginHorizontal: width(5),
    marginBottom: height(2),
    marginTop: height(2),
    borderRadius: 20,
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
  }
});

export default Battery;
