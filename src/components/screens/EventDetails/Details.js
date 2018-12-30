import React from 'react';
import Details from '../../routes/EventDetails';
import DeleteDialog from '../../dialogs/DeleteEvent';
import CancelDialog from '../../dialogs/CancelEvent';
import EditDialog from '../../dialogs/EditEvent';

export default class DetailsScreen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _openEditDialog = () => this.setState({ visibleDialog: 'edit' });
  _handleEdit = ({ id, option }) => this.props.navigation.navigate('EditEvent', { id, option });
  _handleRepeat = () => this.props.navigation.navigate('RescheduleEvent', { id: this.props.id });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
  _handleCancel = ({ id, option }) => alert(`${id} - ${option}`);
  _navigateToBoard = (id) => this.props.navigation.navigate('BoardEvents', { id });
  _navigateToComments = (id) => this.props.navigation.navigate('Comments', { id });
  _hideDialog = () => this.setState({ visibleDialog: null });
  
  render() {
    const { visibleDialog } = this.state;
    const { id } = this.props.navigation.getParam('id');
    return (
      <React.Fragment>
        <Details
          id={id}
          handleBack={this._goBack}
          handleDelete={this._openDeleteDialog}
          handleCancel={this._openCancelDialog}
          handleEdit={this._openEditDialog}
          handleRepeat={this._handleRepeat}
          navigateToBoard={this._navigateToBoard}
          navigateToComments={this._navigateToComments}
        />
        <DeleteDialog
          id={id}
          visible={visibleDialog === 'delete'}
          handleDismiss={this._hideDialog}
        />
        <CancelDialog
          id={id}
          visible={visibleDialog === 'cancel'}
          handleDismiss={this._hideDialog}
          onConfirm={this._handleCancel}
        />
        <EditDialog
          id={id}
          visible={visibleDialog === 'edit'}
          handleDismiss={this._hideDialog}
          onConfirm={this._handleEdit}
        />
      </React.Fragment>
    )
  }
}