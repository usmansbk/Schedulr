import React from 'react';
import { ImageBackground } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import { inject, observer } from 'mobx-react';
import env from 'config/env';

class Banner extends React.Component {
  shouldComponentUpdate = () => false;

  _onLoad = () => {

  };
  
  _onError = (error) => {
    console.log('Advert failed to load: ', error);
  };

  render() {
    const { large, medium_rect } = this.props;
    let Unit = __DEV__ ? TestIds : env;
    let size = BannerAdSize.BANNER;
    let unitId = Unit.BANNER;
    let source = require('../../assets/camp.png');
    let style = {
      height: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    };
    if (large) {
      source = require('../../assets/sunset.png');
      size = BannerAdSize.LARGE_BANNER;
      unitId = Unit.BANNER;
      style = {
        height: 100,
        width: '100%',
        alignItems: 'center',
      };
    } else if (medium_rect) {
      source = require('../../assets/beach.png');
      size = BannerAdSize.MEDIUM_RECTANGLE;
      unitId = Unit.BANNER;
      style = {
        width: 300,
        height: 250
      };
    }
    if (__DEV__) {
      source = {
        uri:`https://source.unsplash.com/random/320x${style.height}`,
      };
    }

    return (
      <ImageBackground
        source={source}
        style={style}
       >
         {
           false && (
            <BannerAd
              unitId={unitId}
              size={size}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                location: this.props.stores.locationStore.adLocation,
                keywords: [
                  'scholarship',
                  'fashion',
                  'clothing',
                  'student',
                  'job',
                  'news',
                  'transport',
                  'ride'
                ]
              }}
              onAdLoaded={this._onLoad}
              onAdFailedToLoad={this._onError}
            />
           )
         }
      </ImageBackground>
    )
  }
}

export default inject("stores")(observer(Banner));