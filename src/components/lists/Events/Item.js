import React from 'react';
import { View } from 'react-native';
import {
  TouchableRipple,
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import ActionSheet from 'components/actionsheet/Event';
import { events } from 'lib/constants';
import { formatDate } from 'lib/time';


@inject('stores')
@observer
export default class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onLongPress = () => {
    this.ActionSheet && this.ActionSheet.wrappedInstance.showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMute(this.props.id, this.props.isMuted);
  };
  _navigateToBoard = () => this.props.navigateToBoardEvents(this.props.boardId);

  shouldComponentUpdate = (nextProps) => {
    const answer = (
      nextProps.title !== this.props.title ||
      nextProps.time !== this.props.time ||
      nextProps.status !== this.props.status ||
      nextProps.repeat !== this.props.repeat ||
      nextProps.eventType !== this.props.eventType ||
      nextProps.isStarred !== this.props.isStarred ||
      nextProps.isMuted !== this.props.isMuted
    );
    return answer;
  }

  render() {
    const {
      id,
      title,
      repeat,
      time,
      startAt,
      endAt,
      allDay,
      duration,
      status,
      eventType,
      address,
      pictureUrl,
      stores,
      isStarred,
      isMuted,
      starsCount,
    } = this.props;

    const styles = stores.appStyles.eventsList;
    
    const isPending = id[0] === '-';
    return (
      <TouchableRipple
        onPress={this._onPress}
        style={styles.itemContainer}
        onLongPress={this._onLongPress}
      >
        <View useNativeDriver style={styles.itemContentSmall}>
          <View style={styles.left}>
            <Avatar
              size={events.AVATAR_SIZE}
              name={title}
              src={pictureUrl}
              onPress={this._navigateToBoard}
            />
            <Badge status={status} isMuted={isMuted} />
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
              <Caption
                ellipsizeMode="tail"
                numberOfLines={1}
              >{duration ? duration : ''} {eventType} {repeat}</Caption>
            </View>
          </View>
          <ActionSheet
            id={id}
            title={title}
            eventType={eventType}
            date={formatDate(startAt, endAt, allDay)}
            address={address}
            isStarred={isStarred}
            startAt={startAt}
            isMuted={isMuted}
            starsCount={starsCount}
            ref={ref => this.ActionSheet = ref}
            onMute={this._onMute}
          />
        </View>
      </TouchableRipple>
    );
  }
}