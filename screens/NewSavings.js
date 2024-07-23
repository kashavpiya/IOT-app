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
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import CircularProgress, {
    CircularProgressWithChild,
  } from 'react-native-circular-progress-indicator';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import * as Progress from 'react-native-progress';
const NewSavings = () => {
  const { getSavings, getNewSavings } = useContext(DeviceContext);
  const [averageTime, setAverageTime] = useState(0);
  const [showers, setShowers] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [minutesProgress, setMinutesProgress] = useState(0);

  useEffect(() => {
    const checkSavings = async () => {
      try {
        const response = await getNewSavings();
        console.log(response);

        if (response) {
          const totalTime = response.totalTime;
          const totalCycles = response.totalCycles;
          
          setTotalSeconds(totalTime);
          setShowers(totalCycles);

          const avgTime = calculateAverageTime(totalCycles, totalTime);
          setAverageTime(avgTime);

          setMinutesProgress((totalSeconds / 60) / (showers * 8));
        }
      } catch (error) {
        console.error("Error checking savings:", error);
      }
    };

    checkSavings();
  }, [getNewSavings]);

  const calculateAverageTime = React.useMemo(() => (cycles, totalTime) => {
    if (cycles === 0) {
      return 0;
    }

    const averageTimeSec = totalTime / cycles;
    const averageTimeMin = averageTimeSec / 60;

    return parseFloat(averageTimeMin.toFixed(1));
  }, []);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.topContainer}>
        <Text style={styles.headText}>SHOWERS TAKEN</Text>
        <View style={{ paddingTop: height(2) }}>
          <CircularProgress
            value={showers}
            radius={120}
            duration={0}
            progressValueColor={'white'}
            progressValueStyle={{ fontSize: 64 }}
            activeStrokeColor={'#3DEE00'}
            maxValue={showers}
            title={'TOTAL SHOWERS'}
            titleColor={'white'}
            titleStyle={{ fontSize: 17 }}
            delay={0}
            initialValue={showers}
            startInPausedState
            activeStrokeWidth={22}
            inActiveStrokeColor={'#3DEE00'}
            inActiveStrokeWidth={20}
          />
        </View>
      </View>

      <View style={styles.pretext}>
        <MaterialCommunityIcons name="shower-head" size={22} color={'white'} />
        <Text style={styles.headText}> TOTAL SHOWERS</Text>
      </View>
      <Text style={styles.subText}>Total showers taken is based on all showers registered with this device and not by user.</Text>

      <View style={styles.bottomContainer}>
        <Text style={[styles.headText, { paddingTop: height(2) }]}>TIME</Text>
        <Text style={[styles.headText, { paddingTop: height(2), paddingBottom: height(1) }]}>TOTAL TIME IN SHOWER</Text>

        <Text style={styles.number}>{Math.floor(totalSeconds / 60)} <Text style={styles.numberText}>minutes</Text></Text>

        <Progress.Bar
          progress={0.5}
          width={width(80)}
          color={'#3DEE00'}
          borderWidth={0}
          unfilledColor='white'
          height={10}
        />

        <Text style={[styles.headText, { paddingTop: height(9), paddingBottom: height(1) }]}>AVERAGE SHOWER</Text>

        <View style={styles.averageTime}>
          <Text style={styles.number}>{averageTime} <Text style={styles.numberText}>minutes</Text></Text>
        </View>

        <Text style={[styles.headText, { paddingTop: height(9), paddingBottom: height(1) }]}>SAVING GOAL</Text>
        <View style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: 112, left: 82 }}>
            <Text style={[styles.headText2, { paddingTop: height(5), fontWeight: 'normal' }]}>MINUTE</Text>
            <Text style={[styles.headText2, { fontWeight: 'normal' }]}>SHOWERS</Text>
          </View>
          <View style={{ transform: [{ rotate: '-90deg' }] }}>
            <CircularProgress
              value={8}
              maxValue={16}
              radius={120}
              inActiveStrokeOpacity={0}
              activeStrokeWidth={15}
              inActiveStrokeWidth={20}
              progressValueStyle={{ fontWeight: '100', color: 'white', transform: [{ rotate: '90deg' }] }}
              activeStrokeSecondaryColor="yellow"
              inActiveStrokeColor="black"
              duration={2000}
              dashedStrokeConfig={{
                count: 60,
                width: 4,
              }}
              delay={1000}
            />
          </View>
        </View>
      </View>
      <View style={styles.pretext}>
        <MaterialCommunityIcons name="shower-head" size={22} color={'white'} />
        <Text style={styles.headText}> TIME GOAL</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
        </View>
      </View>
      <Text style={styles.subText}>Goal for water savings is under 8 minutes, which is the United States national average. If you shower time is over 8 min, then you will not have water savings.</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  headText2: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: height(4),
    paddingHorizontal: width(3),
  },
  pretext: {
    flexDirection: 'row',
    paddingHorizontal: width(3),
  },
  subText: {
    fontSize: RFValue(12),
    fontFamily: 'SofiaSans_400Regular',
    color: '#636765',
    paddingBottom: height(2),
    paddingHorizontal: width(3),
  },
  bottomContainer: {
    alignItems: 'center',
    paddingTop: height(4),
  },
  number: {
    fontSize: 64,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  numberText: {
    fontSize: 37,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  averageTime: {
    borderWidth: 10,
    borderColor: '#3DEE00',
    width: width(80),
    borderRadius: 40,
    alignItems: 'center',
  },
  absoluteText: {
    position: 'absolute',

  }
});

export default NewSavings;