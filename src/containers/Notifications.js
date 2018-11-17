import React from 'react';
import EmptyList from '../components/common/EmptyList';
import i18n from '../config/i18n';

export default class NotificationsContainer extends React.PureComponent {
  render() {
    return (
      <EmptyList
        note={i18n.t('notifications.empty')}
      />
    )
  }
}
