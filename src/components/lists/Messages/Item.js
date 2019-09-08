import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Caption,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';

class Item extends React.Component {

  _onPressItems = () => {
    const {
      entityId,
      navigateToComments
    } = this.props;
    if (entityId) {
      navigateToComments(entityId);
    }
  };

  render() {
    const {
      subject,
      message,
      pictureUrl,
      date,
      topic,
      extraData,
      stores
    } = this.props;

    const styles = stores.appStyles.notifications;
    const icon = 'message-circle';
    const {
      content,
      title
    } = extraData;

    return (
      <TouchableRipple onPress={this._onPressItems} style={styles.itemContainer}>
        <View style={styles.messageItemContent}>
          <View>
            <UserAvatar src={pictureUrl} name={subject} size={32} />
          </View>
          <View style={styles.itemBody}>
            <Text ellipsizeMode="tail" numberOfLines={2}>
              <Caption style={styles.boldText}>{subject}</Caption>{' '}
              <Caption>{message}</Caption>
              <Caption style={styles.boldText}>{topic ? ' ' + topic : ''}</Caption>.
            </Text>
            <View style={styles.message}>
              { title && <>
                <Caption>{title}</Caption>
                <View style={styles.divider} />
              </>}
              <Caption numberOfLines={5} ellipsizeMode="tail">{content}</Caption>
            </View>
            <View style={styles.itemFooter}>
              <View style={styles.dateLine}>
                <Icon
                  style={styles.icon}
                  name={icon}
                  size={14}
                  color={stores.themeStore.colors.primary_light}
                />
                <Caption style={styles.itemTag}>{date}</Caption>
              </View>
            </View>
          </View>
        </View>
    </TouchableRipple>
    )
  }
}

export default inject("stores")(observer(Item));