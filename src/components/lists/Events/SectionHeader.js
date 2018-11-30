import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import capitalizr from '../../../lib/capitalizr';
import styles from './styles';

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';

const getFormattedDate = (date) => {
  const parsedDate = Date.parse(date);
  let heading = moment(parsedDate).calendar(null, {
    sameElse: function () { return DATE_FORMAT },
  });
  let index = heading.indexOf(' at ');
  let SUBHEADING_FORMAT = DAY_FORMAT;
  if (index !== -1) {
    heading = heading.substring(0, index);
    SUBHEADING_FORMAT = DATE_FORMAT;
  }
  const subheading = moment(parsedDate).format(SUBHEADING_FORMAT);
  const today = moment().format(DATE_FORMAT);
  let timeAgo = '';
  const isToday = moment(subheading).format(DATE_FORMAT) === today;
  if (!isToday) timeAgo = moment(parsedDate).startOf('d').from(moment().startOf('d'));
  return {
    heading,
    subheading,
    timeAgo
  };
}

export default ({ section: { title } }) => {
  const {heading, subheading, timeAgo } = getFormattedDate(title);
  return (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeading}>{heading}</Text>
    <View style={styles.sectionSubheadingContent}>
      <Text style={styles.sectionSubheading}>{subheading}</Text>
      <Text style={styles.sectionSubheading}>{capitalizr(timeAgo)}</Text>
    </View>
  </View>
)};
