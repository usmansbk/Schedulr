import React from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';

const handleAddress = (address, lat, lon) => {
  if (lat && lon) {
    alert(`latitude: ${lat}\nlongitude: ${lon}`);
  } else if (address) {
    Alert.alert('Address', address);
  }
};

export default ({
  size,
  color,
  address,
  longitude,
  latitude
}) => (
  <IconButton
    disabled={!address}
    icon="map"
    color={color}
    size={size}
    onPress={() => handleAddress(address, latitude, longitude)}
  />
);
