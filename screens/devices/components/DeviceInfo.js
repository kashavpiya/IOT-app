import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { DeviceContext } from '../../states/device/DeviceContext';


const DeviceInfo = () => {
    
    
  
    return (
      <View style={styles.container}>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
      },
  });
  
  export default DeviceInfo;