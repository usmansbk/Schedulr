import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption, Headline} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import Actions from 'components/common/Actions';
import {bookmarkedEvents} from 'lib/constants';
import {parseRepeat, getCategory, captionDetails} from 'lib/formatEvent';
import {getDuration, getHumanTime} from 'lib/time';
import getImageUrl from 'helpers/getImageUrl';

const {AVATAR_SIZE} = bookmarkedEvents;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt);
  _onPressComment = () =>
    this.props.onPressComment(this.props.id, this.props.title, this.props.time);
  _onPressAvatar = () => {
    const {scheduleId} = this.props;
    scheduleId ? this.props.navigateToInfo(scheduleId) : this._onPress();
  };
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.isBookmarked !== nextProps.isBookmarked ||
      this.props.isAuth !== nextProps.isAuth
    );
  };

  render() {
    const {
      id,
      title,
      startAt,
      endAt,
      allDay,
      isAuth,
      isOffline,
      banner,
      isBookmarked,
      bookmarksCount,
      commentsCount,
      address,
      scheduleId,
      stores,
    } = this.props;

    const styles = stores.styles.searchEventsList;
    const category = getCategory(this.props.category);
    const recurrence = parseRepeat(this.props.recurrence);
    const time = getHumanTime({allDay, startAt, endAt});
    const duration = getDuration(startAt, endAt, allDay);
    const pictureUrl = banner && getImageUrl(banner);
    const caption = captionDetails({
      allDay,
      recurrence,
      category,
      duration,
    });

    return (
      <TouchableOpacity onPress={this._onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Avatar
            size={AVATAR_SIZE}
            name={title}
            src={pictureUrl}
            onPress={this._onPressAvatar}
            style={styles.left}
          />
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Headline>
              <Text style={styles.time}>{time}</Text>
              {Boolean(caption) && (
                <Caption numberOfLines={1} ellipsizeMode="tail">
                  {caption}
                </Caption>
              )}
            </View>
            <Actions
              id={id}
              title={title}
              address={address}
              isBookmarked={isBookmarked}
              isAuth={isAuth}
              isOffline={isOffline}
              bookmarksCount={bookmarksCount}
              commentsCount={commentsCount}
              color={stores.theme.colors.light_gray_3}
              activeColor={stores.theme.colors.like}
              navigateToComments={this._onPressComment}
              bookmarkScheduleId={scheduleId}
              size={18}
              small
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
