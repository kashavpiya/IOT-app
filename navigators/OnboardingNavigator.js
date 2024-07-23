import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TurnOnButton from '../screens/onboarding/TurnOnButton'
import QRCode from '../screens/onboarding/QRCode';
import ShowerWifiInput from '../screens/onboarding/ShowerWifiInput';
import QRCodeScanner from '../screens/onboarding/QRCodeScanner';
import IDInput from '../screens/onboarding/IDInput';
import ShowerheadConnect from '../screens/onboarding/ShowerheadConnect';
import NetworkConnect from '../screens/onboarding/NetworkConnect';
import DeviceName from '../screens/onboarding/DeviceName';
import FinalStep from '../screens/onboarding/FinalStep';
import PSWifi from '../screens/onboarding/PSWifi';
import ReconnectWifi from '../screens/onboarding/ReconnectWiFi';
import RestartDev from '../screens/onboarding/RestartDev';
import OStart from '../screens/onboarding/OStart';
import Installation from '../screens/onboarding/Installation';
import QuickStart from '../screens/onboarding/QuickStart';


const OnboardingStack = createStackNavigator();

const OnboardingNavigator = ({ route }) => {
  const { connectionInfo, id, pin } = route.params || null;
  return (
    <OnboardingStack.Navigator initialRouteName='OStart'>
      <OnboardingStack.Screen
        name='OStart'
        component={OStart}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='Installation'
        component={Installation}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='QuickStart'
        component={QuickStart}
        options={{
          headerShown: false,
        }}
      />
      
      <OnboardingStack.Screen
        name='IDInput'
        component={IDInput}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='TurnOnButton'
        component={TurnOnButton}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='PSWifi'
        component={PSWifi}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='QRCode'
        component={QRCode}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      /> 
      <OnboardingStack.Screen
        name='ShowerWifiInput'
        component={ShowerWifiInput}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='QRCodeScanner'
        component={QRCodeScanner}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      /> 
      <OnboardingStack.Screen
        name='ShowerheadConnect'
        component={ShowerheadConnect}
        initialParams={{ connectionInfo: connectionInfo, id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='NetworkConnect'
        component={NetworkConnect}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='ReconnectWiFi'
        component={ReconnectWifi}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />

      <OnboardingStack.Screen
        name='DeviceName'
        component={DeviceName}
        initialParams={{ id: id, pin: pin }}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='RestartDev'
        component={RestartDev}
        options={{
          headerShown: false,
        }}
      />
      <OnboardingStack.Screen
        name='FinalStep'
        component={FinalStep}
        options={{
          headerShown: false,
        }}
      />
    </OnboardingStack.Navigator>
  )
}

export default OnboardingNavigator;