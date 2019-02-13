import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Animated } from 'react-native';
import { FlatList } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import Loading from '../../common/Loading';
import ErrorScreen from '../../common/Error';
import Item from '../../lists/BoardSearch/Item';
import Separator from '../../lists/Boards/Separator';
import Footer from '../../lists/Boards/Footer';
import Empty from '../../lists/Boards/Empty';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} from '../../lists/Boards/styles';
import sortBoards from '../../../lib/utils';
import { followingBoards as followingBoardsQuery } from '../../../graphql/queries';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FollowingBoards extends Component{
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.push('BoardEvents', { id });
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

  render(){
    const { animatedY, onScroll } = this.props.collapsible;
    const {
      loading,
      onRefresh,
      data,
      error
    } = this.props;

    if (loading && !data.length) return <Loading />;
    if (error && !data.length) return <ErrorScreen loading={loading} onRefresh={onRefresh} />;

    return (
      <AnimatedFlatList 
        style={styles.list}
        data={sortBoards(data)}
        extraData={data.length}
        renderItem={this._renderItem}

        onScroll={onScroll} 
        _mustAddThis={animatedY}
        
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={5}
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
}

export default compose(
  withCollapsibleForTabChild,
  graphql(gql(followingBoardsQuery), {
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
      data: data && data.followingBoards && data.followingBoards.followingBoards &&  data.followingBoards.followingBoards.items || [],
      onRefresh: async () => {
        try {
          await data.refetch();
        } catch(e) {
          SimpleToast.show('Connection error', SimpleToast.SHORT);
        }
      },
      ...ownProps
    })
  })
)(FollowingBoards);