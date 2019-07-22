import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import Loading from 'components/common/Loading';
import ErrorScreen from 'components/common/Error';
import Item from 'components/lists/BoardSearch/Item';
import Separator from 'components/lists/Boards/Separator';
import Footer from 'components/lists/Boards/Footer';
import Empty from 'components/lists/Boards/Empty';
import sortBoards from 'lib/utils';
import { boards } from 'lib/constants';
import { followingBoards as followingBoardsQuery, listAllBoards } from 'mygraphql/queries';

const {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} = boards;

const alias = 'withFollowingBoards';

@inject('stores')
@observer
class FollowingBoards extends Component{
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id, cacheFirst) => this.props.navigation.push('Board', { id, cacheFirst });
  _navigateToInfo = (id) => this.props.navigation.push('BoardInfo', { id });
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
      isAuthor,
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
        isAuthor={isAuthor}
        onPressItem={this._onPressItem}
        navigateToBoardInfo={this._navigateToInfo}
      />
    )
  }

  componentWillMount = () => {
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

    if (loading && !data) return <Loading />;
    if (error && !data) return <ErrorScreen loading={loading} onRefresh={onRefresh} />;

    const styles = stores.appStyles.boardsList;

    return (
      <FlatList 
        style={styles.list}
        data={sortBoards(data)}
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

export default compose(
  graphql(gql(listAllBoards), {
    alias,
    skip: props => !props.navigation.getParam('myProfile'),
    options: {
      fetchPolicy: 'cache-only'
    },
    props: ({ data }) => ({
      loading: data.loading,
      error: data.error,
      data: (
        data && data.listAllBoards &&
        data.listAllBoards.items &&
        data.listAllBoards.items.filter(item => item.isFollowing) || []
      ),
    }),
  }),
  graphql(gql(followingBoardsQuery), {
    alias,
    skip: props => props.navigation.getParam('myProfile'),
    options: props => ({
      variables: {
        id: props.navigation.getParam('id')
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      error: data.error,
      data: (
        data && data.followingBoards &&
        data.followingBoards.followingBoards &&
        data.followingBoards.followingBoards.items || []
      ),
      onRefresh: () =>  data.refetch(),
      ...ownProps
    })
  })
)(FollowingBoards);