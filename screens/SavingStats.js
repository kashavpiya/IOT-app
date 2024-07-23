import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { width, height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../shared/Constant';
import { DeviceContext } from '../states/device/DeviceContext';

const SavingStats = () => {
    const { getSavings } = useContext(DeviceContext);
    const [carbonSaving, setCarbonSaving] = useState(0);
    const [waterSaving, setWaterSaving] = useState(0);
    const [electricSaving, setElectricSaving] = useState(0);
  

  
  useEffect(() => {
    const checkSavings = async () => {
      try {
        const response = await getSavings();

        if (response) {
            const carbonSaving = (response.co2Saved * -1).toFixed(2);
            
            const waterSaving = (response.waterSaved * -1).toFixed(2);

            const electricSaving = (response.electricitySaved * -1).toFixed(2);
          

            console.log(carbonSaving);
            console.log(waterSaving);
            console.log(electricSaving);
            setCarbonSaving(parseFloat(carbonSaving));
            setWaterSaving(parseFloat(waterSaving));
            setElectricSaving(parseFloat(electricSaving));
          }
      } catch (error) {
        console.error("Error checking savings:", error);
      }
    };
  
    checkSavings();
  }, [getSavings]);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SAVINGS</Text>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='water' size={50} color='white' />
        </View>
        <View>
          <Text style={styles.title}>Total Water Savings</Text>
          <Text style={styles.number}>{waterSaving} gals</Text>
          {/* <Text style={styles.detail}>80 gals of water can fill a standard bathtub.</Text> */}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='lightning-bolt' size={50} color='white' />
        </View>
        <View>
          <Text style={styles.title}>Total Energy Savings</Text>
          <Text style={styles.number}>{electricSaving} kWh</Text>
          {/* <Text style={styles.detail}>40 kWh can power a very large 5+ bedroom home for a day.</Text> */}
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='waves' size={50} color='white' />
        </View>
        <View>
          <Text style={styles.title}>Total Emissions Savings</Text>
          <Text style={styles.number}>{carbonSaving} lbs</Text>
          {/* <Text style={styles.detail}>100 lbs of coal saved from your household is the weight of a average punching bag.</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: ELECTRIC_BLUE,
    borderRadius: 20,
    padding: 20,
    marginBottom: height(3)
  },
  title: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center' 
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(5)
  },
  number: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  detail: {
    width: width(60),
    color: 'white',
  },
  heading: {
    fontSize: 12,
    textAlign: 'center',
    color: '#8E8E8F',
    marginBottom: height(1)
  }
});

export default SavingStats;
