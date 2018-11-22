import React from 'react';
import moment from 'moment';
import Details from '../../routes/EventDetails';
import DeleteDialog from '../../dialogs/DeleteEvent';
import CancelDialog from '../../dialogs/CancelEvent';
import EditDialog from '../../dialogs/EditEvent';
import { formatDate } from '../../../lib/time';
import {decapitalize} from '../../../lib/capitalizr';

const defaultValues = {
  id: 1,
  title: '(No title)',
  start: new Date('11/21/2018'),
  end: new Date('11/22/2018'),
  type: 'WORK',
  location: null,
  group: {
    name: 'Dev Mode',
    id: 2,
  },
  allDay: false,
  repeat: 'NEVER',
  createdAt: new Date('11/20/2018'),
  description: 'No description',
  isCancelled: false,
  starred: false,
  starsCount: 2001,
  commentsCount: 2400000,
  isAuthor: true,
};

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class DetailsScreen extends React.Component {
  state = {
    visibleDialog: null,
  }
  _goBack = () => this.props.navigation.goBack();
  _openDeleteDialog = () => this.setState({ visibleDialog: 'delete' });
  _openEditDialog = () => this.setState({ visibleDialog: 'edit' });
  _handleEdit = ({ id, option }) => this.props.navigation.navigate('NewEvent', { id, option });
  _handleRepeat = () => this.props.navigation.navigate('NewEvent', { id: this.props.id });
  _openCancelDialog = () => this.setState({ visibleDialog: 'cancel' });
  _handleCancel = ({ id, option }) => alert(`${id} - ${option}`);
  _navigateToGroup = (id) => alert('To group ' + id);
  _navigateToComments = (id) => alert('To comments ' + id);
  _isValid = (isCancelled, end) => (!isCancelled) && (Date.now() < end);
  _hideDialog = () => this.setState({ visibleDialog: false });
  
  render() {
    const { visibleDialog } = this.state;
    const {
      id,
      title,
      start,
      end,
      type,
      location,
      group,
      repeat,
      allDay,
      createdAt,
      description,
      isCancelled,
      starred,
      starsCount,
      commentsCount,
      isAuthor,
    } = defaultValues;
    return (
      <React.Fragment>
      <Details
        id={id}
        title={title}
        date={formatDate(start, end, allDay)}
        type={decapitalize(type)}
        location={location}
        groupName={group.name}
        groupId={group.id}
        repeat={decapitalize(repeat)}
        createdAt={moment(createdAt).format(CREATED_DATE_FORMAT)}
        description={description}
        starred={starred}
        starsCount={starsCount}
        commentsCount={commentsCount}
        isAuthor={isAuthor}
        isValid={this._isValid(isCancelled, end)}
        isCancelled={isCancelled}
        handleBack={this._goBack}
        handleDelete={this._openDeleteDialog}
        handleCancel={this._openCancelDialog}
        handleEdit={this._openEditDialog}
        handleRepeat={this._handleRepeat}
        navigateToGroup={this._navigateToGroup}
        navigateToComments={this._navigateToComments}
      />
      {
        isAuthor && (
          <React.Fragment>
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
      </React.Fragment>
    )
  }
}