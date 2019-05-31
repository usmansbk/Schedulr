import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';
import Avatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import ActionSheet from 'components/actionsheet/Event';
import { events } from 'lib/constants';


@inject('stores')
@observer
export default class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _showActionSheet = () => {
    this.ActionSheet && this.ActionSheet.showActionSheet();
  }
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);
  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.title !== this.props.title ||
      nextProps.time !== this.props.time ||
      nextProps.status !== this.props.status ||
      nextProps.repeat !== this.props.repeat ||
      nextProps.eventType !== this.props.eventType
    );
  }

  render() {
    const {
      id,
      title,
      repeat,
      time,
      duration,
      status,
      eventType,
      pictureUrl,
      stores,
      isStarred,
      isAuthor
    } = this.props;

    const styles = stores.appStyles.eventsList;
    
    const isPending = id[0] === '-';
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
        onLongPress={this._showActionSheet}
      >
        <View useNativeDriver style={styles.itemContentSmall}>
          <View style={styles.left}>
            <Avatar
              size={events.AVATAR_SIZE}
              name={title}
              src={pictureUrl}
              onPress={this._navigateToBoard}
            />
            <Badge status={status} />
          </View>
          <View style={styles.right}>
            <View style={styles.itemBody}>
              <Headline
                style={isPending ? styles.offlineTitle : styles.itemHeadline}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Headline>
              <Text style={styles.time}>{time}</Text>
              <Caption>{duration ? duration + ' ' : ''}{eventType} {repeat}</Caption>
            </View>
          </View>
          <ActionSheet
            id={id}
            isAuthor={isAuthor}
            isStarred={isStarred}
            ref={ref => this.ActionSheet = ref}
          />
        </View>
      </TouchableRipple>
    );
  }
}