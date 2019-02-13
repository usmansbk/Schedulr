import React from 'react';
import { Appbar } from 'react-native-paper';
import List from '../../lists/Events';
import Fab from '../../common/Fab';
import Loading from '../../common/Loading';
import Error from '../../common/Error';
import styles from '../../../config/styles';
import colors from '../../../config/colors';
import { BOARD_CLOSED } from '../../../lib/constants';

export default class BoardEvents extends React.Component {
  static defaultProps = {
    events: []
  };

  render() {
    const {
      board,
      events,
      error,
      loading,
      loadingEvents,
      onPress,
      onRefresh,
      navigateToBoardInfo,
      navigateToNewEvent
    } = this.props;
    if (error) alert(error.message);
    if (loading) return <Loading />;
    if (!board) return <Error onRefresh={onRefresh} />;

    const {
      id,
      name,
      description,
      isAuthor,
      status
    } = board;

    return (
      <React.Fragment>
        <Appbar.Header style={styles.elevatedHeader} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={onPress} />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon="info-outline"
            onPress={() => navigateToBoardInfo(id)}
            color={colors.gray}
          />
        </Appbar.Header>
        <List
          listType="board"
          events={events}
          loading={loadingEvents}
        />
        {
          isAuthor && (status !== BOARD_CLOSED ) && (
            <Fab
              icon="edit"
              onPress={() => navigateToNewEvent(id)}
            />
          )
        }
      </React.Fragment>
    );
  }
}