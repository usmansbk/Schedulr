import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
  Text
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';

class Item extends React.Component {

  _onPressItems = () => {
    const {
      entityId,
      type,
      navigateToEvent,
      navigateToSchedule,
      navigateToFollowers,
    } = this.props;
    if (entityId) {
      switch(type) {
        case 'Event':
          navigateToEvent(entityId);
          break;
        case 'Schedule':
          navigateToSchedule(entityId);
          break;
        case 'Follow':
          navigateToFollowers(entityId);
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
      stores
    } = this.props;

    const styles = stores.appStyles.notifications;

    return (
      <TouchableRipple onPress={this._onPressItems} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <UserAvatar src={pictureUrl} name={subject} size={32} />
          <View style={styles.itemBody}>
            <Text ellipsizeMode="tail" numberOfLines={2}>
              <Caption style={styles.boldText}>{subject}</Caption>{' '}
              <Caption>{message}</Caption>
              <Caption style={styles.boldText}>{topic ? ' ' + topic : ''}.</Caption>
            </Text>
            <Caption style={styles.itemTag}>{date}</Caption>
          </View>
        </View>
    </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));