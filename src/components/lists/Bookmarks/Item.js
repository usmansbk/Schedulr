import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Badge from 'components/common/Badge';
import Avatar from 'components/common/UserAvatar';
import Actions from 'components/common/Actions';
import { bookmarkedEvents } from 'lib/constants';
import { captionDetails } from 'lib/parseItem';

const { AVATAR_SIZE } = bookmarkedEvents;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onPressComment = () => this.props.onPressComment(this.props.id, this.props.title, this.props.time);
  _onPressAvatar = () => this.props.navigateToBanner(this.props.id);
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.bookmarksCount !== nextProps.bookmarksCount
    );
  }

  render() {
    const {
      id,
      title,
      allDay,
      recurrence,
      time,
      status,
      duration,
      category,
      pictureUrl,
      isBookmarked,
      isAuth,
      bookmarksCount,
      commentsCount,
      eventScheduleId,
      address,
      stores
    } = this.props;
    
    const styles = stores.appStyles.bookmarkedEventsList;
    const caption = captionDetails({
      allDay,
      recurrence,
      category,
      duration
    });

    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View style={styles.itemContent}>
          <View style={styles.left}>
            <Avatar
              size={AVATAR_SIZE}
              name={title}
              src={pictureUrl}
              onPress={this._onPressAvatar}
              badge={<Badge status={status}/>}
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
              <Caption>{caption}</Caption>
            </View>
            <Actions
              id={id}
              title={title}
              address={address}
              isBookmarked={isBookmarked}
              isAuth={isAuth}
              bookmarksCount={bookmarksCount}
              commentsCount={commentsCount}
              bookmarkScheduleId={eventScheduleId}
              color={stores.themeStore.colors.light_gray_3}
              activeColor={stores.themeStore.colors.like}
              navigateToComments={this._onPressComment}
              size={18}
              small
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));