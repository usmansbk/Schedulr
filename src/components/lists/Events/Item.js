import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
} from 'react-native-paper';
import emojiRegex from 'emoji-regex';
import Avatar from '../../common/UserAvatar';
import Tag from '../../common/Tag';
import { BULLET } from '../../../lib/constants';
import styles, {
  AVATAR_SIZE,
} from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);
  _onPressComment = () => this.props.onPressCommentButton(this.props.id, this.props.title, this.props.date);

  render() {
    const {
      id,
      title,
      repeat,
      time,
      duration,
      status,
      eventType,
      pictureUrl,
    } = this.props;
    
    const isPending = id[0] === '-';
    const repeatEvent = repeat && (repeat + ` ${BULLET} `);
    const emojiMatch = emojiRegex().exec(title);
    let avatarName;
    if (emojiMatch) {
      avatarName = emojiMatch[0];
    } else {
      const [ first, second ] = title.split(' ');
      avatarName = `${first} ${second ? second : ''}`;
    }
    
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View useNativeDriver style={styles.itemContent}>
          <View style={styles.left}>
            <Avatar
              size={AVATAR_SIZE}
              name={avatarName}
              src={pictureUrl}
              onPress={this._navigateToBoard}
            />
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
          </View>
        </View>
      </TouchableRipple>
    );
  }
}