import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import * as Animatable from "react-native-animatable";
import { ELECTRIC_BLUE } from '../../../shared/Constant';
import GuidelineStep1 from './GuidelineStep1';
import GuidelineStep2 from './GuidelineStep2';

const Guideline = ({ setVisible }) => {
  const [step, setStep] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const nextStep = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setStep(2);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    });
  }

  const goBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setStep(1);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }

  const renderContent = () => {
    if (step === 1) {
      return (
        <GuidelineStep1 nextStep={nextStep} setVisible={setVisible} />
      )
    } else if (step === 2) {
      return (
        <GuidelineStep2 setVisible={setVisible} goBack={goBack} />
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect to Power Shower Wifi</Text>
        <MaterialCommunityIcons name='access-point' size={30} color='black' />
      </View>
      <Divider />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    height: height(60)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height(1),
  },
  headerText: {
    fontSize: 18,
    marginRight: width(2),
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'left',
    marginTop: height(2),
  },
  instruction: {
    fontSize: 15,
    width: width(40)
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: height(80),
    width: width(40),
    marginVertical: -height(25),
    borderRadius: 15,
    borderColor: 'black'
  },
  nextBtn: {
    backgroundColor: ELECTRIC_BLUE,
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10
  },
  btnWrapper: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  skipBtn: {
    backgroundColor: '#E2E2E2',
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: width(2)
  }
});

export default Guideline;
