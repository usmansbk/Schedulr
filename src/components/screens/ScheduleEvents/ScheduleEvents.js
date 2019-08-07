import React from 'react';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import List from 'components/lists/ScheduleEvents';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';

class ScheduleEvents extends React.Component {
  static defaultProps = {
    events: []
  };

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
      fetchPastEvents,
      stores
    } = this.props;
    if (loading) return <Loading />;
    if (!schedule && error) return <Error onRefresh={onRefresh} />;

    const {
      name,
      description,
    } = schedule;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

    return (
      <>
        <Appbar style={styles.elevatedHeader} collapsable>
          <Appbar.Action
            color={colors.gray}
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
          events={events}
          loading={loadingEvents}
          error={loadingEventsError}
          onRefresh={onRefresh}
          fetchPastEvents={fetchPastEvents}
        />
      </>
    );
  }
}

export default inject("stores")(observer(ScheduleEvents));