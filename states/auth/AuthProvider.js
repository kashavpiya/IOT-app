import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLinkTo } from '@react-navigation/native';
import { AuthContext } from './AuthContext';
import DeviceProvider from '../device/DeviceProvider';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const linkTo = useLinkTo();
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const register = async (userName, password, email) => {
    try {
      const response = await axios({
        method: 'POST',
        url: "https://api.powershower.net/api/auth/signup",
        data: { "username": userName,"password": password, "role": ["user"], "email": email },
        headers: { 'Content-Type': 'application/json' },
      });
      await login(userName, password);
    } catch (error) {
      console.log('Error signing up');
      console.log(error.message);
    }
  } 

  const login = async (userName, password) => {
    try {
      const response = await axios({
        method: 'post',
        url: "https://api.powershower.net/api/auth/signin",
        data: { "username": userName, "password": password },
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
      const user = { ...response.data, password: password, username: userName };
      console.log(user);
      console.log("access token", user.accessToken);
      console.log("refresh token", user.refreshToken);
      console.log(user.id);
      AsyncStorage.setItem('userData', JSON.stringify(user));
      setState(state => ({
        ...state,
        user: user,
        isAuthenticated: true,
      }));
      linkTo('/MainApp');
    } catch (error) {
      console.log(error.message);
      console.log("^^^");
      return 'Wrong username or password';
    }
  };

  const logout = () => {
    AsyncStorage.removeItem('userData');
    setState(state => ({
      ...state,
      user: null,
      isAuthenticated: false,
      loading: false,
    }));
  };

  const changeInfo = async (field, value) => {
    const { accessToken } = state.user;
    console.log(field, value);
    try {
      const response = await axios({
        method: 'POST',
        url: `https://api.powershower.net/api/iot/user/change-info`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
        data: {
          "username": (field === "username") ? value : state.user.username,
          "email": (field === "email") ? value : state.user.email,
          "password": (field === "password") ? value : state.user.password,
        }
      });

      setState((prevState) => ({
        ...prevState,
        user: { ...prevState.user, [field]: value },
      }));


      return response;
    } catch (error) {
      console.log('Error changing ' + field);
      console.log(error);
    }
  }


const sendVerification = async (targetUser) => {
  try {
    const response = await axios({
        method: 'POST',
        url: `http://api.powershower.net/api/auth/forgot-password`,
        data: { 
          "username": targetUser  
        }
    });
  } catch (error) {
    console.log('Error sending verification');
    console.log(error);
  }
}




const resetPassword = async (targetUser, code, newPassword) => {
  try {
    const response = await axios ({
      method: 'POST',
      url: `http://api.powershower.net/api/auth/reset-password`,
        data: { 
          "username": targetUser,
          "verificationCode": code,
          "newPassword": newPassword  
        }
    });
  } catch (error) {
    console.log('Error changing password');
    console.log(error);
  }
}


const checkAuthenticationStatus = async () => {
  const userData = await AsyncStorage.getItem('userData');
  if (userData) {
    console.log(userData);
    const user = JSON.parse(userData);
    setState({ ...state, user, isAuthenticated: true });
    // if the access token has expired
    refreshAccessToken(user.username, user.refreshToken, user.id, user.email);
  } else {
    setState({ ...state, loading: false }); // Set loading to false if no user data
  }
};

  const refreshAccessToken = async (userName, refToken, userId, emailAdd) => {
    
    console.log("attempting to refresh");
    try {
      const response = await axios({
        method: 'POST',
        url: `https://api.powershower.net/api/auth/refresh`,
        data: {
          refreshToken: refToken,
          username: userName,
          id: userId,
          email: emailAdd,
        }
      });
      console.log(response.data);
      const { accessToken, refreshToken: newRefreshToken, username, id, email } = response.data;
      
      const updatedUser = { ...state.user, accessToken, refreshToken: newRefreshToken, username, id, email };
      setState({ ...state, isAuthenticated: true });
      AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setState({ ...state, user: updatedUser });
      return accessToken; // Return the new access token for further use
    } catch (error) {
      console.log('Error refreshing token: ' + error.message);
      throw error;
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const { user } = state;
      if (user && user.accessToken && user.refreshToken) {
        refreshAccessToken(user.username, user.refreshToken, user.id, user.email);
      }
    }, 3600000); // Refresh every hour (3600000 milliseconds)
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <AuthContext.Provider value={{ state, register, login, logout, changeInfo, refreshAccessToken, sendVerification, resetPassword}}>
      {state.user ? <DeviceProvider>{children}</DeviceProvider> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
