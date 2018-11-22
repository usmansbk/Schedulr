import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
  Caption
} from 'react-native-paper';
import styles from './styles';

const START_TIME = 'hh:mm a';
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
    const startTime = moment(start).format(START_TIME);
    const formattedEnd = formatEnd(start, end, allDay);
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View>
          <View style={styles.head}>
            <Headline numberOfLines={1} ellipsizeMode="tail">{title}</Headline>
            <Text style={styles.startTime}>{time}</Text>
          </View>
          <View style={styles.body}>
            { Boolean(description) && (
              <Caption
                numberOfLines={1}
                ellipsizeMode="tail">
                {description}
              </Caption>)
            }
          </View>
        </View>
      </TouchableRipple>
    );
  }
}