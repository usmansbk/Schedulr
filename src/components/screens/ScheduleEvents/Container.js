import React from 'react';
import uuidv5 from 'uuid/v5';
import {inject, observer} from 'mobx-react';
import {Appbar} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import List from 'components/lists/Bookmarks';
import Suspense from 'components/common/Suspense';
import Fab from 'components/common/Fab';
import {SCHEDULE_CLOSED} from 'lib/constants';
import FollowButton from 'components/common/FollowButton';

class ScheduleEvents extends React.Component {
  state = {
    display: false,
  };

  _onBack = () => this.props.navigation.goBack();
  _onRefresh = () => this.props.onRefresh && this.props.onListRefresh();
  _fetchPastEvents = (nextToken) => {
    const first = this.props.events[0];
    const before = first && first.startAt;
    this.props.fetchMore && this.props.fetchMore(nextToken, before);
  };
  _navigateToNewEvent = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('NewEvent', {
      eventScheduleId: id,
      locked: true,
    });
  };

  _navigateToScheduleInfo = () => {
    const id = this.props.schedule.id;
    this.props.navigation.navigate('ScheduleInfo', {id});
  };

  componentDidMount = () => {
    this.timer = setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    if (!this.state.display) return <Suspense />;
    const {
      events,
      schedule,
      error,
      loading,
      listLoading,
      onRefresh,
      listError,
      stores,
      navigation,
    } = this.props;

    if (loading && !schedule) return <Loading loading={loading} />;
    if (!schedule && error)
      return <Error onRefresh={onRefresh} loading={loading} />;
    if (!schedule)
      return (
        <Error
          notFound
          message={I18n.get('ERROR_404')}
          caption={I18n.get('ERROR_404_caption')}
        />
      );

    const {
      id,
      name,
      description,
      eventsCount,
      status,
      isOwner,
      isFollowing,
    } = schedule;

    const styles = stores.styles.appStyles;
    const colors = stores.theme.colors;

    const eventsLength = events ? events.length : 0;

    const pastEventsCount = eventsCount - eventsLength;

    return (
      <>
        <Appbar.Header style={styles.header} collapsable>
          <Appbar.Action
            animated={false}
            onPress={this._onBack}
            size={24}
            color={colors.primary}
            icon={({size, color}) => (
              <Icon name="arrow-left" color={color} size={size} />
            )}
          />
          <Appbar.Content
            title={name}
            subtitle={description}
            titleStyle={styles.headerColor}
          />
          <Appbar.Action
            animated={false}
            size={24}
            color={colors.primary}
            icon={({size, color}) => (
              <Icon name="info" size={size} color={color} />
            )}
            onPress={this._navigateToScheduleInfo}
          />
        </Appbar.Header>
        <List
          id={id}
          listType="schedule"
          events={events}
          eventsCount={eventsCount}
          pastEventsCount={pastEventsCount}
          loading={listLoading}
          error={listError}
          onRefresh={this._onRefresh}
          fetchPastEvents={this._fetchPastEvents}
          navigation={navigation}
        />
        {!(Boolean(error) && this.events.length) && isOwner && (
          <Fab
            disabled={status === SCHEDULE_CLOSED}
            icon="plus"
            onPress={this._navigateToNewEvent}
          />
        )}
      </>
    );
  }
}

export default inject('stores')(observer(ScheduleEvents));
