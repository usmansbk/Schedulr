import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import colors from 'config/colors';

export default ({
  onPress,
  disabled,
  danger,
  children,
  size=48,
  uppercase=true
}) => {
  const styles = StyleSheet.create({
    container: {
      height: size,
      padding: 16,
      backgroundColor: danger ? colors.light_red : colors.light_gray,
      margin: 8,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center' 
    },
    label: {
      fontWeight: 'bold',
      color: danger ? 'white' : colors.black
    },
    disable: {
      color: colors.light_gray_4
    }
  });

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        <Text style={[styles.label, disabled ? styles.disable : {} ]}>{uppercase ? children.toUpperCase() : children}</Text>
      </View>
    </TouchableOpacity>
  );
};
