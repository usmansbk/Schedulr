import React, {Component} from 'react';
import { RefreshControl } from 'react-native';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Loading from 'components/common/Loading';
import Item from 'components/lists/ScheduleSearch/Item';
import Separator from 'components/lists/Schedules/Separator';
import Footer from 'components/lists/Schedules/Footer';
import Empty from 'components/lists/Schedules/Empty';
import { sortSchedules } from 'lib/utils';
import { schedules } from 'lib/constants';
import { getUserSchedules } from 'api/queries';
import getImageUrl from 'helpers/getImageUrl';
import { SCHEDULE_CLOSED } from 'lib/constants';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedules;

const alias = 'withUserSchedules';

class CreatedSchedules extends Component{

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("PROFILE_createdLabel")
    };
  }

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.push('Schedule', { id });
  _navigateToInfo = (id) => this.props.navigation.push('ScheduleInfo', { id });
  _keyExtractor = (item) => String(item.id);
  _renderSeparator = () => <Separator />;
  _renderFooter = () => <Footer visible={this.props.schedules.length} />;
  _renderEmptyList = () => this.props.loading ? null : <Empty
    profile
    error={this.props.error}
    loading={this.props.loading}
    onRefresh={this.props.onRefresh}
  />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
      isPublic,
      status,
      isOwner,
      isFollowing,
      picture
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        pictureUrl={picture && getImageUrl(picture)}
        isPublic={isPublic}
        isClosed={status === SCHEDULE_CLOSED}
        isOwner={isOwner}
        isFollowing={isFollowing}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
      />
    )
  }

  render(){
    const {
      loading,
      onRefresh,
      schedules,
      stores
    } = this.props;

    if (loading && !schedules.length) return <Loading />;

    const styles = stores.appStyles.schedulesList;

    return (
      <FlatList 
        style={styles.list}
        data={sortSchedules(schedules)}
        renderItem={this._renderItem}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        keyboardShouldPersistTaps="always"
        refreshing={loading}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[stores.themeStore.colors.primary]}
            progressBackgroundColor={stores.themeStore.colors.bg}
          />
        }
      />
    )
  }
}

export default inject('stores')(observer(
  compose(
    graphql(gql(getUserSchedules), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-first',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.navigation.getParam('id')
        }
      }),
      props: ({ data, ownProps }) => ({
        loading: data.loading || data.networkStatus === 4,
        error: data.error,
        onRefresh: () => data.refetch(),
        schedules: (data && data.getUserSchedules &&
          data.getUserSchedules.created && data.getUserSchedules.created.items) || [],
        ...ownProps
      }),
    }),
  )(CreatedSchedules)
));