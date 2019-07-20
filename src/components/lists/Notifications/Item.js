import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
  Text
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';

@inject("stores")
@observer
export default class Item extends React.Component {

  _onPressItems = () => {
    const {
      id,
      type,
      navigateToEvent,
      navigateToBoard
    } = this.props;
    if (id) {
      switch(type) {
        case 'Event':
          navigateToEvent(id);
          break;
        case 'Board':
          navigateToBoard(id);
          break;
      }
    }
  };

  render() {
    const {
      title,
      message,
      pictureUrl,
      date,
      target,
      stores
    } = this.props;

    const styles = stores.appStyles.notifications;

    return (
      <TouchableRipple onPress={this._onPressItems} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <UserAvatar src={pictureUrl} name={title} />
          <View style={styles.itemBody}>
            <Caption ellipsizeMode="tail" numberOfLines={2}><Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemMessage}>{title}</Text> {message}
            { Boolean(target) && <Caption style={styles.itemMessage}>{target}</Caption>}</Caption>
            <Caption style={styles.itemTag}>{date}</Caption>
          </View>
        </View>
    </TouchableRipple>
    )
  }
}