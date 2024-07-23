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

const TotalSavings = () => {
  const { getSavings } = useContext(DeviceContext);
  const [averageTime, setAverageTime] = useState(0);
  const [ showers, setShowers ] = useState(0);
  const [ totalSeconds, setTotalSeconds ] = useState(0);

  useEffect(() => {
    const checkSavings = async () => {
      try {
        const response = await getSavings();
        console.log(response);

        if (response) {
            const totalTime = (response.totalTime);
            const totalCycles = (response.totalCycles);
            
            setTotalSeconds(totalTime);
            setShowers(totalCycles);

            const avgTime = calculateAverageTime(totalCycles, totalTime);
            setAverageTime(avgTime);
          }
      } catch (error) {
        console.error("Error checking savings:", error);
      }
    };
  
    checkSavings();
  }, [getSavings]);

  const calculateAverageTime = React.useMemo(() => (cycles, totalTime) => {
    if (cycles === 0) {
      return { minutes: 0, seconds: 0 };
    }
  
    const averageTimeSec = totalTime / cycles;
    const totalMinutes = averageTimeSec / 60;
    const roundedMinutes = Math.round(totalMinutes);
    const roundedSeconds = Math.round((totalMinutes - roundedMinutes) * 60);

    const minutes = roundedSeconds === 60 ? roundedMinutes + 1 : roundedMinutes;
    const seconds = roundedSeconds === 60 ? 0 : roundedSeconds;
  
    return { minutes, seconds };
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>STATISTICS</Text>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='shower-head' size={50} color='white' />
        </View>
        <View>
          <Text style={styles.title}>Total Showers</Text>
          <Text style={styles.number}>{showers}</Text>
          <Text style={styles.detail}>Total number of showers taken with Power Shower. </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='timer' size={50} color='white' />
        </View>
        <View>
          <Text style={styles.title}>Total Shower Time</Text>
          <Text style={styles.number}>{Math.floor(totalSeconds/60)} minutes</Text>
          <Text style={styles.detail}>Total amount of time spent in the shower.</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name='chart-timeline-variant' size={50} color='white' />
        </View>
        <View>
        <Text style={styles.title}>Average Shower Time</Text>
        <Text style={styles.number}>
          {showers === 0
              ? "0 minutes"
              : `${averageTime.minutes} minute${averageTime.minutes === 1 ? '' : 's'}`}
        </Text>
        <Text style={styles.detail}>Average amount of time spent in the shower.</Text>
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
    justifyContent: 'space-between',
    marginBottom: height(3)
  },
  title: {
    fontSize: 10,
    color: 'white' 
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(5)
  },
  number: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
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

export default TotalSavings;





  