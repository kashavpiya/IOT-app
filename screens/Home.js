import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { ELECTRIC_BLUE } from '../shared/Constant';
import ActionButton from '../components/ActionButton';
import { DeviceContext } from '../states/device/DeviceContext';
import SavingsDisplay from './SavingsDisplay';
import TotalSavings from './TotalSavings';
import NewSavings from './NewSavings';
import StatsSaving from './StatsSaving';
import HistorySaving from './HistoryStats';
import DeviceProvider from '../states/device/DeviceProvider';
import { width, height } from 'react-native-dimension';
import TopNavBar from '../components/TopNavBar';
import DeviceList from './devices/components/DeviceList';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

const Home = ({ navigation, route }) => {
  const { message } = route.params || {};
  const [visible, setVisible] = useState(true);
  const { devices, getStatus } = useContext(DeviceContext);
  const [selectedItem, setSelectedItem] = useState('stats');

  const isItemSelected = (item) => selectedItem === item;

  useEffect(() => {
    requestNotificationPermissions();
    Notifications.addNotificationReceivedListener(handleNotification);
    configureBackgroundFetch();
  }, []);

  const requestNotificationPermissions = async () => {
    try {
      const existingStatus = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus.status;

      if (existingStatus.status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Notification permissions not granted');
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  const handleNotification = (notification) => {
    try {
      console.log(notification);
    } catch (error) {
      console.error('Error handling notification:', error);
    }
  };

  const configureBackgroundFetch = async () => {
    try {
      const status = await BackgroundFetch.getStatusAsync();
      if (status === BackgroundFetch.BackgroundFetchStatus.Restricted || status === BackgroundFetch.BackgroundFetchStatus.Denied) {
        console.log('Background fetch is restricted or denied');
        return;
      }

      TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        try {
          for (const device of devices) {
            const status = await getStatus(device.id);
            if (status.payload.status === '3') {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Notification',
                  body: `Device ${device.name} is ready!`,
                },
                trigger: null,
              });
            }
            if (status.payload.batt < 15) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Notification',
                  body: `Battery low for ${device.name}`,
                },
                trigger: null,
              });
            }
          }
          return BackgroundFetch.Result.NewData;
        } catch (error) {
          console.error('Background fetch failed:', error);
          return BackgroundFetch.Result.Failed;
        }
      });

      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 10,
        stopOnTerminate: false,
        startOnBoot: true,
      });

      console.log('Background fetch registered');
    } catch (error) {
      console.error('Error configuring background fetch:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TopNavBar />
        {Object.keys(devices).length === 0 ? (
          <View style={styles.savingsDisplay}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding', { screen: 'OnboardStart' })}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Set Up Power Shower</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.savingsDisplay}>
              <View style={styles.titleContainer}>
                {[
                  { item: 'stats', label: 'STATISTICS' },
                  { item: 'savings', label: 'SAVINGS' },
                  { item: 'history', label: 'HISTORY' },
                ].map(({ item, label }) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.title,
                      isItemSelected(item) && styles.selectedTitle,
                    ]}
                    onPress={() => setSelectedItem(item)}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        isItemSelected(item) && styles.selectedTitleText,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedItem === 'stats' && <NewSavings />}
              {selectedItem === 'savings' && <StatsSaving />}
              {selectedItem === 'history' && <HistorySaving />}
            </View>
          </>
        )}
        {message && (
          <Snackbar visible={visible} onDismiss={() => setVisible(!visible)} duration={5000}>
            {message}
          </Snackbar>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  savingsDisplay: {
    alignItems: 'center',
  },
  deviceList: {
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  powershowerText: {
    color: '#8E8E8F',
    fontSize: RFValue(12),
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: height(1),
    marginBottom: height(2),
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: width(3),
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    width: '27%',
    alignItems: 'center',
    fontFamily: 'SofiaSans_400Regular',
    backgroundColor: '#434343',
  },
  titleText: {
    fontSize: 11,
    color: 'white',
  },
  selectedTitle: {
    backgroundColor: ELECTRIC_BLUE,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
  },
  button: {
    marginTop: heightPercentageToDP(20),
    backgroundColor: ELECTRIC_BLUE,
    paddingHorizontal: width(10),
    paddingVertical: height(2),
    borderRadius: 25,
  },
});

export default Home;