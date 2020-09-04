import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import BookmarkButton from 'components/common/BookmarkButton';
import colors from 'config/colors';
import {dp} from 'lib/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'SemiBold',
  },
  image: {
    height: 86,
    width: 80,
    borderRadius: 8,
  },
  body: {
    flex: 1,
    paddingLeft: 12,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  date: {color: 'red'},
  button: {
    backgroundColor: 'white',
    width: dp(48),
    height: dp(48),
    borderRadius: dp(24),
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: dp(16),
    bottom: 0,
  },
});

export default class EventItem extends React.Component {
  _onPress = () =>
    this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onPressAvatar = () => this.props.navigateToBanner(this.props.id);
  render() {
    const {
      id,
      isBookmarked,
      title,
      date,
      venue,
      description,
      pictureUrl,
      bookmarkScheduleId,
    } = this.props;
    let source = pictureUrl
      ? {uri: pictureUrl}
      : require('../../../assets/placeholder.png');
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.container}>
          <Image
            defaultSource={require('../../../assets/placeholder.png')}
            resizeMode="cover"
            style={styles.image}
            source={source}
          />
          <View style={styles.body}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Caption numberOfLines={1}>{venue || description}</Caption>
          </View>
          <View style={styles.footer}>
            <BookmarkButton
              id={id}
              size={24}
              color={colors.gray}
              activeColor={colors.primary}
              isBookmarked={isBookmarked}
              bookmarkScheduleId={bookmarkScheduleId}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
