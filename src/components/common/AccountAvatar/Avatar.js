import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
import UserAvatar from '../UserAvatar';
import styles from './styles';

@inject("stores")
@observer
class Avatar extends React.Component {
  onPress = () => {
    this.props.navigation.navigate('UserProfile', {
      id: this.props.stores.me.id,
      profile: true
    })
  }

  render() {
    const {
      stores,
    } = this.props;
    const {
      name,
      email,
      pictureUrl,
    } = stores.me;

    return (
      <TouchableRipple
        style={styles.container}
        onPress={this.onPress}
      >
        <View style={styles.content}>
          <UserAvatar
            size={80}
            name={name}
            style={styles.avatar}
            src={pictureUrl}
          />
          <View style={styles.text}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>{name}</Text>
            <Caption numberOfLines={1} ellipsizeMode="tail" >{email}</Caption>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default withNavigation(Avatar);