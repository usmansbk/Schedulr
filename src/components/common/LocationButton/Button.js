import React from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import openMap from 'react-native-open-maps';

const handleAddress = ({ address, latitude, longitude }) => {
  if (latitude && longitude) {
    openMap({
      latitude,
      longitude,
    })
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
    icon={address ? 'location-on' : 'location-off'}
    color={color}
    size={size}
    onPress={() => handleAddress({
      address,
      latitude: 37.865101,
      longitude: -119.538330
    })}
  />
);
