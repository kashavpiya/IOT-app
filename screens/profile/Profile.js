import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';
import { AuthContext } from '../../states/auth/AuthContext';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import logo from '../../assets/logoformobile.png';
import ProfileItem from './ProfileItem';
import DeleteAccountDialog from './DeleteAccountDialog';
import LogOutDialog from './LogOutDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import TopNavBar from '../../components/TopNavBar';
import { DeviceContext } from '../../states/device/DeviceContext';
import { scheduleNotificationAsync } from 'expo-notifications';

const ProfileScreen = ({ route, navigation }) => {
  const { logout, sendVerification } = useContext(AuthContext);
  const { deleteUser } = useContext(DeviceContext);
  const [dltAccVisible, setDltAccVisible] = useState(false);
  const [logOutVisible, setLogOutVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { state } = useContext(AuthContext);
  const { username, id } = state.user;

  const logOut = () => {
    logout();
    navigation.navigate('SignIn');
  };

  const deleteAcc = async () => {
    console.log(id);
    const resp = await deleteUser(id); // Ensure deleteUser is awaited if it returns a promise
    console.log(resp);
    setDltAccVisible(false);
    setPasswordVisible(false);
    setLogOutVisible(false);

    await scheduleNotificationAsync({
      content: {
        title: 'Account Deleted!',
        body: `Your Power Shower Account has been deleted.`,
      },
      trigger: null, // Send immediately
    });

    logout();
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    // Example of using useEffect for navigation effect after state change
    if (dltAccVisible) {
      navigation.navigate('DeleteAccount'); // Example navigation after state change
    }
  }, [dltAccVisible, navigation]);

  const handlePress = () => {
    setLogOutVisible(true);
  };

  const openBuyPS = () => {
    Linking.openURL('https://www.powershower.app/collections/all');
  };

  const openSupport = () => {
    Linking.openURL('https://www.powershower.app/pages/contact');
  };

  const openFAQ = () => {
    Linking.openURL('https://www.powershower.app/pages/faq');
  };

  return (
    <ScrollView style={styles.container}>
      <TopNavBar />
      <View style={styles.listContainer}>
        <Text style={styles.title}>Profile</Text>
        <ProfileItem
          item='Account'
          action={() => navigation.navigate('ProfileInfo', { screen: 'ProfileInfo' })}
        />
        <ProfileItem item='Change Password' action={() => {
          sendVerification(username);
          setPasswordVisible(true);
        }} />
        <ProfileItem item='Delete Account' action={() => setDltAccVisible(true)} />
        <ProfileItem item='Log Out' action={handlePress} />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>More</Text>
        <ProfileItem item='Smart Home Setup' action={() => navigation.navigate('SmartHome', { screen: 'SmartHome' })} />
        <ProfileItem item='Buy Power Shower' action={openBuyPS} />
        <ProfileItem item='FAQ' action={openFAQ} />
        <ProfileItem item='Support' action={openSupport} />
      </View>

      <ChangePasswordDialog visible={passwordVisible} setVisible={setPasswordVisible} />
      <DeleteAccountDialog visible={dltAccVisible} setVisible={setDltAccVisible} deleteAcc={deleteAcc} />
      <LogOutDialog visible={logOutVisible} setVisible={setLogOutVisible} logout={logOut} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  listContainer: {
    padding: 30,
    marginBottom: height(2),
  },
  title: {
    fontSize: 16,
    color: '#8e8e8e',
    marginBottom: 10,
    fontFamily: 'SofiaSans_400Regular',
    textDecorationColor: '#8e8e8e',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

export default ProfileScreen;