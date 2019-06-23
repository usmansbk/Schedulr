import React from 'react';
import { Image } from 'react-native';
import LoadingIndicator from './Indicator';

const source = require('./img/no_image.jpg');

export default (props) => <Image
  defaultSource={source}
  fallbackSource={source}
  loadingIndicator={LoadingIndicator}
  activityIndicatorProps={{
    size: props.size,
    name: props.name
  }}
  {...props}
/>;