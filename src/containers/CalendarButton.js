import React from 'react';
import { ToastAndroid } from 'react-native';
import Firebase from 'react-native-firebase';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import Button from '../components/common/IconButton';
import i18n from '../config/i18n';

const AUTHORIZED = 'authorized';
const UNDETERMINED = 'undetermined';

export default class CalendarButton extends React.Component {

  _removeEvent = ({ mutate, calendarId }) => {
    return RNCalendarEvents.removeEvent(calendarId)
      .then((id) => {
        if (id) {
          mutate({
            variables: {
              id: this.props.id,
            }
          })
        }
      })
      .then(() => ToastAndroid.show(i18n.t('toast.removed_event'), ToastAndroid.SHORT))
      .catch((e) => {
        ToastAndroid.show(i18n.t('toast.failed_to_remove_event'), ToastAndroid.SHORT);
        Firebase.crashlytics().log(e.message);
      });
  }

  _saveEvent = ({ mutate }) => {
    RNCalendarEvents.authorizationStatus()
      .then(async (status) => {
        if (status === AUTHORIZED) {
          const calendars = await RNCalendarEvents.findCalendars();
          const primaryCalendar = calendars.find(c => c.isPrimary && c.allowsModifications);
      
          if (!primaryCalendar) Promise.reject(i18n.t("toast.unable_to_find_calendar"));
    
          const {
            title,
            startDate,
            endDate,
            description,
            recurrence,
            location,
            notes
          } = this.props;
          return RNCalendarEvents.saveEvent(title, {
            calendarId: primaryCalendar.id,
            title,
            description,
            startDate: moment(startDate).toISOString(),
            endDate: moment(endDate).toISOString(),
            location,
            notes,
            recurrence: recurrence === 'once' ? 'none' : recurrence,
            alarms: [{ date: 10 }, { date: 60 }]
          })
          .then((id) => {
            mutate({
              variables: {
                id: this.props.id,
                calendarId: id
              }
            })
          })
          .then(() => ToastAndroid.show(i18n.t('toast.added_to_calendar'), ToastAndroid.SHORT))
          .catch(e => Firebase.crashlytics().log(e.message));
        } else if (status === UNDETERMINED) {
          ToastAndroid.show(i18n.t('toast.allow_schdlr'), ToastAndroid.SHORT);
          RNCalendarEvents.authorizeEventStore()
            .then(() => this._saveEvent({ mutate }))
        }
      })
  }

  _toggleCalendar = ({ mutate, calendarId}) => {
    if (calendarId) this._removeEvent({ mutate, calendarId });
    else this._saveEvent({ mutate });
    Firebase.analytics().logEvent('calendar_button');
  };

  render() {
    const { id, calendarId } = this.props;
    const mutation = calendarId ? REMOVE_FROM_CALENDAR : ADD_TO_CALENDAR;

    return (
      <Mutation mutation={mutation}>
        {(mutate) => {
          return (
            <Button
              type="FontAwesome"
              name={ calendarId ? 'calendar-check-o' : 'calendar-plus-o'}
              onPress={() => this._toggleCalendar({
                mutate,
                id,
                calendarId
              })}
            />
          )
        }}
      </Mutation>
    )
  }
}

const ADD_TO_CALENDAR = gql`
  mutation AddToCalendar($id: ID!, $calendarId: ID!) {
    addToCalendar(id: $id, calendarId: $calendarId) @client
  }
`;

const REMOVE_FROM_CALENDAR = gql`
  mutation RemoveFromCalendar($id: ID!) {
    removeFromCalendar(id: $id) @client
  }
`;