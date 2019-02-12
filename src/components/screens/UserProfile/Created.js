import React, {Component} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import Item from '../../lists/Boards/Item';
import Separator from '../../lists/Boards/Separator';
import Empty from '../../lists/Boards/Empty';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import { createdBoards } from '../../../graphql/queries';
import client from '../../../config/client';
import colors from '../../../config/colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Boards extends Component{
  state = {
    loading: false,
    data: [],
  };

  _onPressItem = (id) => this.props.navigation.navigate('BoardEvents', { id });
  _navigateToInfo = (id) => this.props.navigation.navigate('BoardInfo', { id });
  _fetchBoards = async () => {
    const id = this.props.navigation.getParam('id');
    this.setState({ loading: true });
    try {
      const data = await client.query({
        query: gql(createdBoards),
        variables: {
          id
        }
      });
      const items = data.createdBoards && data.createdBoards.items || [];
      this.setState({ data: items });
    } catch (e) {
      SimpleToast.show('Connection error', SimpleToast.SHORT);
    }
    this.setState({ loading: false });
  };

  componentDidMount = async () => {
    await this._fetchBoards();
  }

  _onRefresh = () => this._fetchBoards();
  _keyExtractor = (item) => String(item.id);
  renderSeparator = () => <Separator />;
  _renderEmptyList = () => this.state.loading ? null : <Empty profile />;
  renderItem = ({item}) => {
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
    const { translateY, animatedY, onScroll } = this.props.collapsible;

    return (
      <AnimatedFlatList 
        style={styles.list}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        contentContainerStyle={{paddingTop: translateY}}

        refreshing={this.state.loading}
        data={data}
        onRefresh={this._onRefresh}
        ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this._renderEmptyList}

        onScroll={onScroll} 
        _mustAddThis={animatedY}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.light_gray
  }
});

export default withCollapsibleForTabChild(Boards);