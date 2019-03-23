import React from 'react';
import Details from './Container';
import DeleteDialog from '../../dialogs/DeleteEvent';
import CancelDialog from '../../dialogs/CancelEvent';
import EditDialog from '../../dialogs/EditEvent';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import { isSingle } from '../../../lib/parseItem';
import { ONE_TIME_EVENT } from '../../../lib/constants';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _openEditDialog = () => {
    const { event } = this.props;
    if (event.repeat === ONE_TIME_EVENT) {
      this._handleEdit({
        id: event.id
      });
    } else {
      this.setState({ visibleDialog: 'edit' });
    }
  }
  _handleEdit = ({ id, option, refStartAt, refEndAt }) => this.props.navigation.navigate('EditEvent', { id, option, refEndAt, refStartAt });
  _handleRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.navigation.getParam('id'), isNew: true });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
  _navigateToBoard = (id) => this.props.navigation.navigate('BoardEvents', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _hideDialog = () => this.setState({ visibleDialog: null });
  
  render() {
    const {
      visibleDialog
    } = this.state;
    const {
      navigation,
      event,
      error,
      loading,
      onRefresh
    } = this.props;
    const id = navigation.getParam('id');
    const refStartAt = navigation.getParam('refStartAt');
    const refEndAt = navigation.getParam('refEndAt');
    const cardView = navigation.getParam('cardView');

    if (loading && !event) return <Loading />;
    if (error && !event) return <Error onRefresh={onRefresh} />;

    const isRecurring = event.repeat !== ONE_TIME_EVENT;

    return (
      <>
        <Details
          id={id}
          cardView={cardView}
          event={event}
          refStartAt={refStartAt}
          refEndAt={refEndAt}
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
          isSingle={isSingle(event.repeat)}
          visible={visibleDialog === 'delete'}
          handleDismiss={this._hideDialog}
        />
        <CancelDialog
          id={id}
          date={isRecurring ? refStartAt : null}
          visible={visibleDialog === 'cancel'}
          handleDismiss={this._hideDialog}
        />
        <EditDialog
          id={id}
          refStartAt={refStartAt}
          refEndAt={refEndAt}
          visible={visibleDialog === 'edit'}
          handleDismiss={this._hideDialog}
          onConfirm={this._handleEdit}
        />
      </>
    )
  }
}