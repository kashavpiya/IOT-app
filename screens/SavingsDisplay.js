/* import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { width, height } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../shared/Constant';
import { DeviceContext } from '../states/device/DeviceContext';

const data = {
  'energy': {
    'yearly': [
      {value: 15, label: 'J', frontColor: '#4551A3'},
      {value: 25, label: 'F', frontColor: '#6B7CED'},
      {value: 18, label: 'M', frontColor: '#4551A3'},
      {value: 13, label: 'A', frontColor: '#6B7CED'},
      {value: 22, label: 'M', frontColor: '#4551A3'},
      {value: 19, label: 'J', frontColor: '#6B7CED'},
      {value: 10, label: 'J', frontColor: '#4551A3'},
      {value: 14, label: 'A', frontColor: '#6B7CED'},
      {value: 11, label: 'S', frontColor: '#4551A3'},
      {value: 20, label: 'O', frontColor: '#6B7CED'},
      {value: 14, label: 'N', frontColor: '#4551A3'},
      {value: 12, label: 'D', frontColor: '#6B7CED'},
    ],
    'monthly': [
  
    ],
    'weekly': [
      {value: 9, label: 'Mon', frontColor: '#4551A3'},
      {value: 25, label: 'Tues', frontColor: '#6B7CED'},
      {value: 12, label: 'Wed', frontColor: '#4551A3'},
      {value: 13, label: 'Thurs', frontColor: '#6B7CED'},
      {value: 25, label: 'Fri', frontColor: '#4551A3'},
      {value: 19, label: 'Sat', frontColor: '#6B7CED'},
      {value: 15, label: 'Sun', frontColor: '#4551A3'},
    ]
  },
  'water': {
    'yearly': [
      {value: 15, label: 'J', frontColor: '#4551A3'},
      {value: 25, label: 'F', frontColor: '#6B7CED'},
      {value: 18, label: 'M', frontColor: '#4551A3'},
      {value: 13, label: 'A', frontColor: '#6B7CED'},
      {value: 22, label: 'M', frontColor: '#4551A3'},
      {value: 19, label: 'J', frontColor: '#6B7CED'},
      {value: 10, label: 'J', frontColor: '#4551A3'},
      {value: 14, label: 'A', frontColor: '#6B7CED'},
      {value: 11, label: 'S', frontColor: '#4551A3'},
      {value: 20, label: 'O', frontColor: '#6B7CED'},
      {value: 14, label: 'N', frontColor: '#4551A3'},
      {value: 12, label: 'D', frontColor: '#6B7CED'},
    ],
    'monthly': [
  
    ],
    'weekly': [
      {value: 15, label: 'Mon', frontColor: '#4551A3'},
      {value: 25, label: 'Tues', frontColor: '#6B7CED'},
      {value: 18, label: 'Wed', frontColor: '#4551A3'},
      {value: 13, label: 'Thurs', frontColor: '#6B7CED'},
      {value: 22, label: 'Fri', frontColor: '#4551A3'},
      {value: 19, label: 'Sat', frontColor: '#6B7CED'},
      {value: 10, label: 'Sun', frontColor: '#4551A3'},
    ]
  },
  'CO2': {
    'yearly': [
      {value: 15, label: 'J', frontColor: '#4551A3'},
      {value: 25, label: 'F', frontColor: '#6B7CED'},
      {value: 18, label: 'M', frontColor: '#4551A3'},
      {value: 13, label: 'A', frontColor: '#6B7CED'},
      {value: 22, label: 'M', frontColor: '#4551A3'},
      {value: 19, label: 'J', frontColor: '#6B7CED'},
      {value: 10, label: 'J', frontColor: '#4551A3'},
      {value: 14, label: 'A', frontColor: '#6B7CED'},
      {value: 11, label: 'S', frontColor: '#4551A3'},
      {value: 20, label: 'O', frontColor: '#6B7CED'},
      {value: 14, label: 'N', frontColor: '#4551A3'},
      {value: 12, label: 'D', frontColor: '#6B7CED'},
    ],
    'monthly': [
  
    ],
    'weekly': [
      {value: 9, label: 'Mon', frontColor: '#4551A3'},
      {value: 25, label: 'Tues', frontColor: '#6B7CED'},
      {value: 14, label: 'Wed', frontColor: '#4551A3'},
      {value: 13, label: 'Thurs', frontColor: '#6B7CED'},
      {value: 21, label: 'Fri', frontColor: '#4551A3'},
      {value: 8, label: 'Sat', frontColor: '#6B7CED'},
      {value: 15, label: 'Sun', frontColor: '#4551A3'},
    ]
  }
}

const SavingsDisplay = () => {
  const [selectedItem, setSelectedItem] = useState('water');
  const [selectedFilter, setSelectedFilter] = useState('yearly');
  const [currData, setCurrData] = useState(data[selectedItem][selectedFilter]);
  const { getSavingData } = useContext(DeviceContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSavingData('YEAR');
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    setCurrData(data[selectedItem][selectedFilter]);
  }, [selectedItem, selectedFilter]);

  const isItemSelected = (item) => selectedItem === item;
  const isFilterSelected = (filter) => selectedFilter === filter;
  const averageValue = (data) => {
    let sum = 0;
    for (const item of data) {
      sum = sum + item.value;
    }
    return Math.round(sum / data.length);
  }

  return (
    <View>
      <Text style={styles.heading}>SAVINGS</Text>
      <View style={styles.titleContainer}>
        {[
          { item: 'energy', label: 'ENERGY' },
          { item: 'water', label: 'WATER' },
          { item: 'CO2', label: 'CO2' },
        ].map(({ item, label }) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.title,
              isItemSelected(item) && styles.selectedTitle,
            ]}
            onPress={() => setSelectedItem(item)}
          >
            <Text
              style={[
                styles.titleText,
                isItemSelected(item) && styles.selectedTitleText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.filterContainer}>
        {[
          { item: 'weekly', label: 'WEEKLY' },
          { item: 'monthly', label: 'MONTHLY' },
          { item: 'yearly', label: 'YEARLY' },
        ].map(({ item, label }) => (
          <View key={item}>
            <TouchableOpacity
              style={[styles.filter]}
              onPress={() => setSelectedFilter(item)}
            >
              <Text style={[styles.filterText, isFilterSelected(item) && styles.selectedFilterText]}>
                {label}
              </Text>
            </TouchableOpacity>
            {item !== 'yearly' &&
              <View
                style={{
                borderLeftWidth: 1,
                borderLeftColor: ELECTRIC_BLUE,
                }}
              />
            }
          </View>
        ))}
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 10, color: 'white' }}>AVERAGE</Text>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{averageValue(data[selectedItem][selectedFilter])}</Text>
        <Text style={{ color: 'white' }}>Time Range</Text>
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
        <BarChart
          barWidth={width(6)}
          noOfSections={2}
          frontColor={ELECTRIC_BLUE}
          data={currData}
          rulesThickness={0}
          yAxisThickness={0}
          
          xAxisThickness={0}
          isAnimated
          barBorderRadius={10}
          width={width(80)}
          yAxisColor={'white'}
          xAxisLabelTextStyle={{fontFamily: 'SofiaSans_400Regular', color: "white"}}
          yAxisTextStyle={{fontFamily: 'SofiaSans_400Regular', color: "white"}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 12,
    color: '#8E8E8F',
    textAlign: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: height(1),
    marginBottom: height(2),
    justifyContent: 'center'
  },
  title: {
    marginHorizontal: width(3),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ELECTRIC_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '25%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 10,
    color: ELECTRIC_BLUE,
  },
  selectedTitle: {
    backgroundColor: ELECTRIC_BLUE,
  },
  selectedTitleText: {
    color: 'white'
  },
  filter: {
    marginHorizontal: width(8),
  },
  filterText: {
    fontSize: 10,
    color: ELECTRIC_BLUE,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: height(1),
    justifyContent: 'center'
  },
  selectedFilterText: {
    textDecorationLine: 'underline'
  }
});

export default SavingsDisplay;
 */


