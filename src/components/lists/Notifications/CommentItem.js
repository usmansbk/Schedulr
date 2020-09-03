import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Caption, Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';

class Item extends React.Component {
  _onPressItems = () => {
    const {entityId, navigateToComments} = this.props;
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
      stores,
      seen,
    } = this.props;

    const styles = stores.styles.notifications;
    const icon = 'comments';
    const {content, title} = extraData;
    const mark = seen ? {} : styles.unseen;

    return (
      <TouchableOpacity
        onPress={this._onPressItems}
        style={[styles.itemContainer, mark]}>
        <View style={styles.messageItemContent}>
          <View>
            <UserAvatar
              onPress={this._onPressItems}
              src={pictureUrl}
              name={subject}
              size={32}
            />
          </View>
          <View style={styles.itemBody}>
            <Text ellipsizeMode="tail" numberOfLines={2}>
              <Caption style={styles.boldText}>{subject}</Caption>{' '}
              <Caption>{message}</Caption>
              <Caption style={styles.boldText}>
                {topic ? ' ' + topic : ''}
              </Caption>
              .
            </Text>
            <View style={styles.message}>
              {title && (
                <>
                  <Caption>
                    <Caption style={{fontWeight: 'bold'}}>R:</Caption> {title}
                  </Caption>
                  <View style={styles.divider} />
                </>
              )}
              <Caption numberOfLines={5} ellipsizeMode="tail">
                {content}
              </Caption>
            </View>
            <View style={styles.itemFooter}>
              <View style={styles.dateLine}>
                <Icon
                  style={styles.icon}
                  name={icon}
                  size={14}
                  color={stores.theme.colors.primary}
                />
                <Caption style={styles.itemTag}>{date}</Caption>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject('stores')(observer(Item));
