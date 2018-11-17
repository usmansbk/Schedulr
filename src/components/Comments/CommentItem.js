import React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import UserAvatar from '../common/UserAvatar';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { Text } from 'native-base';

TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US');

export default class CommentItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPress(this.props)
  };

  render() {
    const {
      message,
      name,
      photo,
      createdAt,
    } = this.props;
  
    const time = timeAgo.format(Date.parse(createdAt), 'twitter');
   
    return (
      <TouchableNativeFeedback onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <UserAvatar rounded size={28} name={name} src={photo} />
          </View>
          <View style={styles.body}>
            <View style={styles.space}>
              <View style={styles.trim}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
              </View>
              <Text note>{time}</Text>
            </View>
            <View>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  avatar: {
     marginRight: 8
  },
  space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trim: {
    width: 160
  },
  message: {
    fontSize: 14,
    fontWeight: '100'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#404040'
  },
})