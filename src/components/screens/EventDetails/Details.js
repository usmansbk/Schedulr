import React from 'react';
import moment from 'moment';
import Details from '../../routes/EventDetails';
import DeleteDialog from '../../dialogs/DeleteEvent';
import CancelDialog from '../../dialogs/CancelEvent';
import EditDialog from '../../dialogs/EditEvent';
import { formatDate, getNextDate } from '../../../lib/time';
import {decapitalize} from '../../../lib/capitalizr';

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class DetailsScreen extends React.Component {
  static defaultProps = {
    id: 1,
    title: '(No title)',
    startAt: moment().toISOString(),
    endAt: moment().add(1, 'h').toISOString(),
    eventType: 'WORK',
    location: null,
    group: {
      name: 'Dev Mode Group',
      id: 2,
    },
    allDay: false,
    repeat: 'WEEKLY',
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    description: 'No description',
    isCancelled: false,
    starred: false,
    starsCount: 1000,
    commentsCount: 240,
    isAuthor: true,
  };
  state = {
    visibleDialog: null,
  }
  _getRepeatDate = () => {
    const {
      startAt,
      repeat,
      endAt
    } = this.props;
    if (repeat === 'NEVER') return '';
    return moment(getNextDate(startAt, repeat, startAt, endAt)).format(CREATED_DATE_FORMAT)
  }
  _goBack = () => this.props.navigation.goBack();
  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _openEditDialog = () => this.setState({ visibleDialog: 'edit' });
  _handleEdit = ({ id, option }) => this.props.navigation.navigate('NewEvent', { id, option });
  _handleRepeat = () => this.props.navigation.navigate('RescheduleEvent', { id: this.props.id });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
  _handleCancel = ({ id, option }) => alert(`${id} - ${option}`);
  _navigateToGroup = (id) => this.props.navigation.navigate('GroupEvents', { id });
  _navigateToComments = (id) => this.props.navigation.navigate('Comments', { id });
  _isValid = (isCancelled, endAt) => (!isCancelled) && (Date.now() < Date.parse(endAt));
  _hideDialog = () => this.setState({ visibleDialog: false });
  
  render() {
    const { visibleDialog } = this.state;
    const {
      id,
      title,
      startAt,
      endAt,
      eventType,
      location,
      group,
      repeat,
      allDay,
      createdAt,
      updatedAt,
      description,
      isCancelled,
      starred,
      starsCount,
      commentsCount,
      isAuthor,
    } = this.props;
    return (
      <React.Fragment>
      <Details
        id={id}
        title={title}
        date={formatDate(startAt, endAt, allDay)}
        nextDate={this._getRepeatDate()}
        eventType={decapitalize(eventType)}
        location={location && location.address}
        groupName={group.name}
        groupId={group.id}
        repeat={decapitalize(repeat)}
        createdAt={moment(createdAt).format(CREATED_DATE_FORMAT)}
        updatedAt={moment(updatedAt).format(CREATED_DATE_FORMAT)}
        description={description}
        starred={starred}
        starsCount={starsCount}
        commentsCount={commentsCount}
        isAuthor={isAuthor}
        isValid={this._isValid(isCancelled, endAt)}
        isCancelled={isCancelled}
        handleBack={this._goBack}
        handleDelete={this._openDeleteDialog}
        handleCancel={this._openCancelDialog}
        handleEdit={this._openEditDialog}
        handleRepeat={this._handleRepeat}
        navigateToGroup={this._navigateToGroup}
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