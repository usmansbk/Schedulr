import React from 'react';
import moment from 'moment';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Paragraph
} from 'react-native-paper';
import Actions from '../../common/Actions';
import { decapitalize } from '../../../lib/capitalizr';
import styles, { primary_dark, gray } from './styles';

const START_TIME = 'hh:mm a';
const REMINDER = 'REMINDER';

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
  _isStarted = () => {
    const { isCancelled, allDay, start, end } = this.props;
    return (!isCancelled && (Date.now() > start) && (Date.now() < end));
  }
  render() {
    const {
      id,
      title,
      description,
      location,
      date,
      type,
      isCancelled,
      starsCount,
      commentsCount,
      starred,
    } = this.props;
    const isStarted = this._isStarted();
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <React.Fragment>
          <View style={styles.itemContent}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemHeadline} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
              <Text style={[styles.startTime, {
                color: isStarted ? primary_dark : gray
              }]}>{this._startTime()}</Text>
            </View>
            <View style={styles.body}>
              { Boolean(description) && (
                <Paragraph
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {description}
                </Paragraph>)
              }
              <Text style={styles.itemNote}>{this._parseDetails()}</Text>
              { isCancelled && <Text style={styles.itemNote}>Cancelled</Text>}
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