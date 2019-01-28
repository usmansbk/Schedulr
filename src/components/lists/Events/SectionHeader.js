import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import capitalizr from '../../../lib/capitalizr';
import { BULLET } from '../../../lib/constants';
import { ONE_DAY } from '../../../lib/time';
import styles from './styles';

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';

const getFormattedDate = (date) => {
  const parsedDate = Date.parse(date);
  const momentDate = moment(parsedDate);
  let heading = momentDate.calendar(null, {
    sameElse: function () { return DATE_FORMAT },
  });
  let index = heading.indexOf(' at ');
  let SUBHEADING_FORMAT = DAY_FORMAT;
  if (index !== -1) {
    heading = heading.substring(0, index);
    SUBHEADING_FORMAT = DATE_FORMAT;
  }
  const subheading = momentDate.format(SUBHEADING_FORMAT);
  const today = moment();
  let timeAgo = '';
  // If diff between now and date is not 2 days print blank
  if (Math.abs(parsedDate - Date.now()) > (ONE_DAY * 2)) {
    timeAgo = capitalizr(momentDate.startOf('d').from(today.startOf('d')));
  }
  return {
    heading,
    subheading,
    timeAgo
  };
}

export default ({ section: { title , data } }) => {
  const {heading, subheading, timeAgo } = getFormattedDate(title);
  const count = data.length;
  let itemsCount = '';
  if (count > 1) itemsCount = `${count} events ${timeAgo ? BULLET : ''} `;
  return (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeading}>{heading}</Text>
    <View style={styles.sectionSubheadingContent}>
      <Text style={styles.sectionSubheading}>{subheading}</Text>
      <Text style={styles.sectionSubheading}>{itemsCount}{timeAgo}</Text>
    </View>
  </View>
)};
