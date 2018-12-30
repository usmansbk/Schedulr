import React from 'react';
import moment from 'moment';
import { Appbar } from 'react-native-paper';
import Details from './Details';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles from '../../../config/styles';
import colors from '../../../config/colors';
import { formatDate, getNextDate } from '../../../lib/time';
import {decapitalize} from '../../../lib/capitalizr';

const CREATED_DATE_FORMAT = "ddd DD, MMM YYYY, hh:mm a";

export default class EventDetails extends React.Component {
  _getRepeatDate = () => {
    const {
      startAt,
      repeat,
      endAt
    } = this.props.event;
    if (repeat === 'NEVER') return '';
    return moment(getNextDate(startAt, repeat, startAt, endAt)).format(CREATED_DATE_FORMAT)
  };
  _isValid = (isCancelled, endAt) => (!isCancelled) && (Date.now() < Date.parse(endAt));

  render() {
    const {
      event,
      error,
      loading,
      onRefresh,
      handleBack,
      handleDelete,
      handleRepeat,
      handleEdit,
      handleCancel,
      navigateToBoard,
      navigateToComments,
    } = this.props;
    console.log(event);
    if (loading && !event) return <Loading />;
    console.log(error);
    if (error && !event) return <Error onRefresh={onRefresh} />;
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
      isCancelled
    } = event;
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
          isStarred={isStarred}
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