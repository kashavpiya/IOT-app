import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from '../../shared/Constant';
import TotalSavings from '../TotalSavings';

const History = ({ route, navigation }) => {
  const device = route.params.data;
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
          <Text style={styles.header}>History</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: height(3) }}>
          
          <View style={styles.totalSavings}>
              <TotalSavings />
            </View>
          
          
          {/* <View style={styles.itemContainer}>
            <Text style={styles.historyText}>8 min 50 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>10 min 20 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>7 min 10 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>10 min 4 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>8 min 10 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>8 min 45 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>9 min 28 seconds</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.historyText}>5 min 45 seconds</Text>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
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
  itemContainer: {
    alignItems: 'center',
    backgroundColor: '#363636',
    padding: 20,
    width: width(80),
    borderRadius: 15,
    marginBottom: height(3)
  },
  historyText: {
    color: 'white',
    fontFamily: 'SofiaSans_400Regular',
  },
  totalSavings: {
    marginTop: height(2)
  }
  
});

export default History;