import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {
  Text,
} from 'native-base';
import UserAvatar from '../../common/UserAvatar';
import FollowButtoon from '../../../containers/FollowButton';
import _styles, { ITEM_HEIGHT } from './styles';
import i18n from '../../../config/i18n';
import theme from '../../theme';

export default class GroupItem extends React.PureComponent {

  _onPressItem = () => this.props.onPressItem(this.props.id, this.props.name, this.props.description);
  _onPressAvatar = () => {
    const { id, name } = this.props;
    this.props.onPressAvatar({ id, name });
  }

  render () {
    const {
      id,
      name,
      description,
      isClosed,
      isAuthor,
      membersCount,
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
              onPress={this._onPressAvatar}
              rounded
            />
          </View>
          <View style={styles.body}>
            <View style={styles.details}>
              <Text style={_styles.bold} numberOfLines={1} ellipsizeMode="tail" >{name}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.note}>{description}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" note>{membersCount} member{membersCount > 1 ? 's' : ''}</Text>
            </View>
            <View>
            {
              (isClosed) ? 
                <Text style={styles.colored} note>{i18n.t('group.closed')}</Text>
              : (
                <React.Fragment>
                  {
                    (!isAuthor) && <FollowButtoon id={id} color="primary" />
                  }
                </React.Fragment>
              )
            }
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
    height: ITEM_HEIGHT
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
    width: 160
  },
  note: {
    color: '#888888'
  },
  colored: {
    color: theme.bgLight
  }
});