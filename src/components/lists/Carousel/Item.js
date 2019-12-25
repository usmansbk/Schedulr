import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 300,
    elevation: 4,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  }
});

export default class Item extends React.Component {
  _onPress = () => this.props.onPress();
  
  render() {
    const { pictureUrl } = this.props;
    const source = pictureUrl && {uri: pictureUrl};
    return (
      <TouchableRipple onPress={this._onPress}>
        <Surface style={styles.container}>
          {
            Boolean(source) ? <Image resizeMode="contain" source={source} style={styles.image} /> : (
              <>
              <Text style={styles.text}>{I18n.get(`TEXT_noBanner`)}</Text>
              <Icon name="image" size={24}/>
              </>
            )
          }
        </Surface>
      </TouchableRipple>
    )
  }
}