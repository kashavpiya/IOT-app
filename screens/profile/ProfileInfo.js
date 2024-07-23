import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { width, height } from 'react-native-dimension';
import { Divider, Portal, Snackbar, Dialog } from 'react-native-paper';
import { AuthContext } from '../../states/auth/AuthContext';
import logo from '../../assets/logoformobile.png';
import ChangeEmailDialog from './ChangeEmailDialog';
import ChangeUsernameDialog from './ChangeUsernameDialog';
import LogOutDialog from './LogOutDialog';
import TopNavBar from '../../components/TopNavBar';
import { ELECTRIC_BLUE } from '../../shared/Constant';

const ProfileInfo = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { state } = useContext(AuthContext);
  const { username, email } = state.user;
  console.log(state.user);
  const [openDialogUsername, setOpenDialogUsername] = useState(false);
  const [openDialogEmail, setOpenDialogEmail] = useState(false);


  useEffect(() => {
    console.log(username);
    console.log(state.user.email);
    console.log(email);
  }, [state.user]);

  const [logOutVisible, setLogOutVisible] = useState(false);
  const logOut = () => {
    logout();
    navigation.navigate('SignIn');
  }
  const handlePress = () => {
    setLogOutVisible(true)
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <MaterialCommunityIcons
          name='chevron-left'
          color={'white'}
          size={24}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
            <Image source={logo} style={styles.image} />
          </View>
      </View>
      <Text style={styles.heading}>Hello {username}</Text>
      
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setOpenDialogUsername(true)}
        >
          <View>
            <Text style={styles.title}>User Name</Text>
            <Text style={styles.content}>{username}</Text>
          </View>
          <MaterialCommunityIcons name='pencil' size={24} color='#8E8E8F' />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setOpenDialogEmail(true)}
        >
          <View>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.content}>{email}</Text>
          </View>
          <MaterialCommunityIcons name='pencil' size={24} color='#8E8E8F' />
        </TouchableOpacity>
        <Divider />
      </View>

      <Portal>
        <ChangeUsernameDialog
          visible={openDialogUsername}
          setVisible={setOpenDialogUsername}
          currentName={username}
        />
        <ChangeEmailDialog
          visible={openDialogEmail}
          setVisible={setOpenDialogEmail}
          currentEmail={email}
        />
        <LogOutDialog 
          visible={logOutVisible} 
          setVisible={setLogOutVisible} 
          logout={logOut} />
      </Portal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height(8),
    marginHorizontal: width(8)
  },
  heading: {
    marginTop: height(5),
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: height(15),
    width: width(40),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height(1)
  },
  listContainer: {
    padding: 30
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: height(1),
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
  },
  content: {
    fontSize: 14,
    fontFamily: 'SofiaSans_400Regular',
    color:'#8E8E8F',
  },
  logoutBtn: {
    color: ELECTRIC_BLUE,
    textDecorationLine: 'underline'
  },
});

export default ProfileInfo;