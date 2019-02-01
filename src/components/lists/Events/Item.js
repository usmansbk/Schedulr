import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
} from 'react-native-paper';
import Avatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Actions from '../../common/Actions';
import Tag from '../../common/Tag';
import { BULLET } from '../../../lib/constants';
import styles, {
  AVATAR_SIZE,
} from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id);

  render() {
    const {
      id,
      title,
      address,
      latitude,
      longitude,
      repeat,
      time,
      duration,
      status,
      date,
      eventType,
      starsCount,
      commentsCount,
      boardName,
      pictureUrl,
      isStarred,
    } = this.props;
    
    const isPending = id[0] === '-';
    const repeatEvent = repeat && (repeat + ` ${BULLET} `);
    const [ first, second ] = title.split(' ');
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
                size={AVATAR_SIZE}
                name={avatarName}
                src={pictureUrl}
              />
            </TouchableRipple>
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={isPending ? styles.offlineTitle : styles.itemHeadline}
                numberOfLines={1} ellipsizeMode="tail">{title}</Headline>
              <Text style={styles.time}>{time}</Text>
              <Text style={styles.duration}>{duration} {eventType}</Text>
              <Text style={styles.status}>{repeatEvent}<Tag status={status} /></Text>
            </View>
            <Actions
              id={id}
              date={date}
              title={title}
              address={address}
              latitude={latitude}
              longitude={longitude}
              eventType={eventType}
              isStarred={isStarred}
              starsCount={starsCount}
              commentsCount={commentsCount}
              navigateToComments={this._onPressComment}
              small
              dark
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}