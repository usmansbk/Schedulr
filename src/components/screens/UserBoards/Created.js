import React, {Component} from 'react';
import gql from 'graphql-tag';
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
import client from '../../../config/client';
import sortBoards from '../../../lib/utils';
import { createdBoards as createdBoardsQuery } from '../../../graphql/queries';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class CreatedBoards extends Component{
  state = {
    loading: false,
    data: [],
  };

  _fetchBoards = async () => {
    this.setState({ loading: true });
    try {
      const { data: { createdBoards } } = await client.query({
        query: gql(createdBoardsQuery),
        variables: {
          id: this.props.navigation.getParam('id')
        }
      });
      const items = createdBoards && createdBoards.createdBoards &&  createdBoards.createdBoards.items || [];
      this.setState({
        data: items,
        loading: false
      });
    } catch(e) {
      SimpleToast.show('Connection error', SimpleToast.SHORT);
      this.setState({ loading: false });
    }
  };

  componentDidMount = async () => {
    await this._fetchBoards();
  };

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
  _renderFooter = () => <Footer visible={this.state.data.length} />;
  _renderEmptyList = () => this.state.loading ? null : <Empty profile />;
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
        data={sortBoards(this.state.data)}
        refreshing={this.state.loading}
        onRefresh={this._fetchBoards}
        renderItem={this._renderItem}
        extraData={this.state.data.length}
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

export default withCollapsibleForTabChild(CreatedBoards);