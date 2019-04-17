import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Caption,
  Headline,
  TouchableRipple
} from 'react-native-paper';
import { getSectionHeaderData } from 'lib/time';
import { BULLET } from 'lib/constants';
import styles from './styles';

export default class SectionHeader extends React.PureComponent {
  _onPress = () => {
    const date = moment(this.props.section.title);
    const now = moment();
    
    const startSec = now.seconds();
    const startMins = now.minutes();
    const startHours = now.hours();

    const targetDate = date.seconds(startSec).minutes(startMins).hours(startHours).toISOString();

    this.props.onPress(targetDate);
  }

  render() {
    const { section: { title , data }, onPress } = this.props;

    const { heading, subheading, timeAgo } = getSectionHeaderData(title);
    const count = data.length;
    let itemsCount = '';
    let time = '';
    if (count) {
      time = timeAgo;
    }
    if (count > 1) {
      itemsCount = `${count} events ${time ? BULLET : ''} `;
    }

    return (
      <TouchableRipple onPress={this._onPress}>
        <View style={styles.sectionHeader}>
          <Headline style={styles.sectionHeading}>{heading}</Headline>
          <View style={styles.sectionSubheadingContent}>
            <Text style={styles.sectionSubheading}>{subheading}</Text>
            <Caption>{itemsCount}{time}</Caption>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}