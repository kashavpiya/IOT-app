import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Divider } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import demo1 from '../../../assets/guideline1.jpg';
import { ELECTRIC_BLUE } from '../../../shared/Constant';

const GuidelineStep1 = ({ nextStep, setVisible }) => {

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={demo1} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.instruction}>1. Make sure your Showerhead is turned on.</Text>
        <Text style={styles.instruction}>2. Make sure you scanned the QR Code for the correct credentials.</Text>
        <Text style={styles.instruction}>3. Wait for the app to connect to the Showerhead. You may need to retry several times.</Text>
      </View>
      <Divider />
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.skipBtn} onPress={() => setVisible(false)}>
          <Text style={{ color: ELECTRIC_BLUE }}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
          <Text style={{ color: 'white' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'left',
    marginBottom: height(2)
  },
  instruction: {
    fontSize: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: height(80),
    width: width(60),
    marginVertical: -height(26),
    borderRadius: 15,
    borderColor: 'black'
  },
  nextBtn: {
    backgroundColor: ELECTRIC_BLUE,
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10
  },
  btnWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: height(2)
  },
  skipBtn: {
    backgroundColor: '#E2E2E2',
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: width(2)
  }
});

export default GuidelineStep1;
