import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {
  Text,
} from 'native-base';
import UserAvatar from '../UserAvatar';
import Logo from '../../../containers/CommunityLogo';

export default class UserInfo extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return this.props.photo !== nextProps.photo ||
      this.props.name !== nextProps.name ||
      this.props.email !== nextProps.email;
  }

  render() {
    const { photo, name, email, onPress } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.account}>
            <UserAvatar
              name={name}
              src={photo}
              rounded
              size={80}
            />
            <Logo />
          </View>
          <View style={styles.divider} />
          <Text ellipsizeMode="tail" numberOfLines={1}>{name}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" note>{email}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 48,
    marginBottom: 24
  },
  divider: {
    marginVertical: 8
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})