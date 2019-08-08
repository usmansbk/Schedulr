import React from 'react';
import Details from './Container';
import DeleteDialog from 'components/dialogs/DeleteEvent';
import CancelDialog from 'components/dialogs/CancelEvent';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { ONE_TIME_EVENT } from 'lib/constants';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();
  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _handleEdit = ({ id }) => this.props.navigation.navigate('EditEvent', { id });
  _handleRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.navigation.getParam('id'), isNew: true });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
  _navigateToSchedule = (id, cacheFirst) => this.props.navigation.navigate('Schedule', { id, cacheFirst });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _navigateToUser = (id, myProfile) => this.props.navigation.navigate('UserProfile', {
    id,
    myProfile
  });
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

    const isRecurring = event.recur !== ONE_TIME_EVENT;

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
          handleEdit={this._handleEdit}
          handleRepeat={this._handleRepeat}
          navigateToSchedule={this._navigateToSchedule}
          navigateToComments={this._navigateToComments}
          navigateToUser={this._navigateToUser}
        />
        <DeleteDialog
          id={id}
          visible={visibleDialog === 'delete'}
          handleDismiss={this._hideDialog}
        />
        <CancelDialog
          id={id}
          date={isRecurring ? refStartAt : null}
          visible={visibleDialog === 'cancel'}
          handleDismiss={this._hideDialog}
        />
      </>
    )
  }
}