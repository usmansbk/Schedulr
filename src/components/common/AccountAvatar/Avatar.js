import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text, Caption, TouchableRipple } from 'react-native-paper';
import UserAvatar from '../UserAvatar';
import styles from './styles';

class Avatar extends React.Component {
  onPress = () => {
    this.props.onPress();
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

export default inject("stores")(observer(Avatar));