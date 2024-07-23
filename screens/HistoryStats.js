import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { width, height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { RFValue } from 'react-native-responsive-fontsize';
import { LineChart } from 'react-native-chart-kit';
import { DeviceContext } from '../states/device/DeviceContext';

const HistorySaving = () => {
  const { getHistory } = useContext(DeviceContext);
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);

  const formatShowerTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyResponse = await getHistory();
        console.log("Fetched history data:", historyResponse);
        const lastSevenEntries = historyResponse.slice(-7);
        console.log("Last 7 entries:", lastSevenEntries);
        setHistory(lastSevenEntries);

        const formattedChartData = lastSevenEntries.map(item => ({
          date: new Date(item.sample_time).toLocaleDateString(),
          showerTime: item.payload.shower_time,
        }));
        console.log("Formatted chart data:", formattedChartData);
        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getHistory]);

  return (
    <ScrollView>
      <View style={styles.topContainer}>
        <Text style={styles.headText}>HISTORY</Text>
        <View style={{ position: 'relative' }}>
          <View style={{ position: 'absolute', top: 57, left: 69 }}>
            <Text style={[styles.headText3, { paddingTop: height(5), fontWeight: 'normal' }]}>&lt;</Text>
          </View>
          <View style={{ position: 'absolute', top: 84, left: 144 }}>
            <Text style={[styles.headText2, { paddingTop: height(5), fontWeight: 'normal' }]}>MIN</Text>
          </View>
          <View style={{ paddingTop: height(2) }}>
            <CircularProgress
              value={8}
              radius={120}
              duration={0}
              progressValueColor={'white'}
              progressValueStyle={{ fontSize: 64 }}
              activeStrokeColor={'#A500EE'}
              maxValue={8}
              title={'GOAL'}
              titleColor={'white'}
              titleStyle={{ fontSize: 17 }}
              delay={0}
              initialValue={8}
              activeStrokeWidth={22}
              inActiveStrokeColor={'#A500EE'}
              inActiveStrokeWidth={20}
            />
          </View>
        </View>
      </View>

      <View style={styles.pretext}>
        <MaterialCommunityIcons name="history" size={22} color={'white'} />
        <Text style={styles.headText}> RECENT SHOWERS TAKEN</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
        </View>
      </View>
      <Text style={styles.subText}>Calculations are approximate</Text>

      <View style={styles.pretext}>
        <MaterialCommunityIcons name="star-circle-outline" size={22} color={'white'} />
        <Text style={styles.headText}> SAVINGS</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <MaterialCommunityIcons name='information-outline' size={22} color={'white'} style={{ paddingRight: width(2) }} />
        </View>
      </View>
      <Text style={styles.subText}>Nation shower average</Text>

      <View style={styles.bottomContainer}>
        <View style={styles.historyContainer}>
          {history.slice().reverse().map((item, index) => {
            const showerTimePerCycle = item.payload.shower_time / item.payload.cycles;
            const isHighlighted = item.payload.cycles === 0 || showerTimePerCycle > 480;
            const iconBackgroundColor = isHighlighted ? '#434343' : '#a500ee';
            const iconName = isHighlighted ? 'minus-circle-outline' : 'star-circle-outline';

            return (
              <View key={index} style={styles.historyItem}>
                <View style={[styles.starIcon, { backgroundColor: iconBackgroundColor }]}>
                  <MaterialCommunityIcons name={iconName} size={42} color={'white'} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.historyText1}>{new Date(item.sample_time).toLocaleDateString()}</Text>
                  <Text style={styles.historyText2}>
                    Shower Time: <Text style={{ color: "#a500ee" }}>{formatShowerTime(item.payload.shower_time)}</Text>
                  </Text>
                  <Text style={styles.historyText2}>
                    Showers: <Text style={{ color: "#a500ee" }}>{item.payload.cycles}</Text>
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={{ paddingHorizontal: 10, marginVertical: height(3) }}>
        <Text style={styles.headText}>Shower History Chart</Text>
        {chartData.length > 0 && (
          <LineChart
            data={{
              labels: chartData.map(item => item.date.split('/')[0] + '/' + item.date.split('/')[1]),
              datasets: [
                {
                  data: chartData.map(item => item.showerTime / 60),
                },
              ],
            }}
            width={width(95)}
            height={220}
            yAxisSuffix=" min"
            yAxisInterval={10}
            chartConfig={{
              backgroundColor: "#363636",
              backgroundGradientFrom: "#363636",
              backgroundGradientTo: "#363636",
              decimalPlaces: 0,
              color: (opacity = 1) => `#a500ee`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#363636",
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
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  headText2: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  headText3: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold',
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
    width: width(100),
  },
  number: {
    fontSize: 64,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  numberText: {
    fontSize: 37,
    fontFamily: 'SofiaSans_400Regular',
    color: 'white',
    fontWeight: 'bold',
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
  },
  historyContainer: {
    paddingHorizontal: width(5),
  },
  historyItem: {
    backgroundColor: '#363636',
    borderRadius: 25,
    marginVertical: height(1.5),
    width: width(90),
    flexDirection: 'row',
  },
  historyText1: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'SofiaSans_400Regular',
    fontWeight: 'bold',
  },
  historyText2: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'SofiaSans_400Regular',
  },
  starIcon: {
    backgroundColor: '#a500ee',
    marginRight: width(10),
    padding: width(5),
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default HistorySaving;