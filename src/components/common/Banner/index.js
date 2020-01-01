import React from 'react';
import { Image, PixelRatio } from 'react-native';
import { getSeason } from 'lib/utils';

export default class Banner extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    const season = getSeason();
    const style = {
      height: 100,
      width: '100%',
      alignItems: 'center',
    };
    let source;
    if (season === 'winter') {
      source = require('../../../assets/winter.png');
    } else if (season === 'autumn') {
      source = require('../../../assets/autumn.png');
    } else if (season === 'spring') {
      source = require('../../../assets/spring.png');
    } else {
      source = require('../../../assets/summer.png');
    }

    return (
      <Image
        source={source}
        style={style}
      />
    )
  }
}
