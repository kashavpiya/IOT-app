import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import logo from '../../assets/logoformobile.png';
import { LinearGradient } from 'expo-linear-gradient';

const SmartHome = ({ route, navigation }) => {
    const { screen, data } = route.params;
    
  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.title}>
        <Text style={styles.titleText}>Amazon Alexa Setup</Text>
        <Text style={styles.cardtext}>Power Shower offers Amazon Alexa voice commands and responses.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardView}>
          <Text style={styles.cardTitleText}>Directions</Text>
          <Text style={styles.cardtext1}>1. Download the Alexa App</Text>
          <Text style={styles.cardtext1}>2. Set up account by logging into your Amazon account</Text>
          <Text style={styles.cardtext1}>3. Search Alexa Skills in the Alexa app. {"\n"} More{" > "} Skills and Games{" > "} Search{" > "} Power Shower</Text>
          <Text style={styles.cardtext1}>4. Enable Power Shower Skills</Text>
          <Text style={styles.cardtext1}>5. Login to the Power Shower account from the interface that Alexa redirects you to.</Text>
          <Text style={styles.cardtext1}>6. Verify Power Shower head is connected by navigating to devices and scrolling down until you find your shower head</Text>
          <Text style={styles.cardtext1}>7. Wake up Power Shower by tapping touch bar. {"\n"}{"\("}Water should flow.{"\)"}</Text>
          <Text style={styles.cardtext1}>8. Say, "Alexa set {"\{"}device name{"\}"} to off mode. {"\n"}{"\("}Water should stop flowing{"\)"}</Text>
          <Text style={styles.cardtext1}>Note: Commands can only be sent to the power shower when Power Shower has been onboarded and is awake. </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
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
  image: {
    resizeMode: 'contain',
    height: height(15),
    width: width(40),
  },
  cardtext: {
    width: width(75),
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    color: '#8e8e8e',
    lineHeight: 28,
  },
  cardView: {
    paddingVertical: height(3),
  },
  card: {
    width: width(90),
    marginHorizontal: width(5),
    marginBottom: height(5),
    marginTop: height(2),
    borderRadius: 20,
  },
  cardTitleText: {
    color: '#8e8e8e',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 18,
    paddingBottom: height(2),
    textDecorationLine: 'underline',
  },
  cardtext1: {
    width: width(92),
    fontSize: 16,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    lineHeight: 28,
    paddingBottom: height(1),
  },
  title: {
    width: width(80),
    marginHorizontal: width(10),
    marginVertical: height(2),
  },
  titleText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: height(2),
  },
});

export default SmartHome;