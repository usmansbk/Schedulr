import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import Avatar from 'components/common/UserAvatar';
import Actions from 'components/common/Actions';
import styles, {
  AVATAR_SIZE,
} from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  render() {
    const {
      title,
      repeat,
      time,
      duration,
      eventType,
      pictureUrl,
      isStarred,
      starsCount,
      commentsCount
    } = this.props;

    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View useNativeDriver style={styles.itemContent}>
          <View style={styles.left}>
            <Avatar
              size={AVATAR_SIZE}
              name={title}
              src={pictureUrl}
            />
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Headline>
              <Text style={styles.time}>{time}</Text>
              <Caption>{duration} {eventType} {repeat}</Caption>
            </View>
            <Actions
              title={title}
              eventType={eventType}
              isStarred={isStarred}
              starsCount={starsCount}
              commentsCount={commentsCount}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}