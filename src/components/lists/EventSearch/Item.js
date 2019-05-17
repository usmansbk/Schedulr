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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { inject, observer } from 'mobx-react/native';
import numeral from 'numeral';
import UserAvatar from 'components/common/UserAvatar';
import Tag from 'components/common/Tag';
import { event_search } from 'lib/constants';

const { AVATAR_SIZE } = event_search;

@inject('stores')
@observer
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
      stores
    } = this.props;

    const styles = stores.appStyles.eventSearch;
    const colors = stores.themeStore.colors;

    return (
      <TouchableRipple onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.left}>
            <UserAvatar
              name={title}
              src={pictureUrl}
              size={AVATAR_SIZE}
              onPress={this._navigateToBoard}
            />
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