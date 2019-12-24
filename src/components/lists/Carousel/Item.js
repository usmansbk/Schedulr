import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 300,
    elevation: 4,
    margin: 4
  },
  image: {
    width: '100%',
    height: 250
  }
});

export default class Item extends React.Component {
  _onPress = () => this.props.onPress();
  
  render() {
    const { pictureUrl } = this.props;
    const source = pictureUrl ? {uri: pictureUrl} : require('../../../assets/beach.png');
    return (
      <Surface style={styles.container}>
        <TouchableRipple onPress={this._onPress}>
          <Image source={source} style={styles.image} />
        </TouchableRipple>
      </Surface>
    )
  }
}