import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Appbar, ProgressBar, TextInput, Snackbar, Divider} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import { DeviceContext } from '../../states/device/DeviceContext';
import logo from '../../assets/mainlogo.png';
import img1 from '../../assets/sh1.png';
import img2 from '../../assets/sh2.png';
import img3 from '../../assets/sh3.png';
import img4 from '../../assets/sh4.png';
import img5 from '../../assets/sh5.png';
import img6 from '../../assets/sh6.png';
import topImg from '../../assets/ps27.png';

const Installation = ({ navigation }) => {

  const [visible, setVisible] = useState('');
  const [message, setMessage] = useState('');

  const openURL = () => {
    Linking.openURL(
      'https://www.youtube.com/watch?v=ZWcIoWgC1V8'
    );
  };

  return (
      <ScrollView style={styles.container}>
            <Appbar.Header>
            <Appbar.Action
                icon={() => <MaterialCommunityIcons name='chevron-left' color='black' size={24} />}
                onPress={() => navigation.goBack()}
            />
            <Appbar.Content title='INSTALL SHOWER HEAD' />
            <Appbar.Action
                icon={() => <MaterialCommunityIcons name='close' color='black' size={24} />}
                onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
            />
            </Appbar.Header>
        <ProgressBar progress={1} color={ELECTRIC_BLUE} />

        <View>
            <Image source={topImg} style={styles.TopImage} />
        </View> 
        

        <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.gradientButton} onPress={openURL}>    
                <Text style={styles.buttonText}>Video</Text>
            </TouchableOpacity> 
        </View>   
        
        <View style={styles.content}>
            <Text style={styles.header}>Installation Directions</Text>
            <Divider style={{width: width(80), color: '#b2b2b2', height: 1, marginBottom: height(1) }}/>
            <Text style={styles.subText}>Tools Needed - Adjustable Wrench</Text>
            <Text style={styles.subText}>Included - Plumbers Tape</Text>
        </View>

        

        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img1} style={styles.image} />
                    <Text style={styles.cardtext}>1. Remove the current Shower Head by rotating the shower head adapter counterclockwise with a wrench.</Text>       
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img2} style={styles.image} />
                    <Text style={styles.cardtext}>2. Apply plumber's tape counterclockwise on the threads of shower head arm.</Text>
            </View>
        </View>
        
        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img5} style={styles.image} />
                    <Text style={styles.cardtext}>3. Slide the battery out of the Power Shower head located on the side of the shower head before installation.</Text>         
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img3} style={styles.image} />
                    <Text style={styles.cardtext}>4. Install the Power Shower to the shower arm by rotating it clockwise.</Text>
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img6} style={styles.image} />
                    <Text style={styles.cardtext}>5. Reinstall the battery in the Power Shower. </Text>         
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.cardView}>
                    <Image source={img4} style={styles.image} />
                    <Text style={styles.cardtext}>6. The status light will blink green.</Text>         
            </View>
        </View>


        <View style={{alignItems: 'center', marginBottom: height(10)}}>
            <TouchableOpacity style={styles.gradientButton}  onPress={() => navigation.navigate('Onboarding', { screen: 'QuickStart' })}>    
                <Text style={styles.buttonText}>Quick Start</Text>
            </TouchableOpacity> 
        </View>  

      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
      },
      navContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height(8),
        marginHorizontal: width(8),
      },
      centerContainer: {
        flex: 1,
        alignItems: 'center',
      },
      content:{
        width: width(80),
        marginHorizontal: width(10),
        marginTop: height(5),
      },
      image: {
        resizeMode: 'contain',
        height: 100,
        width: 100,
        marginBottom: height(2),
      },
      TopImage: {
        resizeMode: 'contain',
        height: height(24),
        width: width(92),
        marginTop: height(5),
        marginHorizontal: width(4),
      },
      header:{
        fontSize: 20,
        fontFamily: 'SofiaSans_400Regular',
        color: 'black',
        fontWeight: 'bold',
      },
      subText:{
        fontSize: 15,
        fontFamily: 'SofiaSans_400Regular',
        lineHeight: 26,
      },
      cardtext: {
        fontSize: 16,
        fontFamily: 'SofiaSans_400Regular',
        color: 'black',
        lineHeight: 28,
      },
      cardSubText: {
        fontSize: 16,
        fontFamily: 'SofiaSans_400Regular',
        color: '#9f9fa0',
        
      },
      cardView: {
        paddingVertical: height(3),
        paddingHorizontal: width(10),
        alignItems: 'center',
      },
      card: {
        backgroundColor: '#d9d9d9',
        width: width(80),
        marginHorizontal: width(10),
        marginBottom: height(2),
        marginTop: height(2),
        borderRadius: 20,
      },
      cardTitleText: {
        color: '#555555',
        fontFamily: 'SofiaSans_400Regular',
        fontSize: 21,
        paddingBottom: height(2),
        fontWeight: 'bold',
      },
      gradientButton: {
        marginTop: height(3),
        backgroundColor: ELECTRIC_BLUE,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 6,
        width: width(80),
      },
      buttonText: {
        fontFamily: 'SofiaSans_400Regular',
        textDecorationLine: 'none',
        color: 'white',
        fontSize: 18,
        paddingVertical: height(1),
      },
});

export default Installation;
