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
import { captionDetails } from 'lib/parseItem';

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt, this.props.endAt);
  _onLongPress = () => {
    this.ActionSheet &&
      this.ActionSheet.getWrappedInstance().wrappedInstance.showActionSheet();
  };
  _onMute = () => {
    this.props.stores.appState.toggleMute(this.props.id, this.props.isMuted);
  };
  _navigateToBanner = () => this.props.navigateToBanner(this.props.id);

  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.title !== this.props.title ||
      nextProps.time !== this.props.time ||
      nextProps.status !== this.props.status ||
      nextProps.recurrence !== this.props.recurrence ||
      nextProps.category !== this.props.category ||
      nextProps.isMuted !== this.props.isMuted ||
      nextProps.pictureUrl !== this.props.pictureUrl ||
      nextProps.isBookmarked !== this.props.isBookmarked
    );
  };

  render() {
    const {
      id,
      title,
      recurrence,
      time,
      startAt,
      endAt,
      ref_date,
      allDay,
      duration,
      status,
      category,
      address,
      pictureUrl,
      stores,
      isMuted,
      isBookmarked,
      bookmarksCount,
    } = this.props;
    
    const styles = stores.appStyles.eventsList;
    const caption = captionDetails({
      allDay,
      recurrence,
      category,
      duration,
      startAt,
      endAt,
      ref_date
    });
    
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
              onPress={this._navigateToBanner}
            />
            <Badge status={status} isMuted={isMuted} />
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
              <Caption ellipsizeMode="tail" numberOfLines={1}>{caption}</Caption>
            </View>
          </View>
          <ActionSheet
            id={id}
            title={title}
            category={category}
            date={formatDate(startAt, endAt, allDay)}
            address={address}
            isBookmarked={isBookmarked}
            startAt={startAt}
            isMuted={isMuted}
            bookmarksCount={bookmarksCount}
            ref={ref => this.ActionSheet = ref}
            onMute={this._onMute}
          />
        </View>
      </TouchableRipple>
    );
  }
}

export default inject("stores")(observer(Item));