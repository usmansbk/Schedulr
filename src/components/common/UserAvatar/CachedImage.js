import React from 'react';
import { CachedImage } from 'react-native-cached-image';

const source = require('./img/no_image.jpg');

export default (props) => <CachedImage
  defaultSource={source}
  fallbackSource={source}
  {...props}
/>;