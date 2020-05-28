import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Caption,
  Text
} from 'react-native-paper';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  FOLLOW_TYPE,
  BOOKMARK_TYPE,
} from 'lib/constants';
import { COMMENT_TYPE, notifications_list } from 'lib/constants';

const { AVATAR_SIZE } = notifications_list;
class Item extends React.Component {

  _onPressItems = () => {
    const {
      entityId,
      type,
      refStartAt,
      navigateToEvent,
      navigateToSchedule,
      navigateToFollowers,
      navigateToBookmarks,
      navigateToComments
    } = this.props;
    if (entityId) {
      switch(type) {
        case EVENT_TYPE:
          navigateToEvent(entityId, refStartAt);
          break;
        case SCHEDULE_TYPE:
          navigateToSchedule(entityId);
          break;
        case FOLLOW_TYPE:
          navigateToFollowers(entityId);
          break;
        case BOOKMARK_TYPE:
          navigateToBookmarks(entityId);
          break;
        case COMMENT_TYPE:
          navigateToComments(entityId);
          break;
      }
    }
  };

  render() {
    const {
      subject,
      message,
      pictureUrl,
      date,
      topic,
      stores,
      type,
      seen,
      extraData
    } = this.props;

    const content = extraData && extraData.content;

    const styles = stores.appStyles.notifications;
    let icon = 'calendar';
    if (type === 'Schedule') icon = 'pin';
    else if (type === 'Follow') icon = 'users';
    else if (type === 'Bookmark') icon = 'bookmark';
    else if (type === 'Comment')  icon = 'comments';

    const mark = seen ? {} : styles.unseen;
    return (
      <TouchableOpacity onPress={this._onPressItems} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <UserAvatar style={styles.avatar} onPress={this._onPressItems} src={pictureUrl} name={subject} size={AVATAR_SIZE} />
          <View style={[styles.itemBody, mark]}>
            <Text ellipsizeMode="tail" numberOfLines={2}>
              <Caption style={styles.boldText}>{subject}</Caption>{' '}
              <Caption>{message}</Caption>
              <Caption style={styles.boldText}>{topic ? ' ' + topic : ''}</Caption>
              {content ? <Caption numberOfLines={1} ellipsizeMode="tail">: {content}</Caption> : '.'}
            </Text>
            <View style={styles.dateLine}>
              <Icon
                style={styles.icon}
                name={icon}
                size={14}
                color={stores.themeStore.colors.primary}
              />
              <Caption style={styles.itemTag}>{date}</Caption>
            </View>
          </View>
        </View>
    </TouchableOpacity>
    )
  }
}

export default inject("stores")(observer(Item));