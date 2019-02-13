import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Animated } from 'react-native';
import { FlatList } from 'react-navigation';
import SimpleToast from 'react-native-simple-toast';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import Item from '../../lists/Boards/Item';
import Separator from '../../lists/Boards/Separator';
import Footer from '../../lists/Boards/Footer';
import Empty from '../../lists/Boards/Empty';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} from '../../lists/Boards/styles';
import sortBoards from '../../../lib/utils';
import { createdBoards as createdBoardsQuery } from '../../../graphql/queries';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class CreatedBoards extends Component{
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  );
  _onPressItem = (id) => this.props.navigation.navigate('BoardEvents', { id });
  _navigateToInfo = (id) => this.props.navigation.navigate('BoardInfo', { id });
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
    } = item;

    return (
      <Item
        id={id}
        name={name}
        description={description}
        isPublic={isPublic}
        isClosed={status === 'CLOSED'}
        isAuthor={isAuthor}
        onPressItem={this._onPressItem}
        navigateToBoardInfo={this._navigateToInfo}
      />
    )
  }

  render(){
    const { animatedY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList 
        style={styles.list}
        data={sortBoards(this.props.data)}
        refreshing={this.props.loading}
        onRefresh={this.props.onRefresh}
        extraData={this.props.data.length}

        onScroll={onScroll} 
        _mustAddThis={animatedY}
        
        renderItem={this._renderItem}
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
  graphql(gql(createdBoardsQuery), {
    options: props => ({
      variables: {
        id: props.navigation.getParam('id')
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    }),
    props: ({ data, ownProps }) => ({
      loading: data.loading || data.networkStatus === 4,
      data: data && data.createdBoards && data.createdBoards.createdBoards &&  data.createdBoards.createdBoards.items || [],
      onRefresh: async () => {
        try {
          await data.refetch();
        } catch(e) {
          SimpleToast.show('Connection error: ' + e.message, SimpleToast.SHORT);
        }
      },
      ...ownProps
    })
  })
)(CreatedBoards);