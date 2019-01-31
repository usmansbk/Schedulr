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
import colors from '../../../config/colors';

export default class Item extends React.PureComponent {
  _onPress = () => this.props.onPressItem(this.props.id);
  _navigateToBoard = () => this.props.navigateToBoard(this.props.boardId);

  render() {
    const {
      date,
      details,
      boardName,
      pictureUrl,
      title,
      isCancelled,
      starsCount,
      commentsCount,
    } = this.props;
    return (
      <TouchableRipple onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemBody}>
          <TouchableRipple onPress={this._navigateToBoard}>
            <UserAvatar
              name={boardName}
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
            <View style={styles.itemContentBody}>
              <Headline
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemHeadline}
              >{title}</Headline>
              <Text style={styles.itemNote}>{details}
              { isCancelled && <Text style={styles.cancelled}>Cancelled</Text>}
              </Text>
            </View>
            <View style={styles.itemFooter}>
              <Caption>by {boardName}</Caption>
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