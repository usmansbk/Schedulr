import React from 'react';
import Details from './Container';
import DeleteDialog from 'components/dialogs/DeleteEvent';
import CancelDialog from 'components/dialogs/CancelEvent';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { ONE_TIME_EVENT } from 'lib/constants';
import { I18n } from 'aws-amplify';

export default class Screen extends React.Component {
  state = { visibleDialog: null };
  _goBack = () => this.props.navigation.goBack();

  _navigateToRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.navigation.getParam('id'), isNew: true });
  _navigateToEdit = ({ id }) => this.props.navigation.navigate('EditEvent', { id });
  _navigateToSchedule = (id) => this.props.navigation.navigate('Schedule', { id });
  _navigateToComments = (id, title, date) => this.props.navigation.navigate('Comments', { id, title, date });
  _navigateToUser = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToBanner = (id) => this.props.navigation.navigate('Banner', { id });

  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
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
    if (!event) return <Error
      message={I18n.get("ERROR_itemMayHaveBeenDeletedContactOwner")}
    />

    const isRecurring = event.recurrence !== ONE_TIME_EVENT;
    
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
          handleEdit={this._navigateToEdit}
          handleRepeat={this._navigateToRepeat}
          navigateToSchedule={this._navigateToSchedule}
          navigateToComments={this._navigateToComments}
          navigateToBanner={this._navigateToBanner}
          navigateToUser={this._navigateToUser}
        />
        <DeleteDialog
          id={id}
          banner={event.banner}
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