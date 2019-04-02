import React from 'react';
import { Appbar } from 'react-native-paper';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import styles from 'config/styles';
import colors from 'config/colors';
import { BOARD_CLOSED } from 'lib/constants';

export default class BoardEvents extends React.Component {
  static defaultProps = {
    events: []
  };

  constructor(props) {
    super(props);
    this.eventsList = React.createRef();
  }

  _scrollToTop = () => {
    this.eventsList.current.scrollToTop();
  };

  render() {
    const {
      board,
      events,
      error,
      loading,
      loadingEvents,
      loadingEventsError,
      onPress,
      onRefresh,
      navigateToBoardInfo,
      navigateToNewEvent
    } = this.props;
    if (loading) return <Loading />;
    if (!board && error) return <Error onRefresh={onRefresh} />;

    const {
      id,
      name,
      description,
      isAuthor,
      status
    } = board;

    return (
      <>
        <Appbar.Header style={styles.elevatedHeader} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={onPress} />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon="event-note"
            onPress={this._scrollToTop}
            color={colors.gray}
          />
          <Appbar.Action
            icon="info-outline"
            onPress={() => navigateToBoardInfo(id)}
            color={colors.gray}
          />
        </Appbar.Header>
        <List
          ref={this.eventsList}
          listType="board"
          events={events}
          navigation={this.props.navigation}
          loading={loadingEvents}
          error={loadingEventsError}
        />
        {
          isAuthor && (status !== BOARD_CLOSED ) && (
            <Fab
              icon="edit"
              onPress={() => navigateToNewEvent(id)}
            />
          )
        }
      </>
    );
  }
}