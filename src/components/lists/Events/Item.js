import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import Avatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Actions from '../../common/Actions';
import styles, {
  primary_light,
  gray,
  AVATAR_SIZE
} from './styles';

const REMINDER = 'REMINDER';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id);

  render() {
    const {
      id,
      title,
      location,
      details,
      startTime,
      endTime,
      isStarted,
      date,
      allDay,
      eventType,
      isCancelled,
      starsCount,
      commentsCount,
      boardName,
      pictureUrl,
      isStarred,
    } = this.props;
    const [ first, second ] = boardName.split(' ');
    const avatarName = `${first} ${second ? second : ''}`;
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View style={styles.itemContent}>
          <View style={styles.left}>
            <TouchableRipple onPress={this._navigateToBoard}>
              <Avatar
                component={CachedImage}
                rounded
                size={AVATAR_SIZE}
                name={avatarName}
                src={pictureUrl}
              />
            </TouchableRipple>
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <View style={styles.body}>
                <Text style={styles.itemHeadline} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemNote}>{details}</Text>
                { isCancelled && <Text style={styles.cancelled}>Cancelled</Text>}
              </View>
              <View>
                <Text
                  style={[styles.time, {
                  color: isStarted ? primary_light : gray
                  }]}>{startTime}
                </Text>
                {
                  !allDay && (eventType !== REMINDER) && (
                    <Text style={styles.time}>{endTime}</Text>
                  )
                }
              </View>
            </View>
            <Actions
              id={id}
              date={date}
              title={title}
              location={location}
              eventType={eventType}
              isStarred={isStarred}
              starsCount={starsCount}
              commentsCount={commentsCount}
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