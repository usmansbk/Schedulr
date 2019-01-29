import React from 'react';
import moment from 'moment';
import isEqual from 'lodash.isequal';
import { Appbar } from 'react-native-paper';
import Details from './Details';
import styles from '../../../config/styles';
import colors from '../../../config/colors';
import { formatDate } from '../../../lib/time';
import { isEventValid, isEventCancelled, getDuration } from '../../../lib/parseItem';
import capitalizr, {decapitalize} from '../../../lib/capitalizr';
import { ONE_TIME_EVENT, ONE_TIME_EVENT_TEXT } from '../../../lib/constants';

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class EventDetails extends React.Component {
  _handleCancel = () => {
    const isRecurring = this.props.event.repeat !== ONE_TIME_EVENT;
    this.props.handleCancel(isRecurring ? this.props.event.startAt : null);
  };
  _getDuration = (end, start) => getDuration(start, end);
  _getStartAgo = (start) => capitalizr(moment(start).fromNow());
  
 shouldComponentUpdate = (nextProps) => !isEqual(nextProps.event, this.props.event);

  render() {
    const {
      event,
      handleBack,
      handleDelete,
      handleRepeat,
      handleEdit,
      navigateToBoard,
      navigateToComments,
    } = this.props;
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
      isStarred,
      starsCount,
      commentsCount,
      isAuthor,
      isCancelled,
      cancelledDates
    } = event;
    const isValid = isEventValid({ isCancelled, endAt, startAt, cancelledDates });
    const recurring = repeat !== ONE_TIME_EVENT;

    return (
      <React.Fragment>
        <Appbar.Header style={styles.header}  collapsable>
          <Appbar.BackAction color={colors.gray} onPress={handleBack} />
          <Appbar.Content titleStyle={styles.headerColor} />
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
                        onPress={this._handleCancel}
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
          duration={this._getDuration(endAt, startAt)}
          startAgo={this._getStartAgo(startAt)}
          eventType={decapitalize(eventType)}
          address={location && location.address}
          latitude={location && location.latitude}
          longitude={location && location.longitude}
          boardName={board.name}
          boardId={board.id}
          repeat={!recurring ? ONE_TIME_EVENT_TEXT : decapitalize(repeat)}
          createdAt={moment(createdAt).format(CREATED_DATE_FORMAT)}
          updatedAt={updatedAt && moment(updatedAt).format(CREATED_DATE_FORMAT)}
          description={description}
          isStarred={isStarred}
          starsCount={starsCount}
          commentsCount={commentsCount}
          isAuthor={isAuthor}
          isValid={isValid}
          isCancelled={isEventCancelled({ cancelledDates, isCancelled, startAt })}
          navigateToBoard={navigateToBoard}
          navigateToComments={navigateToComments}
        />
      </React.Fragment>
    )
  }
}