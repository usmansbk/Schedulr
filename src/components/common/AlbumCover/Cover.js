import React from 'react';
import { View, Image } from 'react-native';
import getImageUrl from 'helpers/getImageUrl';

export default class Cover extends React.Component {
  render() {
    const { images } = this.props;
    const sources = images.map(img => ({ uri: getImageUrl(img, 320)}))
    return (
      <View style={{
        justifyContent: 'center',
        padding: 4,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Image style={{width: 100, height: 100, margin: 4}} source={sources[0]} />
          <Image style={{width: 100, height: 100, margin: 4}} source={sources[1]} />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Image style={{width: 100, height: 100, margin: 4}}source={sources[2]} />
          <Image style={{width: 100, height: 100, margin: 4}}source={sources[3]} />
        </View>
      </View>
    )
  }
}