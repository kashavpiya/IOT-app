import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  TextInput,
  MD3DarkTheme,
  Snackbar
} from 'react-native-paper';
import { width, height } from 'react-native-dimension';
import axios from 'axios';
import { AuthContext } from '../states/auth/AuthContext';
import RadialGradientBackground from '../components/GradientBackground';
import logo from '../assets/logo.png';

import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const SignIn = ({ navigation, route }) => {
  const { message } = route.params || "";
  const { login, state } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [msg, setMessage] = useState(message);

  /*  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "715908069437-k7ggc7t4bha9h2eieigm237q7h13o8bl.apps.googleusercontent.com",
    androidClientId: "715908069437-9pkm5mis2cshcir4ld47rm6u4cjon2nh.apps.googleusercontent.com"
  }); */

  useEffect(() => {
    setUserName('');
    setPassword('');
    setMessage('');
  }, [navigation]);

  const signIn = async () => {
    if (userName === '' || password === '') {
      setVisible(true);
      setMessage('User Name and/or Password is required');
    } else {
      const errorMessage = await login(userName, password);
      if (errorMessage) {
        setVisible(true);
        setMessage(errorMessage);
      }
    }
  };

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* <RadialGradientBackground /> */}
          <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text variant='titleSmall' style={styles.title}>
              Sign In To Your Account
            </Text>
            <TextInput
              label="User Name"
              value={userName}
              autoCapitalize="none"
              underlineColor='transparent'
              activeUnderlineColor='white'
              style={styles.input}
              onChangeText={text => setUserName(text)}
              theme={{ roundness: 10 }}
            />
            <TextInput
              label="Password"
              value={password}
              autoCapitalize="none"
              underlineColor='transparent'
              secureTextEntry
              activeUnderlineColor='white'
              style={styles.input}
              onChangeText={text => setPassword(text)}
              theme={{ roundness: 10 }}
            />
            <TouchableOpacity onPress={signIn}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={promptAsync}>
              <Text style={styles.buttonText}>Log in with Google</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline', marginBottom: height(2) }]}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.copyright}>
              Copyright Dry Water Inc. 2024 All Rights Reserved
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {msg &&
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={5000}
        >
          {msg}
        </Snackbar>
      }
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
  },
  headline: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: height(1),
  },
  input: {
    backgroundColor: '#363636',
    width: width(80),
    marginBottom: '8%',
    borderRadius: 10,
    fontFamily: 'NunitoSans_400Regular'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular'
  },
  logo: {
    resizeMode: 'contain',
    width: width(65),
    height: height(10),
    marginTop: height(5),
  },
  title: {
    marginTop: height(5),
    color: 'white',
    textAlign: 'center',
    marginBottom: height(2),
    fontSize: 16,
    fontFamily: 'NunitoSans_400Regular'
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    width: width(80),
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: height(2),
    marginBottom: height(8)
  },
  text: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: height(10),
  },
  copyright: {
    marginTop: height(2),
    fontSize: 12,
    textAlign: 'center',
    color: '#C9C9C9',
    fontFamily: 'NunitoSans_400Regular'
  }
});

export default SignIn;