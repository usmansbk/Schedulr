import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import List from 'components/lists/Events';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

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
  };

  shouldComponentUpdate = (nextProps) => nextProps.navigation.isFocused();

  _eventsListRef = ref => this.eventsListRef = ref;

  _scrollToTop = () => {
    this.eventsListRef && this.eventsListRef.scrollToTop();
  };
  
  _navigateToScheduleInfo = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('ScheduleInfo', { id });
  };
  _navigateToNewEvent = () => {
    const scheduleId = this.props.schedule.id;
    this.props.navigation.navigate('NewEvent', { scheduleId });
  };

  render() {
    const {
      schedule,
      error,
      loading,
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
      isOwner,
      status,
      events,
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    const isOffline = id[0] === '-';

    return (
      <>
        <Appbar style={styles.elevatedHeader} collapsable>
          <Appbar.Action
            onPress={onPress}
            icon={() => <Icon
              name="arrow-left"
              color={colors.gray}
              size={24}
            />}
          />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            icon={() => <Icon
              name="info"
              size={24}
              color={colors.gray}
            />}
            onPress={this._navigateToScheduleInfo}
          />
        </Appbar>
        <List
          ref={this._eventsListRef}
          listType="schedule"
          events={events.items}
          navigation={this.props.navigation}
          loading={loadingEvents}
          error={loadingEventsError}
          handleScroll={this._onScroll}
        />
        {
          Boolean(this.state.offsetY > ABOUT_HALF) && (
            <Fab
              icon="chevron-up"
              secondary
              onPress={this._scrollToTop}
            />
          )
        }
        {
          !(Boolean(error) && this.events.length) && !isOffline && isOwner && (status !== 'CLOSED' ) && (
            <Fab
              icon="edit-2"
              onPress={this._navigateToNewEvent}
            />
          )
        }
      </>
    );
  }
}

export default inject("stores")(observer(Schedule));