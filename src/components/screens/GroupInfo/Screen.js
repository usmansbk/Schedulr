import React from 'react';
import GroupInfo from '../../routes/GroupInfo';
import DeleteDialog from '../../dialogs/DeleteGroup';
import OpenDialog from '../../dialogs/OpenGroup';
import CloseDialog from '../../dialogs/CloseGroup';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _hideDialog = () => this.setState({ visibleDialog: null });
  _handleSelectMenu = (option) => {
    switch (option) {
      case 'edit':
        this.props.navigation.navigate('EditGroup', { id: this.props.id })
        break;
      default:
        this.setState({ visibleDialog: option });
        break;
    }
  };
  _navigateToMembers = (id) => this.props.navigation.navigate('Members', { id });
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id, privacy: 'public' });

  render() {
    const { visibleDialog } = this.state;
    return (
      <React.Fragment>
        <GroupInfo
          goBack={this._goBack}
          handleSelectMenu={this._handleSelectMenu}
          navigateToMembers={this._navigateToMembers}
          navigateToProfile={this._navigateToProfile}
        />
        <DeleteDialog
          visible={visibleDialog === 'delete' }
          handleDismiss={this._hideDialog}
        />
        <OpenDialog
          visible={visibleDialog === 'open' }
          handleDismiss={this._hideDialog}
        />
        <CloseDialog
          visible={visibleDialog === 'close' }
          handleDismiss={this._hideDialog}
        />
      </React.Fragment>
    );
  }
}
