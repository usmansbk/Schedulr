import React from 'react';
import ScheduleInfo from './Hoc';
import DeleteDialog from 'components/dialogs/DeleteSchedule';
import OpenDialog from 'components/dialogs/OpenSchedule';
import CloseDialog from 'components/dialogs/CloseSchedule';
import { handleShareSchedule } from 'helpers/share';

export default class Screen extends React.Component {
  state = { visibleDialog: null, pictureKey: null };
  _goBack = () => this.props.navigation.goBack();
  _hideDialog = () => this.setState({ visibleDialog: null, pictureKey: null });
  _handleShare = ({ id, name }) => {
    handleShareSchedule({
      id,
      title: name,
    });
  };
  _handleSelectMenu = (option, pictureKey) => {
    const id = this.props.navigation.getParam('id');
    switch (option) {
      case 'edit':
        this.props.navigation.navigate('EditSchedule', { id });
        break;
      default:
        this.setState({ visibleDialog: option, pictureKey});
        break;
    }
  };
  _navigateToFollowers = (id) => this.props.navigation.navigate('Followers', { id });
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToEvents = (id) => this.props.navigation.navigate('ScheduleEvents', { id });
  _navigateToPicture = (id) => this.props.navigation.navigate('SchedulePicture', { id });

  render() {
    const { visibleDialog, pictureKey } = this.state;
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
          navigateToPicture={this._navigateToPicture}
        />
        <DeleteDialog
          id={id}
          visible={visibleDialog === 'delete' }
          handleDismiss={this._hideDialog}
          pictureKey={pictureKey}
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
