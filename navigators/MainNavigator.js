import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome/Welcome';
import WelcomeOnboard from '../screens/welcome/WelcomeOnboard';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import OnboardingNavigator from './OnboardingNavigator';
import BottomNavigator from './BottomNavigator';
import ResetPassword from '../screens/ResetPassword';
import ResetPass from '../screens/ResetPass';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName='Welcome'>
      <MainStack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name='WelcomeOnboard'
        component={WelcomeOnboard}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen 
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}  
      />
      <MainStack.Screen 
        name="ResetPass"
        component={ResetPass}
        options={{
          headerShown: false,
        }}  
      />
      <MainStack.Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name='Onboarding'
        component={OnboardingNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
      name='MainApp'
        component={BottomNavigator}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: '#121212'},
        }}
      />
    </MainStack.Navigator>
  )
}

export default MainNavigator;