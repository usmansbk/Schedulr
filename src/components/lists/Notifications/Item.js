import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
  Text
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  FOLLOW_TYPE,
  BOOKMARK_TYPE,
} from 'lib/constants';

class Item extends React.Component {

  _onPressItems = () => {
    const {
      entityId,
      type,
      navigateToEvent,
      navigateToSchedule,
      navigateToFollowers,
      navigateToBookmarks,
    } = this.props;
    if (entityId) {
      switch(type) {
        case EVENT_TYPE:
          navigateToEvent(entityId);
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
      seen
    } = this.props;

    const styles = stores.appStyles.notifications;
    let icon = 'calendar';
    if (type === 'Schedule') icon = 'clipboard';
    else if (type === 'Follow') icon = 'users';
    else if (type === 'Bookmark') icon = 'bookmark';

    const mark = seen ? {} : styles.unseen;
    return (
      <TouchableRipple onPress={this._onPressItems} style={[styles.itemContainer, mark]}>
        <View style={styles.itemContent}>
          <View>
            <UserAvatar src={pictureUrl} name={subject} size={32} />
          </View>
          <View style={styles.itemBody}>
            <Text ellipsizeMode="tail" numberOfLines={2}>
              <Caption style={styles.boldText}>{subject}</Caption>{' '}
              <Caption>{message}</Caption>
              <Caption style={styles.boldText}>{topic ? ' ' + topic : ''}</Caption>.
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
    </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));