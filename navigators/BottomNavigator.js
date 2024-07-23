import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Profile from '../screens/profile/Profile';
import Savings from '../screens/Savings';
import Home from '../screens/Home';
import DevicesNavigator from './DevicesNavigator';
import ProfileNavigator from './ProfileNavigator';

const BottomTabs = createBottomTabNavigator();

const BottomNavigator = ({ route }) => {
  const { message } = route.params || '';
  const list = [
    ['Savings', Home, 'chart-timeline-variant'],
    ['Shower Heads', DevicesNavigator, 'shower-head'],
    ['More', ProfileNavigator, 'menu']
  ];

  return (
      <BottomTabs.Navigator
        screenOptions={{
          activeTintColor: 'white',   
          inactiveTintColor: 'white',
          labelPosition: 'beside-icon',  
          tabStyle: {
            elevation: 0, // Remove shadow on Android
          },
          tabBarStyle: [ {
            "display": "flex"
          }, 
        null]
        }}
      >
        {list.map((item, key) => (
          <BottomTabs.Screen
            key={key}
            name={item[0]}
            component={item[1]}
            initialParams={{ message: message }}
            options={{
              headerShown: false,
              tabBarIcon: (({ color, size }) => (
                <MaterialCommunityIcons
                  focused
                  name={item[2]}
                  size={size}
                  color={color}
                />
              )),
              tabBarStyle: {
                backgroundColor: '#121212', 
                height: 70,
                paddingBottom: 10
              },
            }}
          />
        ))}
      </BottomTabs.Navigator>
  )
}

export default BottomNavigator;