import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';
import { DeviceContext } from '../../states/device/DeviceContext';

const TapInformation = ({ navigation, route }) => {
  
  const handleVideoGuidePress = () => {
    Linking.openURL('https://www.youtube.com/shorts/C8jBNIAVCA0');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.navContainer}>
          <MaterialCommunityIcons
            name='chevron-left'
            color={'white'}
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.header}>Tap Control</Text>
        </View>

        <View style={styles.bodyTop}>
          <Text style={styles.bodyTopText}>Power Shower has two easy access tap controls located on the top of your shower head.</Text>
        </View>

        <View style={styles.imageContainer}>
          {/* Image goes here */}
        </View>

        <View style={styles.tapInfo}>
          <Text style={styles.bodyHead}>First Tap</Text>
          <Text style={styles.bodyText}>Begins Pre heat</Text>
          <Text style={styles.bodyText}>Shower starts releasing cold water</Text>
          <Text style={styles.bodyText}>Water stops when warm</Text>
        </View>

        <View style={styles.tapInfo}>
          <Text style={styles.bodyHead}>Tap Again</Text>
          <Text style={styles.bodyText}>Water On</Text>
        </View>

        <View style={styles.tapInfo}>
          <Text style={styles.bodyHead}>Tap Again</Text>
          <Text style={styles.bodyText}>Water Off</Text>
        </View>

        <TouchableOpacity onPress={handleVideoGuidePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Video Guide</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  navContainer: {
    flexDirection: 'row',
    marginTop: height(10),
    alignItems: 'center',
    marginLeft: width(3)
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: width(34),
    color: 'white',
  },
  bodyTop: {
    width: width(90),
    marginHorizontal: width(5),
    marginVertical: height(5),
  },
  bodyTopText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 16,
  },
  tapInfo: {
    width: width(90),
    marginHorizontal: width(5),
    marginVertical: height(2),
  },
  bodyHead: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 20,
  },
  bodyText: {
    color: 'grey',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 16,
  },
  button: {
    marginHorizontal: width(5),
    width: width(90),
    textAlign: 'center',
    backgroundColor: '#3C54F2',
    paddingVertical: height(2),
    borderRadius: 15,
    marginVertical: height(2),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default TapInformation;
