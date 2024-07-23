import React from "react";
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ELECTRIC_BLUE } from "../shared/Constant";

const ActionButton = (props) => {
  const { iconName, text, disabled, style } = props;
  return (
    <View style={[styles.button, { backgroundColor: disabled ? 'gray' : ELECTRIC_BLUE, }, style]}>
      <MaterialCommunityIcons name={iconName} color='white' size={24} />
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'NunitoSans_400Regular'
  }
});

ActionButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default ActionButton;
