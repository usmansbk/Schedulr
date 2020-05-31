import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text,
  Caption,
  Headline,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Avatar from 'components/common/UserAvatar';
import Badge from 'components/common/Badge';
import { schedule_events } from 'lib/constants';
import {
  parseRepeat,
  getStatus,
  getCategory,
  captionDetails
} from 'lib/formatEvent';
import {
  getDuration,
  getHumanTime
} from 'lib/time';
import getImageUrl from 'helpers/getImageUrl';

const {
  AVATAR_SIZE,
} = schedule_events;

class Item extends React.Component {
  _onPress = () => this.props.onPressItem(this.props.id, this.props.startAt);
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.updatedAt !== this.props.updatedAt);
  }
  render() {
    const {
      title,
      allDay,
      startAt,
      endAt,
      until,
      cancelledDates,
      banner,
      stores
    } = this.props;
    
    const styles = stores.appStyles.scheduleEvents;
    const pictureUrl= banner && getImageUrl(banner);
    const status = getStatus({
      cancelledDates,
      startAt,
      endAt,
      until
    });
    const category= getCategory(this.props.category);
    const recurrence = parseRepeat(this.props.recurrence);
    const time = getHumanTime({ allDay, startAt, endAt });
    const duration = getDuration(startAt, endAt, allDay);
    const caption = captionDetails({
      allDay,
      category,
      duration,
      recurrence,
    });

    return (
      <TouchableOpacity
        onPress={this._onPress}
        style={styles.itemContainer}
      >
        <View style={styles.itemContent}>
          <Avatar
            size={AVATAR_SIZE}
            name={title}
            src={pictureUrl}
            badge={<Badge status={status} />}
            style={styles.left}
            key={status}
            onPress={this._onPress}
          />
          <View style={styles.itemBody}>
            <Headline
              style={styles.itemHeadline}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Headline>
            <Text style={styles.time}>{time}</Text>
            {
              Boolean(caption) && (
                <Caption numberOfLines={1}
                  ellipsizeMode="tail"
                >{caption}</Caption>
              )
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default inject("stores")(observer(Item));