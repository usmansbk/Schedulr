import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Tag from 'components/common/Tag';
import Avatar from 'components/common/UserAvatar';
import Actions from 'components/common/Actions';
import { starredEvents } from 'lib/constants';

const { AVATAR_SIZE } = starredEvents;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onPressComment = () => this.props.onPressComment(this.props.id, this.props.title, this.props.time);
  _onPressAvatar = () => {
    const { boardId } = this.props;
    boardId ? this.props.navigateToInfo(boardId) : this._onPress();
  };
  shouldComponentUpdate = (nextProps) => {
    return (
      this.props.title !== nextProps.title ||
      this.props.time !== nextProps.time ||
      this.props.status !== nextProps.status ||
      this.props.eventType !== nextProps.eventType ||
      this.props.starsCount !== nextProps.starsCount ||
      this.props.commentsCount !== nextProps.commentsCount ||
      this.props.address !== nextProps.address
    );
  }

  render() {
    const {
      id,
      title,
      repeat,
      time,
      status,
      duration,
      eventType,
      pictureUrl,
      isStarred,
      starsCount,
      commentsCount,
      address,
      stores
    } = this.props;

    const styles = stores.appStyles.starredEventsList;


    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View useNativeDriver style={styles.itemContent}>
          <View style={styles.left}>
            <Avatar
              size={AVATAR_SIZE}
              name={title}
              src={pictureUrl}
              onPress={this._onPressAvatar}
            />
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Headline>
              <Text style={styles.time}>{time}</Text>
              <Caption>{duration ? duration + ' ' : ''}{eventType} {repeat}</Caption>
              <Tag status={status} /> 
            </View>
            <Actions
              id={id}
              title={title}
              address={address}
              isStarred={isStarred}
              starsCount={starsCount}
              commentsCount={commentsCount}
              navigateToComments={this._onPressComment}
              small
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));