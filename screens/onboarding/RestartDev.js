import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import showerhead from '../../assets/psHeadRestart.png';
import ActionButton from '../../components/ActionButton';
import batteryInOut from '../../assets/batteryInOut.png';

const RestartDev = ({ navigation, route }) => {
  const { id, pin } = route.params || '';

  console.log(id);
  console.log(pin);
  
  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title='Restart the Device' />
        <Appbar.Action
          icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        />
      </Appbar.Header>
      <ProgressBar progress={7/8} color={ELECTRIC_BLUE} />
      <View style={styles.content}>
        <Image source={batteryInOut} style={styles.image} /> 
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            1. Take the battery out of the compartment.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            2. Wait 15 seconds.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            3. Place the battery back into the battery compartment.
          </Text>
        </View>
        {/* <View style={styles.textContainer}>
          <Text style={styles.subText}>
            Enter 'password' as the password.
          </Text>
        </View> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding', { screen: 'FinalStep'})}
          style={{ marginTop: height(5), marginBottom: height(10) }}
        >
          <ActionButton iconName='' text='Next' />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center'
  },
  image: {
    marginTop: height(10)
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    width: width(75),
    fontWeight: 'bold',
    marginTop: height(5),
    fontSize: 18,
  },
  subText: {
    width: width(75),
    marginTop: height(2),
    fontSize: 18,
  },
  button: {
    backgroundColor: ELECTRIC_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  },
  chip: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BABABA',
    borderRadius: 10,
    padding: 3,
    marginHorizontal: 15
  }
});

export default RestartDev;
