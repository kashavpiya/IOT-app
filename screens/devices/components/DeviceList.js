import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { width, height } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DeviceContext } from "../../../states/device/DeviceContext";
import showerhead from "../../../assets/showerhead.png"
import { ELECTRIC_BLUE } from "../../../shared/Constant";

const DeviceList = () => {
  const { devices } = useContext(DeviceContext);
  const navigation = useNavigation();

  return (
    <View>
      {Object.keys(devices).map((id) => {
        console.log(devices[id]);
        return (
          <TouchableOpacity
              key={id}
              style={styles.itemContainer}
              onPress={() => navigation.navigate('Shower Heads', { screen: `Shower_${id}` })} 
          >
            <View style={styles.left}>
              <Image source={showerhead} style={styles.image}/>
            </View>
            
            <Text style={styles.deviceName}>{devices[id].name}</Text>
            <MaterialCommunityIcons name='chevron-right' size={26} color={'white'} style={{ paddingRight: width(2) }}/>
          </TouchableOpacity>
        )
      })}
    </View>
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: height(2.5),
    backgroundColor: '#363636',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.1,
    elevation: 2,
    width: width(90)
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deviceName: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SofiaSans_400Regular',
    color:'white',
  },
  left: {
    backgroundColor: ELECTRIC_BLUE,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    
  },
  image: {
    height: 30,
    width: 30,
  }
});

export default DeviceList;