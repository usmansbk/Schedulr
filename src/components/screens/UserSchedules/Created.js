import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Loading from 'components/common/Loading';
import ErrorScreen from 'components/common/Error';
import Item from 'components/lists/ScheduleSearch/Item';
import Separator from 'components/lists/Schedules/Separator';
import Footer from 'components/lists/Schedules/Footer';
import Empty from 'components/lists/Schedules/Empty';
import sortSchedules from 'lib/utils';
import { schedules } from 'lib/constants';
// import { createdSchedules as createdSchedulesQuery, listAllSchedules } from 'mygraphql/queries';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = schedules;

const alias = 'withUserSchedules';

class CreatedSchedules extends Component{
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id, cacheFirst) => this.props.navigation.push('Schedule', { id, cacheFirst });
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
        isClosed={status === 'CLOSED'}
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
      error,
      onRefresh,
      data,
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

const withStores = inject("stores")(observer(CreatedSchedules));
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
//         data.listAllSchedules.items.filter(item => item.isOwner) || []
//       ),
//     }),
//   }),
//   graphql(gql(createdSchedulesQuery), {
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
//         data && data.createdSchedules &&
//         data.createdSchedules.createdSchedules &&
//         data.createdSchedules.createdSchedules.items || []
//       ),
//       onRefresh: () => data.refetch(),
//       ...ownProps
//     })
//   })
// )(withStores);