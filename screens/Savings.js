import React, { useState, useContext, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { width, height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../shared/Constant';
import ActionButton from '../components/ActionButton';
import { DeviceContext } from '../states/device/DeviceContext';
import SavingsDisplay from './SavingsDisplay';
import TotalSavings from './TotalSavings';
import TopNavBar from '../components/TopNavBar';
import SavingStats from './SavingStats';

const Home = ({ navigation, route }) => {
  const { message } = route.params;
  const [visible, setVisible] = useState(true);
  const { devices } = useContext(DeviceContext);


  return (
    <View style={styles.container}>
      <ScrollView>
        <TopNavBar />
        {(Object.keys(devices).length === 0) ? 
          <View style={styles.savingsDisplay}>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding', { screen: 'IDInput' })} style={{ marginTop: 300 }}>
              <ActionButton iconName='plus' text='Add New Device' />
            </TouchableOpacity>
          </View>
          :
          <>
            {/* <View style={styles.savingsDisplay}>
              <SavingsDisplay />
            </View> */}
            <View style={styles.totalSavings}>
              <SavingStats /> 
              {/* <TotalSavings />*/}
            </View>
          </>
        }
        {message &&
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(!visible)}
            duration={5000}
          >
            {message}
          </Snackbar>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  button: {
    backgroundColor: ELECTRIC_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  savingsDisplay: {
    marginTop: height(2),
    alignItems: 'center',
  },
  totalSavings: {
    marginTop: height(2)
  }
});

export default Home;
