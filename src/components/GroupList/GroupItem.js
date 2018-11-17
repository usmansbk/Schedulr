import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {
  Icon,
  Text,
} from 'native-base';
import i18n from '../../config/i18n';
import UserAvatar from '../common/UserAvatar';
import colors from '../theme';

export default class GroupItem extends React.PureComponent {

  _onPressItem = () => this.props.onPressItem(this.props.id);
  _onPressAvatar = () => {
    const { id, name } = this.props;
    this.props.onPressAvatar({ id, name });
  }

  render () {
    const {
      name,
      description,
      isPrivate,
      isClosed,
      isAuthor,
      logo
     } = this.props;

    return (
      <TouchableNativeFeedback
        onPress={this._onPressItem}
      >
        <View style={styles.container}>
          <View style={styles.avatar}>
            <UserAvatar
              size={48}
              name={name}
              src={logo}
              rounded
              onPress={this._onPressAvatar}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.details}>
              <Text style={styles.bold} numberOfLines={1} ellipsizeMode="tail" >{name}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" note>{description}</Text>
              { isClosed && <Text note style={{ color: colors.bgLight }}>{i18n.t('group.closed')}</Text> }
            </View>
            <View>
              { isAuthor && !isPrivate && <Icon style={styles.icon} type="Feather" name="tag" /> }
              { isPrivate && <Icon style={styles.icon} type="Feather" name="eye-off" /> }
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16,
    backgroundColor: 'white',
    height: 80
  },
  icon: {
    fontSize: 16,
    color: '#404040'
  },
  avatar: {
     marginRight: 8
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  details: {
    width: 200
  },
  bold: {
    fontWeight: 'bold',
    color: '#404040'
  },
  note: {
    color: '#888888'
  },
})
