import React from 'react';
import Image from 'react-native-fast-image';

export default ({ size=26, active }) => (
  <Image
    source={active ? require('./ticket-active.png') : require('./ticket-inactive.png')}
    style={{
      width: size,
      height: size,
    }}
  />
);