import React from 'react';
import Share from 'react-native-share';
import { I18n } from 'aws-amplify';
import ScheduleInfo from './Hoc';
import DeleteDialog from 'components/dialogs/DeleteSchedule';
import OpenDialog from 'components/dialogs/OpenSchedule';
import CloseDialog from 'components/dialogs/CloseSchedule';
import env from 'config/env';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _hideDialog = () => this.setState({ visibleDialog: null });
  _handleShare = ({ id, name }) => {
    const shareOptions = {
      title: I18n.get("SHARE_SCHEDULE_inviteTitle"),
      subject: I18n.get("SHARE_SCHEDULE_subject"),
      message: `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
      url: `${env.APP_URL}/schdl/${id}`
    };
    Share.open(shareOptions).catch(error => {
      // Ignore
    });
  };
  _handleSelectMenu = (option) => {
    const id = this.props.navigation.getParam('id');
    switch (option) {
      case 'edit':
        this.props.navigation.navigate('EditSchedule', { id });
        break;
      default:
        this.setState({ visibleDialog: option });
        break;
    }
  };
  _navigateToFollowers = (id) => this.props.navigation.navigate('Followers', { id });
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToEvents = (id) => this.props.navigation.navigate('ScheduleEvents', { id });

  render() {
    const { visibleDialog } = this.state;
    const id = this.props.navigation.getParam('id');
    return (
      <>
        <ScheduleInfo
          id={id}
          goBack={this._goBack}
          handleShare={this._handleShare}
          handleSelectMenu={this._handleSelectMenu}
          navigateToFollowers={this._navigateToFollowers}
          navigateToProfile={this._navigateToProfile}
          navigateToEvents={this._navigateToEvents}
        />
        <DeleteDialog
          id={id}
          visible={visibleDialog === 'delete' }
          handleDismiss={this._hideDialog}
        />
        <OpenDialog
          id={id}
          visible={visibleDialog === 'open' }
          handleDismiss={this._hideDialog}
        />
        <CloseDialog
          id={id}
          visible={visibleDialog === 'close' }
          handleDismiss={this._hideDialog}
        />
      </>
    );
  }
}
