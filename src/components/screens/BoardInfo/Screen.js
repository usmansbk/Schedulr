import React from 'react';
import Share from 'react-native-share';
import BoardInfo from './Hoc';
import DeleteDialog from 'components/dialogs/DeleteBoard';
import OpenDialog from 'components/dialogs/OpenBoard';
import CloseDialog from 'components/dialogs/CloseBoard';
import env from 'config/env';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _hideDialog = () => this.setState({ visibleDialog: null });
  _handleShare = ({ id, name }) => {
    const shareOptions = {
      title: 'Share invite link via...',
      subject: 'Follow schedule to get latest events',
      message: `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
      url: `${env.APP_URL}/schdl/${id}`
    };
    Share.open(shareOptions);
  };
  _handleSelectMenu = (option) => {
    const id = this.props.navigation.getParam('id');
    switch (option) {
      case 'edit':
        this.props.navigation.navigate('EditBoard', { id });
        break;
      default:
        this.setState({ visibleDialog: option });
        break;
    }
  };
  _navigateToFollowers = (id, isAuthor) => this.props.navigation.navigate('Followers', { id, isAuthor });
  _navigateToProfile = (id) => this.props.navigation.push('UserProfile', { id, privacy: 'public' });
  _navigateToEvents = (id, cacheFirst) => this.props.navigation.push('BoardEvents', { id, cacheFirst });

  render() {
    const { visibleDialog } = this.state;
    const id = this.props.navigation.getParam('id');
    return (
      <>
        <BoardInfo
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
