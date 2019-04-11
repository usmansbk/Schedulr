import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import { Appbar } from 'react-native-paper';
import Details from './Details';
import styles from 'config/styles';
import colors from 'config/colors';
import { formatDate, getRepeatLabel } from 'lib/time';
import { isEventValid, isEventCancelled, getDuration, getStatus } from 'lib/parseItem';
import capitalizr, {decapitalize} from 'lib/capitalizr';
import { ONE_TIME_EVENT } from 'lib/constants';

const DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class EventDetails extends React.Component {
  _handleCancel = () => {
    const isRecurring = this.props.event.repeat !== ONE_TIME_EVENT;
    this.props.handleCancel(isRecurring ? this.props.event.startAt : null);
  };
  _getDuration = (start, end) => getDuration(start, end);
  _getStartAgo = (start, end) => {
    let timeAgo;
    if (moment().isBefore(moment(start))) {
      timeAgo = moment(start).fromNow(); 
    } else if (moment().isAfter(moment(end))) {
      timeAgo = moment(end).fromNow();
    } else {
      timeAgo = `${moment(end).fromNow(true)} left`;
    }
    return capitalizr(timeAgo);
  };
  
 shouldComponentUpdate = (nextProps) => !isEqual(nextProps.event, this.props.event);

  render() {
    const {
      event,
      refStartAt,
      refEndAt,
      handleBack,
      handleDelete,
      handleRepeat,
      handleEdit,
      navigateToBoard,
      navigateToComments,
      cardView
    } = this.props;
    const {
      id,
      title,
      eventType,
      venue,
      startAt,
      endAt,
      allDay,
      board,
      repeat,
      until,
      createdAt,
      updatedAt,
      description,
      isStarred,
      starsCount,
      commentsCount,
      isAuthor,
      isCancelled,
      cancelledDates
    } = event;
    const start = refStartAt || startAt;
    const end = refEndAt || endAt;

    const isValid = isEventValid({ isCancelled, endAt: end, startAt: start, cancelledDates });

    return (
      <>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.BackAction color={colors.gray} onPress={handleBack} />
          <Appbar.Content titleStyle={styles.headerColor} />
          {
            isAuthor && (
              <>
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
                    <>
                      <Appbar.Action
                        icon="mode-edit"
                        color={colors.gray}
                        onPress={() => handleEdit({
                          id,
                          refStartAt: start,
                          refEndAt: end
                        })}
                      />
                      <Appbar.Action
                        icon="close"
                        color={colors.gray}
                        onPress={this._handleCancel}
                      />
                    </>
                  )
                }
              </>
            )
          }
        </Appbar.Header>
        <Details
          id={id}
          title={title}
          date={formatDate(start, end, allDay)}
          duration={this._getDuration(start, end)}
          timeAgo={this._getStartAgo(start, end)}
          status={getStatus({
            isCancelled,
            cancelledDates,
            startAt: start,
            endAt: end
          })}
          startAt={start}
          eventType={decapitalize(eventType)}
          address={venue && venue.address}
          latitude={venue && venue.location && venue.location.latitude}
          longitude={venue && venue.location && venue.location.longitude}
          boardName={board.name}
          boardId={board.id}
          repeat={getRepeatLabel(repeat, start)}
          until={until && moment(until).format(DATE_FORMAT)}
          createdAt={moment(createdAt).format(DATE_FORMAT)}
          updatedAt={updatedAt && moment(updatedAt).format(DATE_FORMAT)}
          description={description}
          isStarred={isStarred}
          starsCount={starsCount}
          commentsCount={commentsCount}
          isAuthor={isAuthor}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates, isCancelled, startAt: start })}
          navigateToBoard={navigateToBoard}
          navigateToComments={navigateToComments}
          cardView={cardView}
        />
      </>
    )
  }
}