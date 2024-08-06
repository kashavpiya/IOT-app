import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useFonts, NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { SofiaSans_400Regular } from '@expo-google-fonts/sofia-sans';
import AuthProvider from './states/auth/AuthProvider';
import MainNavigator from './navigators/MainNavigator';
import { isFirstLaunch, setFirstLaunch } from './states/storage/storage';
import * as Notifications from 'expo-notifications';
import {
  Text, TextInput
} from 'react-native';

//ios client id: 715908069437-k7ggc7t4bha9h2eieigm237q7h13o8bl.apps.googleusercontent.com
//android client id: 715908069437-9pkm5mis2cshcir4ld47rm6u4cjon2nh.apps.googleusercontent.com

const App = () => {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    SofiaSans_400Regular,
  });

  // Override Text scaling
  if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  useEffect(() => {
    const initializeApp = async () => {
      const firstLaunch = await isFirstLaunch();
      if (firstLaunch) {
        await setFirstLaunch();
      }
    };

    initializeApp();

    // Request permission for push notifications
    Notifications.requestPermissionsAsync();

    // Handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const handleNotification = (notification) => {
    try {
      // Handle the received notification
      console.log(notification);
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;