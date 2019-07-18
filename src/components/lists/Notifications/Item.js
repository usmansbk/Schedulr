import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';

@inject("stores")
@observer
export default class Item extends React.Component {
  render() {
    const {
      id,
      title,
      message,
      pictureUrl,
      date,
      stores
    } = this.props;

    const styles = stores.appStyles.notifications;

    return (
      <TouchableRipple style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <UserAvatar src={pictureUrl} name={title} />
          <View style={styles.itemBody}>
            <Caption style={styles.itemMessage}>{message}</Caption>
            <Caption style={styles.itemTag}>{date}</Caption>
          </View>
        </View>
    </TouchableRipple>
    )
  }
}