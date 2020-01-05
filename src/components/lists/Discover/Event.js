import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  Text,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';

const styles  = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 250,
    margin: 4,
    marginTop: 16
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    height: 150,
    width: 300,
    borderRadius: 4
  },
  body:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300
  },
  date: {
    paddingRight: 12,
    alignItems: 'center',
  },
  month:{color: 'red'},
  day: {fontSize: 20, fontWeight: 'bold'},
  button: {
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    bottom: 0
  }
});

export default class EventItem extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onPressAvatar = () => this.props.navigateToBanner(this.props.id);
  render() {
    const {
      title,
      month,
      day,
      venue,
      description,
      pictureUrl
    } = this.props;
    let source = pictureUrl ? {uri: pictureUrl} : require('../../../assets/placeholder.png');
    return (
      <TouchableRipple onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image defaultSource={require('../../../assets/placeholder.png')} resizeMode="cover" style={styles.image} source={source}/>
          </View>
          <View style={styles.body}>
            <View style={styles.date}>
              <Text style={styles.month}>{month}</Text>
              <Text style={styles.day}>{day}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20}} numberOfLines={2}>{title}</Text>
              <Caption numberOfLines={1}>{venue || description}</Caption>
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

// export default inject('stores')(observer(EventItem));