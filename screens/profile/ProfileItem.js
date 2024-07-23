import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileItem = ({ item, action }) => {
  return (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={action}>
        <List.Item
        id={item}
          title={<Text style={{ color: 'white', fontFamily: 'SofiaSans_400Regular', }}>{item}</Text>}
        />
        <MaterialCommunityIcons name='chevron-right' size={24} color='#8E8E8F' />
      </TouchableOpacity>
      
    </View>
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
});

export default ProfileItem;