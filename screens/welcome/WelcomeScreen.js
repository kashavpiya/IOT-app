import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { height, width } from "react-native-dimension";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useLinkTo } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { stopLocationUpdatesAsync } from 'expo-location';

const WelcomeScreen = ({ mainText, subText, bgColor, textColor, bg, final }) => {
  const [btnVisible, setBtnVisible] = useState(false);
  const animationRef = useRef(null);
  const linkTo = useLinkTo();

  useEffect(() => {
    if (final) {
      animationRef.current?.play();
      setTimeout(() => {
        setBtnVisible(true);
      }, 2000);
    }
  }, []);

  /* return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={bg} style={styles.image}/>
      </View>
      <View style={{ backgroundColor: bgColor, height: height(35)}}/>
      <View style={styles.textContainer}>
        <Text style={[styles.mainText, { color: textColor, fontSize: RFValue(40) }]}>{mainText}</Text>
        <Text style={[styles.subText, { color: textColor, fontSize: RFValue(26), width: width(60) }]}>{subText}</Text>
        {btnVisible &&
          <Animatable.View animation='slideInLeft'>
            <TouchableOpacity onPress={() => linkTo('/SignIn')} style={styles.btnContainer}>
              <MaterialCommunityIcons
                name='arrow-right-circle'
                size={40}
                color='white'
                style={{ textAlign: 'right' }}
              />
            </TouchableOpacity>
          </Animatable.View>
        }
      </View>
    </View>
  )
};

const  styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: width(100),
    resizeMode: 'cover',
    justifyContent: 'center',
    alignSelf:'center',
  },
  textContainer: {
    padding: 30,
    position: 'absolute',
    zIndex: 1,
    top: height(70),
    width: '100%'
  },
  mainText: {
    fontWeight: 'bold',
  },
  subText: {
    
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',   
  },
}); */
   return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={bg} style={styles.image} />
        <View style={{ backgroundColor: bgColor, height: height(40) }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.mainText, { color: textColor, fontSize: RFValue(36) }]}>{mainText}</Text>
        <Text style={[styles.subText, { color: textColor, fontSize: RFValue(22), width: width(60) }]}>{subText}</Text>
        {btnVisible &&
          <Animatable.View animation='slideInLeft'>
            <TouchableOpacity onPress={() => linkTo('/SignIn')} style={styles.btnContainer}>
              <MaterialCommunityIcons
                name='arrow-right-circle'
                size={40}
                color='white'
                style={{ textAlign: 'right' }}
              />
            </TouchableOpacity>
          </Animatable.View>
        }
      </View>
    </View>
  ) 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 30,
    position: 'absolute',
    zIndex: 1,
    top: height(60),
    width: '100%'
  },
  mainText: {
    fontWeight: 'bold',
  },
  subText: {
    
  },
  background: {
    flex: 1,
    width: '100%',
    resizeMode: 'center',   
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 

export default WelcomeScreen;
