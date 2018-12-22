import React from 'react';
import moment from 'moment';
import { Appbar } from 'react-native-paper';
import Details from './Details';
import styles from '../../../config/styles';
import colors from '../../../config/colors';
import { formatDate, getNextDate } from '../../../lib/time';
import {decapitalize} from '../../../lib/capitalizr';

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class EventDetails extends React.Component {
  static defaultProps = {
    id: 1,
    title: '(No title)',
    startAt: moment().toISOString(),
    endAt: moment().add(1, 'h').toISOString(),
    eventType: 'WORK',
    location: {
      address: 'Bardawa close, Kaduna',
    },
    board: {
      name: 'Dev Mode Board',
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
  
  _getRepeatDate = () => {
    const {
      startAt,
      repeat,
      endAt
    } = this.props;
    if (repeat === 'NEVER') return '';
    return moment(getNextDate(startAt, repeat, startAt, endAt)).format(CREATED_DATE_FORMAT)
  };
  _isValid = (isCancelled, endAt) => (!isCancelled) && (Date.now() < Date.parse(endAt));

  render() {
    const {
      id,
      title,
      eventType,
      location,
      startAt,
      endAt,
      allDay,
      board,
      repeat,
      createdAt,
      updatedAt,
      description,
      starred,
      starsCount,
      commentsCount,
      isAuthor,
      isCancelled,
      handleBack,
      handleDelete,
      handleRepeat,
      handleEdit,
      handleCancel,
      navigateToBoard,
      navigateToComments,
    } = this.props;
    const isValid = this._isValid(isCancelled, endAt);

    return (
      <React.Fragment>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.BackAction color={colors.gray} onPress={handleBack} />
          <Appbar.Content titleStyle={styles.headerColor} title="Details" />
          {
            isAuthor && (
              <React.Fragment>
                <Appbar.Action
                  icon="delete"
                  color={colors.gray}
                  onPress={handleDelete}
                />
                <Appbar.Action
                  icon="repeat"
                  color={colors.gray}
                  onPress={handleRepeat}
                />
                {
                  isValid && (
                    <React.Fragment>
                      <Appbar.Action
                        icon="mode-edit"
                        color={colors.gray}
                        onPress={handleEdit}
                      />
                      <Appbar.Action
                        icon="close"
                        color={colors.gray}
                        onPress={handleCancel}
                      />
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            )
          }
        </Appbar.Header>
        <Details
          id={id}
          title={title}
          date={formatDate(startAt, endAt, allDay)}
          nextDate={this._getRepeatDate()}
          eventType={decapitalize(eventType)}
          location={location && location.address}
          boardName={board.name}
          boardId={board.id}
          repeat={decapitalize(repeat)}
          createdAt={moment(createdAt).format(CREATED_DATE_FORMAT)}
          updatedAt={moment(updatedAt).format(CREATED_DATE_FORMAT)}
          description={description}
          starred={starred}
          starsCount={starsCount}
          commentsCount={commentsCount}
          isAuthor={isAuthor}
          isValid={isValid}
          isCancelled={isCancelled}
          navigateToBoard={navigateToBoard}
          navigateToComments={navigateToComments}
        />
      </React.Fragment>
    )
  }
}