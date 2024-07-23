import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
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
  const { message } = route.params;
  const [visible, setVisible] = useState(true);
  const { devices, getStatus } = useContext(DeviceContext);
  const [selectedItem, setSelectedItem] = useState('stats');

  const isItemSelected = (item) => selectedItem === item;

  useEffect(() => {
    // Request permission for push notifications
    requestNotificationPermissions();

    // Handle incoming notifications
    Notifications.addNotificationReceivedListener(handleNotification);

    // Configure background fetch
    configureBackgroundFetch();
  }, []);

  const requestNotificationPermissions = async () => {
    if (Platform.OS === 'android') {
      // Create a notification channel
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permissions not granted');
    }
  };

  const handleNotification = (notification) => {
    try {
      // Handle the received notification
      console.log(notification);
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  const configureBackgroundFetch = async () => {
    try {
      const status = await BackgroundFetch.getStatusAsync();
      if (status === BackgroundFetch.BackgroundFetchStatus.Restricted || status === BackgroundFetch.BackgroundFetchStatus.Denied) {
        console.log('Background fetch is restricted or denied');
        return;
      }

      // Define the task
      TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
        try {
          // Fetch devices and their status
          for (const device of devices) {
            const status = await getStatus(device.id);
            if (status.payload.status === '3') {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Notification",
                  body: `Device ${device.name} is ready!`,
                },
                trigger: null, // Immediate notification
              });
            }
            if (status.payload.batt < 15) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Notification",
                  body: `Battery low for ${device.name}`,
                },
                trigger: null, // Immediate notification
              });
            }
          }
          return BackgroundFetch.Result.NewData;
        } catch (error) {
          console.error("Background fetch failed:", error);
          return BackgroundFetch.Result.Failed;
        }
      });

      // Register the task
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 10, // 10 seconds, but the system may throttle it
        stopOnTerminate: false, // Continue after app is killed
        startOnBoot: true, // Start after device reboot
      });

      console.log('Background fetch registered');
    } catch (error) {
      console.error("Error configuring background fetch:", error);
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
