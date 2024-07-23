import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import SwitchSelector from 'react-native-switch-selector';
import { DeviceContext } from '../../states/device/DeviceContext';
import logo from '../../assets/logoformobile.png'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const Temperature = ({ route, navigation }) => {
  const openURL = () => {
    Linking.openURL(
      'https://www.youtube.com/watch?v=ZWcIoWgC1V8'
    );
  };

  const device = route.params.data;
  const { updateSettings, fetchDevices } = useContext(DeviceContext);
  const [temp, setTemp] = useState(device.temp);

  useEffect(() => {
    fetchDevices();
  }, []);

  
  const options = [
    { label: 'Cold Shower', value: 30 },
    { label: 'Low', value: 90 },
    { label: 'High', value: 105 },
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
          <Text style={styles.titleText}>TEMPERATURE</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardTitleText}>Adjust Monitor Temperature</Text>
          <Text style={styles.cardtext}>DOES NOT ADJUST THE HEAT</Text>
          <Text style={styles.cardtext}>ADJUST YOUR SHOWERS WATER HANDLES</Text>
          <View style={styles.selector}>
              {console.log(temp)}
              <SwitchSelector 
                
                options={options}
                initial={
                  temp < 90 ? 0 : 
                  temp < 105 ? 1 : 
                  2}
                onPress={async (value) => {
                  setTemp(value);
                  try {
                    await updateSettings(device.id, value, null, null, null, null);
                    await fetchDevices();
                    console.log('Settings updated successfully');
                  } catch (error) {
                    console.log('Error updating settings or fetching devices:', error);
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
            Monitor Pre Heat
          </Text>
          <Text style = {styles.gradientSubText}>
            Power Shower's does not control temperature - it measures it. Set your shower to your preferred temperature as you normally would. Power Shower will run water until your desired temperature is reached, and then holds the water - until you step in. Saving water and energy that would otherwise be wasted.
          </Text>

          
          
            <TouchableOpacity style={styles.gradientButton} onPress={openURL}>    
                <Text style={styles.buttonText}>How it works</Text>
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
    width: '90%',
  }
});

export default Temperature;