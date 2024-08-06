import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { width, height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../shared/Constant';
import { DeviceContext } from '../states/device/DeviceContext';
import { RFValue } from 'react-native-responsive-fontsize';
import CircularProgress from 'react-native-circular-progress-indicator';
import { LineChart } from 'react-native-chart-kit';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import * as Progress from 'react-native-progress';

const StatsSaving = () => {
  const { getNewSavings, getHistory } = useContext(DeviceContext);
  const [carbonSaving, setCarbonSaving] = useState(0);
  const [waterSaving, setWaterSaving] = useState(0);
  const [electricSaving, setElectricSaving] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyResponse = await getHistory();
        console.log('History response:', historyResponse);

        if (historyResponse && historyResponse.length > 0) {
          const slicedHistory = historyResponse.slice(-7);
          const formattedChartData = slicedHistory.map(item => {
            const showerTime = Math.ceil(item.payload.shower_time / 60); // Convert seconds to minutes
            const cycles = item.payload.cycles;
            let waterSaved = 0;
            if (cycles === 0) {
              waterSaved = 0;
            }
            else if (showerTime/cycles > 8){
              waterSaved = 0;
            }
            else if (showerTime > 0) {
              waterSaved = ((8 * cycles)  - showerTime) * 2.1;
            }
            return {
              date: new Date(item.sample_time).toLocaleDateString(),
              waterSaved,
            };
          });
          setChartData(formattedChartData);
        }
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [getHistory]);

  useEffect(() => {
    const checkSavings = async () => {
      try {
        const response = await getNewSavings();
        console.log('Savings response:', response);

        if (response) {
          const carbonSaving = (response.co2Saved).toFixed(0);
          const waterSaving = (response.waterSaved).toFixed(0);
          const electricSaving = (response.electricitySaved).toFixed(0);

          setCarbonSaving(parseFloat(carbonSaving));
          setWaterSaving(parseFloat(waterSaving));
          setElectricSaving(parseFloat(electricSaving));
        }
      } catch (error) {
        console.error("Error checking savings:", error);
      }
    };

    checkSavings();
  }, [getNewSavings]);

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <Text style={styles.headText}>TOTAL WATER SAVED</Text>
        <View style={{ paddingTop: height(2) }}>
          <CircularProgress
            value={waterSaving}
            radius={120}
            duration={0}
            progressValueColor={'white'}
            progressValueStyle={{ fontSize: 54 }}
            activeStrokeColor={'#EB3CF2'}
            maxValue={waterSaving}
            title={'GALONS SAVED'}
            titleColor={'white'}
            titleStyle={{ fontSize: 17 }}
            delay={0}
            initialValue={waterSaving}
            startInPausedState
            activeStrokeWidth={22}
            inActiveStrokeColor={'#EB3CF2'}
            inActiveStrokeWidth={20}
          />
        </View>
      </View>

      <View style={styles.pretext}>
        <MaterialCommunityIcons name="water-circle" size={22} color={'white'} />
        <Text style={styles.headText}> WATER</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
        </View>
      </View>
      <Text style={styles.subText}>Water savings is based off the United States average shower of 28 gallons.</Text>

      <View style={{ paddingHorizontal: 10 }}>
        {chartData.length > 0 ? (
          <LineChart
            data={{
              labels: chartData.map(item => item.date.split('/')[0] + '/' + item.date.split('/')[1]),
              datasets: [
                {
                  data: chartData.map(item => item.waterSaved),
                },
              ],
            }}
            width={width(95)}
            height={220}
            yAxisSuffix=" gal"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#363636",
              backgroundGradientFrom: "#363636",
              backgroundGradientTo: "#363636",
              decimalPlaces: 0,
              color: (opacity = 1) => `#EB3CF2`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#363636",
                fill: "#EB3CF2",
              },
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
              showVerticalLabel: true,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              
            }}
          />
        ) : (
          <Text style={styles.subText}>No data available</Text>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Text style={[styles.headText, { paddingTop: height(2), paddingBottom: height(1) }]}>TOTAL ENERGY SAVED</Text>
        <Text style={styles.number}>{electricSaving} <Text style={styles.numberText}>kWh</Text></Text>

        <Progress.Bar
          progress={.5}
          width={width(80)}
          color={'#EB3CF2'}
          borderWidth={0}
          unfilledColor='white'
          height={10}
        />

        <View style={{ ...styles.pretext, paddingTop: height(5) }}>
          <MaterialCommunityIcons name="water-circle" size={22} color={'white'} />
          <Text style={styles.headText}> ENERGY</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
          </View>
        </View>
        <Text style={styles.subText}>Energy savings is based off the United States average shower of 28 gallons.</Text>

        <Text style={[styles.headText, { paddingTop: height(4), paddingBottom: height(1) }]}>CO2 SAVINGS</Text>

        <View style={styles.averageTime}>
          <Text style={styles.number}>{carbonSaving} <Text style={styles.numberText}>lbs</Text></Text>
        </View>

        <View style={{ ...styles.pretext, paddingTop: height(5) }}>
          <MaterialCommunityIcons name="water-circle" size={22} color={'white'} />
          <Text style={styles.headText}> CO2 SAVINGS</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
          </View>
        </View>
        <Text style={styles.subText}>Carbon savings is based off the United States average shower of 28 gallons.</Text>
      </View>
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
    width: '100%',
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
    fontWeight: 'bold',
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  averageTime: {
    borderWidth: 10,
    borderColor: '#EB3CF2',
    width: width(80),
    borderRadius: 40,
    alignItems: 'center',
  },
  absoluteText: {
    position: 'absolute',
  }
});

export default StatsSaving;