import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
  Caption
} from 'react-native-paper';
import styles from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  render() {
    const {
      title,
      description,
      location,
      start,
      end,
      repeat,
      allDay,
      type,
      isCancelled,
      starsCount,
      commentsCount,
      starred,
    } = this.props;
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View>
          <Headline>{title}</Headline>
          <Text numberOfLines={1} ellipsizeMode="tail">{description}</Text>
        </View>
      </TouchableRipple>
    );
  }
}