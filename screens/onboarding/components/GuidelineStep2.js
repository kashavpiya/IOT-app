import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import demo2 from '../../../assets/guideline2.jpg';
import { ELECTRIC_BLUE } from '../../../shared/Constant';

const GuidelineStep2 = ({ setVisible, goBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={demo2} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.instruction}>
          1. Once the popup window pulls up, click "Configure Wifi"
        </Text>
        <Text style={styles.instruction}>
          2. Select your local wifi and type in its credential.
        </Text>
        <Text style={styles.instruction}>
          2. Select your local wifi and type in its credential.
        </Text>
      </View>
      <Divider />
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.skipBtn} onPress={goBack}>
          <Text style={{ color: ELECTRIC_BLUE }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={() => setVisible(false)}>
          <Text style={{ color: 'white' }}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {

  },
  content: {
    alignItems: 'left',
    marginBottom: height(2)
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: height(95),
    width: width(35),
    marginVertical: -height(33),
    borderRadius: 15,
    borderColor: 'black'
  },
  instruction: {
    fontSize: 15,
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
})

export default GuidelineStep2;
