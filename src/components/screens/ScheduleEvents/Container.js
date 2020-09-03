import React from 'react';
import {inject, observer} from 'mobx-react';
import {Appbar} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import Icon from 'components/common/Icon';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import List from 'components/lists/Bookmarks';
import Suspense from 'components/common/Suspense';

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

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
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

    const {id, name, description, eventsCount} = schedule;

    const styles = stores.styles.appStyles;
    const colors = stores.theme.colors;

    const eventsLength = events ? events.length : 0;

    const pastEventsCount = eventsCount - eventsLength;

    return (
      <>
        <Appbar style={styles.header} collapsable>
          <Appbar.Action
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
        </Appbar>
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
      </>
    );
  }
}

export default inject('stores')(observer(ScheduleEvents));
