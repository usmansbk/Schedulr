import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Text, Left, Right } from 'native-base';
import moment from 'moment';
import capitalizr, { decapitalize } from '../../lib/capitalizr';
import i18n from '../../config/i18n';
import StarButton from '../../containers/StarButton';
import ShareButton from '../common/ShareIconButton';
import CommentButton from '../common/CommentButton';
import MapButton from '../common/MapButton';
import styles, { bgLight, black } from './styles';

const CALENDAR_OPTIONS = {
  sameElse: function () { return 'MMMM Do, hh:mm a' },
};

export default class EventItem extends React.PureComponent {

  _onPressItem = () => {
    const { id, name, onPressItem } = this.props;
    onPressItem(id, name);
  }

  _onPressCommentButton = () => {
    const { id, name, onPressComment } = this.props;
    onPressComment(id, name);
  }

  _onPressTodoButton = () => {
    const { id, onPressTodo } = this.props;
    onPressTodo(id);
  }

  render() {
    const {
      id,
      name,
      eventType,
      location,
      isCancelled,
      commentsCount,
      isStarred,
      start,
      end,
      repeat,
    } = this.props;
    const parsedStart = Date.parse(start);
    const parsedEnd = Date.parse(end);

    const duration = moment(parsedEnd).from(parsedStart, true);
    const time = moment(parsedStart).format('hh:mm a');

    const isEnded = (parsedEnd < Date.now()) && !isCancelled;
    const isStarted = ((parsedStart - Date.now()) < 0 && !isEnded) && !isCancelled;

    const endDate = moment(parsedEnd).calendar(null, CALENDAR_OPTIONS);
    const startLapse = moment(parsedStart).fromNow();
    const endLapse = moment(parsedEnd).fromNow();
    const happening = !isStarted && !isEnded && !isCancelled ;
    const timeStyle = isStarted ? styles.stated : styles.time

    return (
      <TouchableNativeFeedback
        onPress={this._onPressItem}
      >
        <View style={styles.item_container}>
          <View style={styles.item_content}>
            <View style={styles.item_body}>
              <View style={styles.item_space}>
                <Left>
                  <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                </Left>
                <Right>
                  <Text note style={timeStyle}>{time}</Text>
                </Right>
              </View>
              <View>
                <Text note>{capitalizr(duration)} {decapitalize(eventType, true)} { repeat !== 'ONCE' && decapitalize(repeat, true)}</Text>
                { (isEnded) && <Text style={styles.bold}>{i18n.t('event_card.expired')} {endLapse}</Text> }
                { (isStarted) && <Text style={[styles.bold, styles.blue]}>{i18n.t('event_card.started')} {startLapse}</Text> }
                { (happening) && (<Text style={styles.bold}>{i18n.t('event_card.happening')} {startLapse}</Text>)}
                { (!isCancelled && !isEnded) && <Text style={styles.bold}>{i18n.t('event_card.ending')} {endDate}</Text> }
                { isCancelled && <Text style={[styles.bold, styles.danger]}>{i18n.t('event_card.cancelled')}</Text> }
              </View>
            </View>
          </View>
          <View style={styles.item_space}>
            <StarButton
              isStarred={isStarred}
              id={id}
            />
            <CommentButton
              commentsCount={commentsCount}
              id={id}
              onPress={this._onPressCommentButton}
            />
            <MapButton location={location} />
            <ShareButton
              id={id}
              name={name}
              location={location}
              eventType={eventType}
              start={start}
              end={end}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
