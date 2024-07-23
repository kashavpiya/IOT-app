import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Slider from '@react-native-community/slider';
import { DeviceContext } from "../../states/device/DeviceContext";
import { ELECTRIC_BLUE } from '../../shared/Constant';
import logo from '../../assets/logoformobile.png'
import { LinearGradient } from 'expo-linear-gradient';
import SwitchSelector from 'react-native-switch-selector';

const Timer = ({ route, navigation }) => {
  const device = route.params.data;
  const { startShower, updateSettings, fetchDevices} = useContext(DeviceContext);
  const [switchValue, setSwitchValue] = useState(true);
  const [selectedTimer, setSelectedTimer] = useState(15);
  const [startTimer, setStartTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(selectedTimer * 60);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    fetchDevices();
  }, []);

  const options = [
    { label: 'On', value: 0 },
    { label: 'Off', value: 1 },
  ];
  
  const toggleSwitch = () => {
    setSwitchValue(!switchValue);
  }

  const handleTimerCompletion = async () => {
    try {
      await startShower(device.id, 'SHOWEROFF');
      console.log(`Stopped ${device.name} successfully`);
    } catch (error) {
      console.log('Error stopping the shower:', error);
    }
  };

  useEffect(() => {
    const handleTimerCompletion = async () => {
      try {
        await startShower(device.id, 'SHOWEROFF');
        console.log(`Stopped ${device.name} successfully`);
      } catch (error) {
        console.log('Error stopping the shower:', error);
      }
    };
  
    if (startTimer) {
      (async () => {
        try {
          await startShower(device.id, 'SHOWERON');
          console.log(`Started ${device.name} successfully`);
        } catch (error) {
          console.log('Error starting the shower:', error);
        }
      })();
    }
  
    return () => {
      
    }; 
  }, [startTimer, device.id, startShower]);

  const handlePressStartStop = () => {
    if (startTimer) {
      setStartTimer(false);
      
      // Save the remaining time when stopping the timer
      setRemainingTime(remainingTime);
    } else {
      setStartTimer(true);
      setRemainingTime(remainingTime);
      // setTimerKey((prevKey) => prevKey + 1);
    }
  };

  const resetTimer = () => {
    setStartTimer(false);
    setSelectedTimer(15);
    setRemainingTime(15 * 60);
    setTimerKey((prevKey) => prevKey + 1);
  };

  const handleSliderChange = (value) => {
    setSelectedTimer(value);
    if (value > device.maxwater / 60) {
      // setMaxWater(value);
      // handleSaveSettings();
    }
    setRemainingTime(value * 60);
    setTimerKey((prevKey) => prevKey + 1);
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
          <Text style={styles.titleText}>TIMER</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardTitleText}>Default Settings</Text>
          <Text style={styles.cardtext}>Default Shut off 15 min</Text>
          <View style={styles.selector}>
            <SwitchSelector 
                options={options}
                initial = {0}
                onPress = {toggleSwitch}
                buttonColor={ELECTRIC_BLUE} 
                textStyle={{ color: 'white', fontFamily: 'SofiaSans_400Regular', }}
                backgroundColor={'#434343'} 
                selectedTextStyle={{ color: 'white' }}
            />
          </View>
          
          <View style={styles.sliderContainer}>
            {switchValue ? (
              <Text style={styles.timerValue}></Text>
            ) : (
              <>
                <Text style={styles.cardTitleText}>Select time</Text>
                <Text style={styles.cardtext}>    Maximum up to 20 min</Text>
                <Slider
                  style={{ width: width(80), height: 40 }}
                  minimumValue={3}
                  maximumValue={20}
                  step={1}
                  value={selectedTimer}
                  onValueChange={handleSliderChange}
                  maximumTrackTintColor='#c3c2c2'
                  minimumTrackTintColor='#c3c2c2'
                  thumbTintColor='#3c54f2'
                  disabled={switchValue} // Disable the slider when switch is true
                />
                
              </>
        )}
      </View>
      </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
        <Text style={styles.cardTitleText}>Timer</Text>
        <View style={styles.timer}>
          <TouchableOpacity onPress={handlePressStartStop}>
            <CountdownCircleTimer
              key={timerKey}
              isPlaying={startTimer}
              duration={switchValue ? 900 : remainingTime} // 900 seconds = 15 minutes
              colors={['#3c54f2']}
              onComplete={() => handleTimerCompletion()}
              strokeWidth={23}
              size={250}
            >
              {({ remainingTime, animatedColor }) => (
                <View>
                  <Text style={{ fontSize: 50, color: 'white', fontFamily: 'SofiaSans_400Regular', paddingTop: 20 }}>
                    {Math.floor(remainingTime / 60).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                    :
                    {(remainingTime % 60).toLocaleString('en-US', {
                      minimumIntegerDigits: 2,
                      useGrouping: false,
                    })}
                  </Text>
                  
                    <TouchableOpacity style={styles.resetTimerContainer} onPress={resetTimer}>
                      <MaterialCommunityIcons
                        name='restore'
                        size={24}
                        color={'white'}
                        style={{marginTop: 5}}
                      />
                    </TouchableOpacity>
                  
                </View>
              )}
            </CountdownCircleTimer>
          </TouchableOpacity>
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
            Auto Water Shut Off
          </Text>
          <Text style = {styles.gradientSubText}>
            Select the countdown timer for automatic water shut off.
          </Text>
          <Text style = {styles.gradientSubText}>
            When timer is selected in sensor mode, after the timer reaches zero the water stops for a moment and then starts again if the sensor is detecting something in its range.
          </Text>
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
    paddingBottom: height(1),
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
    marginVertical: height(3),
    width: '80%',
  },
  sliderContainer: {
    textAlign: 'center',
  },
  timer:{
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  resetTimerContainer: {
    alignItems: 'center',
    marginTop: height(2),
  },
});

export default Timer;