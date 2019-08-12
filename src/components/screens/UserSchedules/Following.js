import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Loading from 'components/common/Loading';
import ErrorScreen from 'components/common/Error';
import Item from 'components/lists/ScheduleSearch/Item';
import Separator from 'components/lists/Schedules/Separator';
import Footer from 'components/lists/Schedules/Footer';
import Empty from 'components/lists/Schedules/Empty';
import sortSchedules from 'lib/utils';
import { schedules } from 'lib/constants';
// import { followingSchedules as followingSchedulesQuery, listAllSchedules } from 'api/queries';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedules;

const alias = 'withFollowingSchedules';

class FollowingSchedules extends Component{
  static defaultProps = {
    data: []
  };
  
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
  _renderFooter = () => <Footer visible={this.props.data.length} />;
  _renderEmptyList = () => this.props.loading ? null : <Empty profile />;
  _renderItem = ({item}) => {
    const {
      id,
      name,
      description,
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
        isPublic={isPublic}
        isFollowing={isFollowing}
        isClosed={status === 'CLOSED'}
        isOwner={isOwner}
        onPressItem={this._onPressItem}
        navigateToScheduleInfo={this._navigateToInfo}
      />
    )
  }

  componentDidMount = () => {
    if (this.props.navigation.getParam('toCreatedTab')) {
      this.props.navigation.navigate('Created')
    }
  }

  render(){
    const {
      loading,
      onRefresh,
      data,
      error,
      stores
    } = this.props;

    if (loading && !data.length) return <Loading />;
    if (error && !data.length) {
      return <ErrorScreen loading={loading} onRefresh={onRefresh} />;
    }

    const styles = stores.appStyles.schedulesList;

    return (
      <FlatList 
        style={styles.list}
        data={sortSchedules(data)}
        renderItem={this._renderItem}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={7}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
        keyboardShouldPersistTaps="always"
      />
    )
  }
}

const withStores = inject("stores")(observer(FollowingSchedules));
export default withStores;
// export default compose(
//   graphql(gql(listAllSchedules), {
//     alias,
//     skip: props => !props.navigation.getParam('myProfile'),
//     options: {
//       fetchPolicy: 'cache-only'
//     },
//     props: ({ data }) => ({
//       loading: data.loading,
//       error: data.error,
//       data: (
//         data && data.listAllSchedules &&
//         data.listAllSchedules.items &&
//         data.listAllSchedules.items.filter(item => item.isFollowing) || []
//       ),
//     }),
//   }),
//   graphql(gql(followingSchedulesQuery), {
//     alias,
//     skip: props => props.navigation.getParam('myProfile'),
//     options: props => ({
//       variables: {
//         id: props.navigation.getParam('id')
//       },
//       fetchPolicy: 'cache-and-network',
//       notifyOnNetworkStatusChange: true,
//     }),
//     props: ({ data, ownProps }) => ({
//       loading: data.loading || data.networkStatus === 4,
//       error: data.error,
//       data: (
//         data && data.followingSchedules &&
//         data.followingSchedules.followingSchedules &&
//         data.followingSchedules.followingSchedules.items || []
//       ),
//       onRefresh: () =>  data.refetch(),
//       ...ownProps
//     })
//   })
// )(withStores);