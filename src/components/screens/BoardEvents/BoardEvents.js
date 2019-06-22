import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { BOARD_CLOSED } from 'lib/constants';

const ABOUT_HALF = 600;

@inject('stores')
@observer
export default class BoardEvents extends React.Component {
  state = {
    offsetY: 0
  }

  static defaultProps = {
    events: []
  };

  _onScroll = (offsetY) => {
    this.setState({ offsetY });
  }

  shouldComponentUpdate = (nextProps) => nextProps.isFocused;

  _eventsListRef = ref => this.eventsListRef = ref;

  _scrollToTop = () => {
    this.eventsListRef && this.eventsListRef.wrappedInstance.scrollToTop(); 
  };
  
  _navigateToBoardInfo = () => {
    const id = this.props.board.id;
    this.props.navigation.navigate('BoardInfo', { id });
  }
  _navigateToNewEvent = () => {
    const boardId = this.props.board.id;
    this.props.navigation.navigate('NewEvent', { boardId });
  }

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
      stores
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

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const isOffline = id[0] === '-';

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
            icon="info-outline"
            onPress={this._navigateToBoardInfo}
            color={colors.gray}
          />
        </Appbar.Header>
        <List
          ref={this._eventsListRef}
          listType="board"
          events={events}
          navigation={this.props.navigation}
          loading={loadingEvents}
          error={loadingEventsError}
          handleScroll={this._onScroll}
        />
        {
          Boolean(this.state.offsetY > ABOUT_HALF) && (
            <Fab
              icon="keyboard-arrow-up"
              secondary
              onPress={this._scrollToTop}
            />
          )
        }
        {
          !isOffline && isAuthor && (status !== BOARD_CLOSED ) && (
            <Fab
              icon="edit"
              onPress={this._navigateToNewEvent}
            />
          )
        }
      </>
    );
  }
}