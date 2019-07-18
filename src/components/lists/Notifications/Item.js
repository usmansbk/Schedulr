import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Headline,
  Caption
} from 'react-native-paper';
import UserAvatar from 'components/common/UserAvatar';
import { inject, observer } from 'mobx-react';

@inject("stores")
@observer
export default class Item extends React.Component {
  render() {
    const {
      id,
      title,
      message,
      tag,
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
            <Headline style={styles.itemHeadline}>{title}</Headline>
            <Caption style={styles.itemMessage}>{message}</Caption>
            <Caption style={styles.itemTag}>{tag} {date}</Caption>
          </View>
        </View>
    </TouchableRipple>
    )
  }
}