import React from 'react';
import { CachedImage } from 'react-native-cached-image';
import LoadingIndicator from './Indicator';

const source = require('./img/no_image.jpg');

export default (props) => <CachedImage
  defaultSource={source}
  fallbackSource={source}
  loadingIndicator={LoadingIndicator}
  activityIndicatorProps={{
    size: props.size,
  }}
  {...props}
/>;