import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption
} from 'react-native-paper';
import Avatar from 'react-native-user-avatar';
import Actions from '../../common/Actions';
import { decapitalize } from '../../../lib/capitalizr';
import styles, { primary_light, black } from './styles';

const START_TIME = 'hh:mm a';
const REMINDER = 'REMINDER';
const DATE_FORMAT = 'DD MM YYYY';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id);
  _parseDetails = () => {
    const { type, repeat, end, start } = this.props;
    const recurrence = repeat === 'NEVER' ? '' : repeat;
    if (type === REMINDER) return `${recurrence ? (decapitalize(recurrence) + ' reminder') : 'Reminder'}`;
    const duration = moment(end).from(start, true);
    return `${duration} ${type.toLowerCase()}, ${recurrence.toLowerCase()}`;
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
      description,
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
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <React.Fragment>
          <View style={styles.itemBody}>
            <View style={styles.avatar}>
              <Avatar rounded size={48} name={groupName} />
            </View><View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemHeadline} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
              <Text style={[styles.startTime, {
                    color: this._isStarted() ? primary_light : black
                  }]}>{this._startTime()}</Text>
            </View>
            <View style={styles.itemSubheading}>
              { Boolean(description) && (
                <Caption
                  style={styles.itemSubheadingText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {description}
                </Caption>)
              }
              {
                !allDay && (type !== REMINDER) && (
                  <Text style={styles.endTime}>{this._endTime()}</Text>
                )
              }
            </View>
            <View style={styles.body}>
              <Text style={styles.itemNote}>{this._parseDetails()}</Text>
              { isCancelled && <Text style={styles.cancelled}>Cancelled</Text>}
            </View>
          </View>
          </View>
          <Actions
            id={id}
            size={20}
            title={title}
            location={location}
            type={type}
            starred={starred}
            starsCount={starsCount}
            commentsCount={commentsCount}
            date={date}
            navigateToComments={this._onPressComment}
            mode="item"
          />
        </React.Fragment>
      </TouchableRipple>
    );
  }
}