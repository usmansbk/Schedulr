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
import { SCHEDULE_CLOSED } from 'lib/constants';
import getImageUrl from 'helpers/getImageUrl';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedules;

class FollowingSchedules extends Component{

  static navigationOptions() {
    return {
      tabBarLabel: I18n.get("PROFILE_followingLabel")
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
  _renderFooter = () => <Footer visible={this.props.following.length} />;
  _renderEmptyList = () => <Empty
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
      picture,
      isPublic,
      status,
      isOwner,
      isFollowing
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        pictureUrl={picture && getImageUrl(picture)}
        isPublic={isPublic}
        isFollowing={isFollowing}
        isClosed={status === SCHEDULE_CLOSED}
        isOwner={isOwner}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
      />
    )
  };

  componentDidMount = () => {
    if (this.props.navigation.getParam('toCreatedTab')) {
      this.props.navigation.navigate('Created')
    }
  };

  get data() {
    const following = this.props.following;
    if (!following) return [];
    return following.map(follow => follow.schedule).filter(schedule => Boolean(schedule));
  }

  render(){
    const {
      loading,
      onRefresh,
      stores
    } = this.props;

    const styles = stores.appStyles.schedulesList;

    return (
      <FlatList 
        style={styles.list}
        data={sortSchedules(this.data)}
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

const alias = 'withFollowingSchedules';

export default inject("stores")(observer(
  compose(
    graphql(gql(getUserSchedules), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
        variables: {
          id: props.navigation.getParam('id'),
          limit: 50,
        }
      }),
      props: ({ data, ownProps }) => ({
        loading: data.loading || data.networkStatus === 4,
        error: data.error,
        onRefresh: () => data.refetch(),
        following: (data && data.getUserSchedules &&
          data.getUserSchedules.following && data.getUserSchedules.following.items) || [],
        ...ownProps
      }),
    }),
  )(FollowingSchedules)
));