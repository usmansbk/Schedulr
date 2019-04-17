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
  _onPress = () => this.props.onPress(this.props.section.title);

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