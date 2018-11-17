import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  List,
} from 'native-base';
import PushSettings from './Push';
import ReminderSettings from './Reminder';
import SETTINGS from '../../../graphql/localState/query/Settings';

export default class SettingsContainer extends Component {
  render() {
    return <Query query={SETTINGS}>
      {({data: { settings }}) => {
        const { reminder, pushNotification } = settings;
        return (
          <List>
            <ReminderSettings reminder={reminder} />
            <PushSettings pushNotification={pushNotification} />
          </List>
        )
      }}
    </Query>
  }
}