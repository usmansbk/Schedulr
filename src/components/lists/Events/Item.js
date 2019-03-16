import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import Avatar from '../../common/UserAvatar';
import Tag from '../../common/Tag';
import styles, {
  AVATAR_SIZE,
} from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);

  render() {
    const {
      id,
      title,
      repeat,
      time,
      duration,
      status,
      showTag,
      eventType,
      pictureUrl,
    } = this.props;
    
    const isPending = id[0] === '-';
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View useNativeDriver style={showTag ? styles.itemContent : styles.itemContentSmall}>
          <View style={styles.left}>
            <Avatar
              size={AVATAR_SIZE}
              name={title}
              src={pictureUrl}
              onPress={this._navigateToBoard}
            />
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={isPending ? styles.offlineTitle : styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Headline>
              <Text style={styles.time}>{time}</Text>
              <Caption>{duration} {eventType} {repeat}</Caption>
              { showTag && <Tag status={status} /> }
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}