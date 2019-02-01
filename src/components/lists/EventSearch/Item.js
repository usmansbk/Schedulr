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
import Tag from '../../common/Tag';
import numeral from 'numeral';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToBoard = () => this.props.navigateToBoard(this.props.boardId);

  render() {
    const {
      date,
      boardName,
      pictureUrl,
      title,
      status,
      starsCount,
      commentsCount,
    } = this.props;
    return (
      <TouchableRipple onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.left}>
            <TouchableRipple onPress={this._navigateToBoard}>
              <UserAvatar
                name={boardName.slice(0, 2)}
                src={pictureUrl}
                size={AVATAR_SIZE}
                component={CachedImage}
              />
            </TouchableRipple>
          </View>
          <View style={styles.right}>
            <Text style={styles.time}>{date}</Text>
            <Headline
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.itemHeadline}
            >{title}</Headline>
            <Tag status={status} />
            <View style={styles.itemFooter}>
              <Caption style={styles.boardName} ellipsizeMode="tail" numberOfLines={1}>by {boardName}</Caption>
              <View style={styles.counts}>
                <View style={styles.footerIcon}>
                  <Icon color={colors.gray}  size={14} name="star" />
                  <Caption>{numeral(starsCount).format('0a')}</Caption>
                </View>
                <View style={styles.footerIcon}>
                  <Icon color={colors.gray} size={14} name="comment" />
                  <Caption style={styles.iconBadge}>{numeral(commentsCount).format('0a')}</Caption>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}