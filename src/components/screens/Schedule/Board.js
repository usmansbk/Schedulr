import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import { BOARD_CLOSED } from 'lib/constants';

const ABOUT_HALF = 600;

class Schedule extends React.Component {
  state = {
    offsetY: 0
  }

  static defaultProps = {
    events: []
  };

  _onScroll = (offsetY) => {
    this.setState({ offsetY });
  }

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _eventsListRef = ref => this.eventsListRef = ref;

  _scrollToTop = () => {
    this.eventsListRef && this.eventsListRef.scrollToTop();
  };
  
  _navigateToScheduleInfo = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('ScheduleInfo', { id });
  }
  _navigateToNewEvent = () => {
    const scheduleId = this.props.schedule.id;
    this.props.navigation.navigate('NewEvent', { scheduleId });
  }

  render() {
    const {
      schedule,
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
    if (!schedule && error) return <Error onRefresh={onRefresh} />;

    const {
      id,
      name,
      description,
      isAuthor,
      status
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const isOffline = id[0] === '-';

    return (
      <>
        <Appbar style={styles.elevatedHeader} collapsable>
          <Appbar.BackAction color={colors.gray} onPress={onPress} />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon="info-outline"
            onPress={this._navigateToScheduleInfo}
            color={colors.gray}
          />
        </Appbar>
        <List
          ref={this._eventsListRef}
          listType="schedule"
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
          !(Boolean(error) && events.length) && !isOffline && isAuthor && (status !== BOARD_CLOSED ) && (
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

export default inject("stores")(observer(Schedule));