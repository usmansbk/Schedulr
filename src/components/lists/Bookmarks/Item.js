import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Caption, Headline} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import BookmarkButton from 'components/common/BookmarkButton';
import {bookmarkedEvents} from 'lib/constants';
import {captionDetails} from 'lib/formatEvent';

const {AVATAR_SIZE} = bookmarkedEvents;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt);
  _onPressComment = () =>
    this.props.onPressComment(this.props.id, this.props.title, this.props.time);
  _onPressAvatar = () => this.props.navigateToBanner(this.props.id);
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.updatedAt !== nextProps.updatedAt ||
      this.props.isBookmarked !== nextProps.isBookmarked ||
      this.props.bookmarksCount !== nextProps.bookmarksCount
    );
  };

  render() {
    const {
      id,
      title,
      allDay,
      recurrence,
      time,
      duration,
      category,
      pictureUrl,
      isBookmarked,
      stores,
    } = this.props;

    const styles = stores.styles.bookmarkedEventsList;
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
              <Caption numberOfLines={1}>{caption}</Caption>
            </View>
            <BookmarkButton
              id={id}
              size={20}
              isBookmarked={isBookmarked}
              activeColor={stores.theme.colors.like}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
