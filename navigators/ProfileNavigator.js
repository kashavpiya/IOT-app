import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import ProfileInfo from '../screens/profile/ProfileInfo';
import DevicesNavigator from '../navigators/DevicesNavigator'
import SmartHome from '../screens/profile/SmartHome';

const ProfileStack = createStackNavigator();

const ProfileNavigator = ({ route }) => {
  const { screen, data } = route.params;
  return (
    <ProfileStack.Navigator initialRouteName='ProfileScreen'>
      <ProfileStack.Screen
        name='ProfileScreen'
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name='ProfileInfo'
        component={ProfileInfo}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name='SmartHome'
        component={SmartHome}
        options={{
          headerShown: false,
        }}
      />
      
    </ProfileStack.Navigator>
    
  )
}

export default ProfileNavigator;