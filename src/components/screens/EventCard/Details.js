import React, { Component } from 'react';
import { withNavigation} from 'react-navigation';
import {
  Content,
  Text,
  H2,
} from 'native-base';
import { View } from 'react-native';
import moment from 'moment';
import Actions from './Actions';
import Badge from '../../common/Badge';
import EventItem from '../../common/EventItem';
import capitalizr, { decapitalize } from '../../../lib/capitalizr';
import i18n from '../../../config/i18n';
import styles from './styles';
 
const FORMAT = 'DD MMM YYYY, hh:mm a';
class EventDetail extends Component {
  state = {
    showMore: false,
    showMoreLocation: false
  }

  onPressCommentButton = () => this.props.navigation.navigate('Comments', {
    id: this.props.id,
    name: this.props.name
  });

  onPressTodosButton = () => this.props.navigation.navigate('Todos', {
    id: this.props.id
  });

  _toGroup = () => this.props.navigation.navigate('GroupScreen', { id: this.props.groupId });

  _toggleMore = () => (
    this.setState(({ showMore }) => ({
      showMore: !showMore 
    }))
  );

  _toggleMoreLocation = () => (
    this.setState(({ showMoreLocation }) => ({
      showMoreLocation: !showMoreLocation 
    }))
  );

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextState.showMore !== this.state.showMore ||
      nextState.showMoreLocation !== this.state.showMoreLocation ||
      nextProps.commentsCount !== this.props.commentsCount ||
      nextProps.isCancelled !== this.props.isCancelled ||
      nextProps.isStarred !== this.props.isStarred ||
      nextProps.name !== this.props.name ||
      nextProps.description !== this.props.description ||
      nextProps.eventType !== this.props.eventType ||
      nextProps.location !== this.props.location ||
      nextProps.start !== this.props.start ||
      nextProps.end !== this.props.end ||
      nextProps.repeat !== this.props.repeat
    );
  }
  
  render() {
    const {
      id,
      name,
      description,
      eventType,
      location,
      repeat,
      isCancelled,
      isStarred,
      commentsCount,
      groupName,
    } = this.props;
    const { showMore, showMoreLocation } = this.state;

    let { start, end, createdAt } = this.props;
    start = Date.parse(start);
    end = Date.parse(end);
    const formatStart = moment(start).format(FORMAT);
    const formatEnd = moment(end).format(FORMAT);
    const duration = moment(end).from(start, true);
    const isEnded = (Date.now() > end) && !isCancelled;
    const isOngoing = (Date.now() > start) && !isEnded && !isCancelled;
    createdAt = moment( Date.parse(createdAt)).format(FORMAT);
    
    return (
      <React.Fragment>
        <Content>
          <View style={styles.header}>
            <H2 style={styles.title}>{name}</H2>
            <View style={styles.badges}>
            <Badge info text={decapitalize(eventType)} />
            { isCancelled && <Badge danger text={i18n.t('event_card.cancelled')}/> }
            { isEnded && <Badge warning text={i18n.t('event_card.expired')}/> }
            { isOngoing && <Badge success text={i18n.t('event_card.ongoing')}/> }
            </View>
            <Text note>{i18n.t('event_card.created')} {createdAt}</Text>
            <View style={styles.badges}>
              <Text note>For : </Text>
              <Text onPress={this._toGroup} note style={styles.nav}>{groupName}</Text>
            </View>
            { Boolean(description) && (
              <Text
                onPress={this._toggleMore}
                numberOfLines={!showMore ? 1 : undefined}
                ellipsizeMode={!showMore ? 'tail' : undefined}
                style={styles.description}
              >
              {description}
              </Text> 
            )}
          </View>
          <EventItem
            name={i18n.t('event_card.start')}
            value={formatStart}
          />
          <EventItem
            name={i18n.t('event_card.end')}
            value={formatEnd}
          />
          <EventItem
            name={i18n.t('event_card.duration')}
            value={capitalizr(duration)}
          />
          {
            Boolean(location) && (
              <EventItem
                name={i18n.t('event_card.location')}
                value={location}
                onPress={this._toggleMoreLocation}
                numberOfLines={!showMoreLocation ? 1 : undefined}
                ellipsizeMode={!showMoreLocation ? 'tail' : undefined}
              />
            )
          }
          <EventItem
            name={i18n.t('event_card.repeat')}
            value={ repeat === 'ONCE' ? 'One-Time event' : decapitalize(repeat) }
          />
        </Content>
        <Actions
          id={id}
          isStarred={isStarred}
          commentsCount={commentsCount}
          onPressCommentButton={this.onPressCommentButton}
          onPressTodosButton={this.onPressTodosButton}
          name={name}
          eventType={eventType}
          start={start}
          end={end}
          location={location}
        />
      </React.Fragment>
    )
  }
}

export default withNavigation(EventDetail);