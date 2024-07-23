import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Slider from '@react-native-community/slider';
import { DeviceContext } from "../../states/device/DeviceContext";
import { ELECTRIC_BLUE } from '../../shared/Constant';
const Timer1 = ({ route, navigation }) => {
  const device = route.params.data;
  const { startShower, selectedTemperature, updateSettings, fetchDevices} = useContext(DeviceContext);
  const [switchValue, setSwitchValue] = useState(true);
  const [selectedTimer, setSelectedTimer] = useState(15);
  const [startTimer, setStartTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(selectedTimer * 60);
  const [customTime, setCustomTime] = useState('');
  useEffect(() => {
    fetchDevices();
  }, []);
  
  // console.log(device.maxwater);
  const [maxWater, setMaxWater] = useState(device.maxwater/60);
  const [idlet, setIdlet] = useState(device.idlet/60);
  // console.log(device);

  const handleSaveSettings = async () => {
    try {
      await updateSettings(device.id, device.temp, idlet * 60, maxWater * 60, device.mode, device.rg);
      // Wait for the state to be updated before fetching devices
      await fetchDevices();
      console.log('Settings updated successfully');
    } catch (error) {
      console.log('Error updating settings:', error);
    }
  };
  
  const toggleSwitch = () => {
    setSwitchValue(!switchValue);
  }
  useEffect(() => {
    const handleTimerCompletion = async () => {
      try {
        await startShower(device.id, 'SHOWEROFF', selectedTemperature);
        console.log(`Stopped ${device.name} successfully`);
      } catch (error) {
        console.log('Error stopping the shower:', error);
      }
    };
  
    if (startTimer) {
      (async () => {
        try {
          await startShower(device.id, 'SHOWERON', selectedTemperature);
          console.log(`Started ${device.name} successfully`);
        } catch (error) {
          console.log('Error starting the shower:', error);
        }
      })();
    }

    return () => {

    }; 
  }, [startTimer, device.id, startShower, selectedTemperature]);

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
    setRemainingTime(value * 60);
    setTimerKey((prevKey) => prevKey + 1);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navContainer}>
        <MaterialCommunityIcons
          name='chevron-left'
          size={24}
          color={'white'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>Timer</Text>
      </View>
      <View style={styles.timer}>
        <View style={styles.text}>
          <Text style={styles.defaultText}>Power Shower's water is set to a default automatic shutoff timer of 15 min</Text>
        </View>
        <View style={styles.defaultTimerContainer}>
          <Text style={styles.textLeft}>Default Timer</Text>
          <Switch
          value={switchValue}
          onChange={toggleSwitch}
          style={styles.realSwitchContainer}
          trackColor={{ false: "#c3c2c2", true: "#7f90ee" }}
          thumbColor="#3c54f2"
          height={40}
          width={70} 
          transformScale={1.5} 
          />
        </View>
        <View style={styles.defaultTimer}>
          <TouchableOpacity onPress={handlePressStartStop}>
            <CountdownCircleTimer
              key={timerKey}
              isPlaying={startTimer}
              duration={switchValue ? 900 : remainingTime} // 900 seconds = 15 minutes
              colors={['#3c54f2']}
              onComplete={() => handlePressStartStop()}
              strokeWidth={24}
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
      <View style={styles.sliderContainer}>
        {switchValue ? (
          <Text style={styles.timerValue}></Text>
        ) : (
          <>
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
      <View>
        <Text style={styles.defaultTextLight}>Maximum can be set to 20 min of water flow</Text>
      </View>
      <View style={styles.sliderView1}>
          <Text style={styles.bodyText}>Max Water: {maxWater} mins</Text>
            <Slider
              style={{ width: '80%', alignSelf: 'center' }}
              value={maxWater}
              minimumValue={1}
              maximumValue={20}
              step={1}
              maximumTrackTintColor='#c3c2c2'
              minimumTrackTintColor='#c3c2c2'
              thumbTintColor='#3c54f2'
              onValueChange={(value) => setMaxWater(value)}
            />
        </View>
        <View style={styles.sliderView2}>
          <Text style={styles.bodyText}>Idle Time: {idlet} mins</Text>
            <Slider
              style={{ width: '80%', alignSelf: 'center' }}
              value={idlet}
              minimumValue={1}
              maximumValue={5}
              step={1}
              maximumTrackTintColor='#c3c2c2'
              minimumTrackTintColor='#c3c2c2'
              thumbTintColor='#3c54f2'
              onValueChange={(value) => setIdlet(value)}
            />
        </View> 
        <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
          <Text style={styles.bodyText}>Save</Text>
        </TouchableOpacity>
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
    marginTop: height(10),
    alignItems: 'center',
    marginLeft: width(3),
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: width(35),
    color: 'white',
  },
  text: {
    width: width(75),
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    justifyContent: 'center',
  },
  defaultText: {
    textAlign: 'center',
    color: 'white',
  },
  defaultTextLight: {
    textAlign: 'center',
    color: '#777',
    marginTop: height(2),
  },
  timer: {
    marginTop: height(5),
    alignItems: 'center',
  },
  defaultTimer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: height(2),
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: width(80),
    height: 40,
  },
  timerValue: {
    fontSize: 18,
    marginTop: 10,
  },
  sliderContainer: {
    alignItems: 'center',
    marginTop: height(5),
  },
  resetTimerContainer: {
    alignItems: 'center',
    marginTop: height(2),
  },
  defaultTimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width(5),
    paddingTop: height(2),
    paddingBottom: height(5),
    width: width(90),
  },
  textLeft: {
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
  },
  realSwitchContainer: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
  },
  input: {
    width: 60,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
  },
  sliderView1: {
    marginTop: height(12),
  },
  sliderView2: {
    marginTop: height(5),
  }, 
  button: {
    backgroundColor: ELECTRIC_BLUE,
    width: width(25),
    paddingHorizontal: width(3),  
    paddingVertical: 10,
    borderRadius: 5,  
    alignItems: 'center',
    marginVertical: height(10),
    marginHorizontal: width(37),
  },
  bodyText: {
    paddingHorizontal:width(5),
    color: 'white',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    textAlign: 'center',
    paddingTop: 1,
  },
});

export default Timer1;