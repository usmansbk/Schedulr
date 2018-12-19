import React from 'react';
import {
  View
} from 'react-native';
import {
  TouchableRipple,
  Text,
  Headline,
  Caption
} from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import numeral from 'numeral';
import styles, { AVATAR_SIZE } from './styles';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToGroup = () => this.props.navigateToGroup(this.props.groupId);

  render() {
    const {
      date,
      details,
      groupName,
      pictureUrl,
      title,
      isCancelled,
      starsCount,
      commentsCount,
    } = this.props;
    return (
      <TouchableRipple onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemBody}>
          <TouchableRipple onPress={this._navigateToGroup}>
            <UserAvatar
              name={groupName}
              src={pictureUrl}
              rounded
              size={AVATAR_SIZE}
              component={CachedImage}
            />
          </TouchableRipple>
          <View style={styles.itemContent}>
            <View style={styles.itemHead}>
              <Text style={styles.time}>{date}</Text>
            </View>
            <View>
              <Headline
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemHeadline}
              >{title}</Headline>
              <Text style={styles.itemNote}>{details}
              { isCancelled && <Text style={styles.cancelled}> • Cancelled</Text>}
              </Text>
            </View>
            <View style={styles.itemFooter}>
              <View style={styles.footerIcon}>
                <Icon size={14} name="star" />
                <Caption>{numeral(starsCount).format('0a')}</Caption>
              </View>
              <View style={styles.footerIcon}>
                <Icon size={14} name="chat-bubble-outline" />
                <Caption style={styles.iconBadge}>{numeral(commentsCount).format('0a')}</Caption>
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}