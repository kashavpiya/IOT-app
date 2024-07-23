import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { height, width } from 'react-native-dimension';
import * as Animatable from 'react-native-animatable';
import { ELECTRIC_BLUE, OFF_WHITE } from '../../shared/Constant';
import { AuthContext } from '../../states/auth/AuthContext';
import animation from '../../assets/splash_animation.json';
import { isFirstLaunch } from '../../states/storage/storage';

const WelcomeScreen = ({ navigation }) => {
  const linkTo = useLinkTo();
  const { state } = useContext(AuthContext);
  const loading = state.loading;
  const loggedIn = state.isAuthenticated;
  const animationRef = useRef(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const [appFirstLaunch, setAppFirstLaunch] = useState(false);

  useEffect(() => {
    animationRef.current?.play();
    setTimeout(() => {
      setBtnVisible(true);
    }, 2000);

    const checkFirstLaunch = async () => {
      const firstLaunch = await isFirstLaunch();
      if (firstLaunch) {
        setAppFirstLaunch(true);
      }
    };
    checkFirstLaunch();
  }, []);

  const nextStep = () => {
    if (appFirstLaunch) {
      linkTo('/WelcomeOnboard');
    } else if (loggedIn) {
      navigation.navigate('MainApp', { screen: 'Home' });
    } else if (loading) {
       navigation.navigate('MainApp', { screen: 'Home' });
    } else {
      linkTo('/SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView ref={animationRef} autoPlay source={animation} loop={false} style={styles.lotto}/>
      <View style={styles.content}>
        {btnVisible && (
          <Animatable.View animation="slideInUp" iterationCount={2} direction="alternate">
            <TouchableOpacity onPress={nextStep} style={styles.btnContainer}>
              <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
  },
  btnContainer: {
    marginTop: height(30),
    backgroundColor: '#E2E2E2',
    padding: 15,
    width: width(50),
    alignItems: 'center',
    borderRadius: 50,
  },
  btnText: {
    fontSize: 15,
    color: ELECTRIC_BLUE,
  },
  lotto: {
    flex: 1,
    width: width(100),
    resizeMode: 'cover',
  },
});

export default WelcomeScreen;