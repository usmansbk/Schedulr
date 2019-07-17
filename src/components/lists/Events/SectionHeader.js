import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Caption,
  Headline,
  TouchableRipple
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { getSectionHeaderData } from 'lib/time';
import { BULLET } from 'lib/constants';

@inject('stores')
@observer
export default class SectionHeader extends React.Component {
  _onPress = () => {
    const date = moment(this.props.section.title);
    const now = moment();
    
    const startSec = now.seconds();
    const startMins = now.minutes();
    const startHours = now.hours();

    const targetDate = date.seconds(startSec).minutes(startMins).hours(startHours).format();

    this.props.onPress(targetDate);
  }

  render() {
    const {
      section: { title , data },
      stores
    } = this.props;

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

    const styles = stores.appStyles.eventsList;

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