import React from 'react';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Notifications';

@inject('stores')
@observer
export default class Notifications extends React.Component {
  render() {
    const { stores } = this.props;

    return (
      <List
        notifications={stores.notifications.items}
      />
    )
  }
}
