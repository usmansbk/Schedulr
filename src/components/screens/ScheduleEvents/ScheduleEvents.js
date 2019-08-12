import React from 'react';
import { Appbar } from 'react-native-paper';
import { sortBookmarks } from 'lib/utils';
import { getEvents } from 'lib/calendr';
import Icon from 'react-native-vector-icons/Feather';
import List from 'components/lists/ScheduleEvents';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

export default class ScheduleEvents extends React.Component {

  get events() {
    const { schedule } = this.props;
    if (!schedule) return [];
    const { events } = schedule;
    return sortBookmarks(getEvents(events.items));
  }

  render() {
    const {
      schedule,
      error,
      loading,
      onPress,
      onRefresh,
      fetchPastEvents,
      stores,
      id
    } = this.props;

    if (loading && !schedule) return <Loading />;
    if (!schedule && error) return <Error onRefresh={onRefresh} />;

    console.log(schedule);
    const {
      name,
      description
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

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
        </Appbar>
        <List
          listType="schedule"
          events={this.events}
          loading={loading}
          error={error}
          onRefresh={onRefresh}
          fetchPastEvents={fetchPastEvents}
        />
      </>
    );
  }
}