import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { width, height } from 'react-native-dimension';
import { ELECTRIC_BLUE } from '../shared/Constant';
import { DeviceContext } from '../states/device/DeviceContext';

const SavingsDisplay = () => {
  const [selectedItem, setSelectedItem] = useState('energy');
  const [selectedFilter, setSelectedFilter] = useState('yearly');
  const [currData, setCurrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSavingData } = useContext(DeviceContext);

  const isItemSelected = (item) => selectedItem === item;
  const isFilterSelected = (filter) => selectedFilter === filter;

  const averageValue = (data) => {
    let sum = 0;
    for (const item of data) {
      sum += item.value;
    }
    return Math.round(sum / data.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSavingData(selectedFilter);
        const newData = response.data;
        setCurrData(newData[selectedItem] && newData[selectedItem][selectedFilter] ? newData[selectedItem][selectedFilter] : []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [getSavingData, selectedItem, selectedFilter]);

  return (
    <View>
      <Text style={styles.heading}>SAVINGS</Text>
      <View style={styles.titleContainer}>
        {[
          { item: 'energy', label: 'ENERGY' },
          { item: 'water', label: 'WATER' },
          { item: 'CO2', label: 'CO2' },
        ].map(({ item, label }) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.title,
              isItemSelected(item) && styles.selectedTitle,
            ]}
            onPress={() => setSelectedItem(item)}
          >
            <Text
              style={[
                styles.titleText,
                isItemSelected(item) && styles.selectedTitleText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.filterContainer}>
        {[
          { item: 'weekly', label: 'WEEKLY' },
          { item: 'monthly', label: 'MONTHLY' },
          { item: 'yearly', label: 'YEARLY' },
        ].map(({ item, label }) => (
          <View key={item}>
            <TouchableOpacity
              style={[styles.filter]}
              onPress={() => setSelectedFilter(item)}
            >
              <Text style={[styles.filterText, isFilterSelected(item) && styles.selectedFilterText]}>
                {label}
              </Text>
            </TouchableOpacity>
            {item !== 'yearly' &&
              <View
                style={{
                borderLeftWidth: 1,
                borderLeftColor: ELECTRIC_BLUE,
                }}
              />
            }
          </View>
        ))}
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 10, color: 'white' }}>AVERAGE</Text>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>{averageValue(currData)}</Text>
        <Text style={{ color: 'white' }}>Time Range</Text>
      </View>
      <View style={{ justifyContent: 'flex-start' }}>
      <BarChart
          barWidth={width(6)}
          noOfSections={2}
          frontColor={ELECTRIC_BLUE}
          data={currData}
          rulesThickness={0}
          yAxisThickness={0}
          xAxisThickness={0}
          isAnimated
          barBorderRadius={10}
          width={width(80)}
          yAxisColor={'white'}
          xAxisLabelTextStyle={{fontFamily: 'SofiaSans_400Regular', color: "white"}}
          yAxisTextStyle={{fontFamily: 'SofiaSans_400Regular', color: "white"}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 12,
    color: '#8E8E8F',
    textAlign: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: height(1),
    marginBottom: height(2),
    justifyContent: 'center'
  },
  title: {
    marginHorizontal: width(3),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ELECTRIC_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '25%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 10,
    color: ELECTRIC_BLUE,
  },
  selectedTitle: {
    backgroundColor: ELECTRIC_BLUE,
  },
  selectedTitleText: {
    color: 'white'
  },
  filter: {
    marginHorizontal: width(8),
  },
  filterText: {
    fontSize: 10,
    color: ELECTRIC_BLUE,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: height(1),
    justifyContent: 'center'
  },
  selectedFilterText: {
    textDecorationLine: 'underline'
  }
});

export default SavingsDisplay; 