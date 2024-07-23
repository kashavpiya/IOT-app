import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WelcomeScreen from "./WelcomeScreen";
import background1 from '../../assets/bg1.png';
import background2 from '../../assets/bg2.jpeg';
import background3 from '../../assets/bg3.jpeg';

const WelcomeOnboard = () => {
  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      autoplay={true}
      dot={<MaterialCommunityIcons name='water' size={20} color='white' />}
      activeDot={<MaterialCommunityIcons name='water' size={20} color='#8D8D8D' />}
    >
      <WelcomeScreen
        mainText='Thank You'
        subText='for purchasing Power Shower'
        bgColor='#2E2E2E'
        textColor='white'
        bg={background1}
        final={false}
      />
      <WelcomeScreen
        mainText='Welcome'
        subText='to the future of showering'
        bgColor='#CDCDC8'
        textColor='black'
        bg={background2}
        final={false}
      />
      <WelcomeScreen
        mainText='Saving Water'
        subText='has never been easier'
        bgColor='#2E2E2E'
        textColor='white'
        bg={background3}
        final={true}
      />
    </Swiper>
  )
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default WelcomeOnboard;