import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons, } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { ELECTRIC_BLUE } from "../../../shared/Constant";

const SettingItem = ({ icon, title, action }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={action}>
        {icon === 'logo-amazon' ?
          <Ionicons name="logo-amazon" size={30} color="white" />
          :
          <MaterialCommunityIcons name={icon} size={30} color='white' />
        }
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  iconContainer: {
    backgroundColor: ELECTRIC_BLUE,
    padding: 12,
    marginHorizontal: width(10),
    borderRadius: 10,
    alignItems: 'center'
  },
  text: {
    color: ELECTRIC_BLUE,
    marginTop: width(1),
    fontSize: 12,
    fontFamily: 'NunitoSans_400Regular'
  }
});

export default SettingItem;