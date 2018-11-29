import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import Avatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Actions from '../../common/Actions';
import capitalizr, { decapitalize } from '../../../lib/capitalizr';
import styles, { primary_light, gray } from './styles';

const START_TIME = 'hh:mm a';
const REMINDER = 'REMINDER';
const DATE_FORMAT = 'DD MM YYYY';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToGroup = () => this.props.navigateToGroupEvents(this.props.groupId);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id);
  _parseDetails = () => {
    const { type, repeat, end, allDay, start } = this.props;
    const recurrence = repeat === 'NEVER' ? '' : decapitalize(repeat);
    const eventType = decapitalize(type, true);
    if ((type === REMINDER) || allDay) return `${recurrence ? (recurrence + ' ' + eventType) : eventType}`;
    const duration = moment(end).from(start, true);
    return capitalizr(`${duration} ${type.toLowerCase()}, ${recurrence.toLowerCase()}`);
  };
  _startTime = () => {
    const { allDay, start } = this.props;
    return  allDay ? 'All day' : moment(start).format(START_TIME).toUpperCase()
  };
  _endTime = () => {
    const { end, start } = this.props;
    const startDay = moment(start).format(DATE_FORMAT);
    const isSameDay = (startDay === moment(end).format(DATE_FORMAT));
    return (isSameDay) ? moment(end).format(START_TIME).toUpperCase() : '';
  };
  _isStarted = () => {
    const { isCancelled, start, end } = this.props;
    return (!isCancelled && (Date.now() > start) && (Date.now() < end));
  };
  render() {
    const {
      id,
      title,
      location,
      date,
      allDay,
      type,
      isCancelled,
      starsCount,
      commentsCount,
      groupName,
      starred,
    } = this.props;
    const [ first, second ] = groupName.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View style={styles.itemContent}>
          <View style={styles.left}>
            <TouchableRipple onPress={this._navigateToGroup}>
              <Avatar
                component={CachedImage}
                rounded
                size={48}
                name={avatarName}
              />
            </TouchableRipple>
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <View style={styles.body}>
                <Text style={styles.itemHeadline} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemNote}>{this._parseDetails()}</Text>
                { isCancelled && <Text style={styles.cancelled}>Cancelled</Text>}
              </View>
              <View>
                <Text
                  style={[styles.time, {
                  color: this._isStarted() ? primary_light : gray
                  }]}>{this._startTime()}
                </Text>
                {
                  !allDay && (type !== REMINDER) && (
                    <Text style={styles.time}>{this._endTime()}</Text>
                  )
                }
              </View>
            </View>
            <Actions
              id={id}
              title={title}
              location={location}
              type={type}
              starred={starred}
              starsCount={starsCount}
              commentsCount={commentsCount}
              date={date}
              navigateToComments={this._onPressComment}
              size="small"
              dark
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}