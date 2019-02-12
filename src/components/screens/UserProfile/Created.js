import React, {Component} from 'react';
import { Animated, StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import SimpleToast from 'react-native-simple-toast';
import Item from '../../lists/Boards/Item';
import Separator from '../../lists/Boards/Separator';
import Empty from '../../lists/Boards/Empty';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import { createdBoards } from '../../../graphql/queries';
import colors from '../../../config/colors';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Boards extends Component{
  state = {
    loading: false,
    data: [],
  };

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

const data = [
  {
    id: 1,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 2,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 3,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 4,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 5,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 6,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 7,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 8,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 11,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 12,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 13,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 14,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
  {
    id: 15,
    name: 'Lorem',
    description: '',
    createdAt: new Date().toISOString(),
    isPublic: false,
    isAuthor: false
  },
]

export default withCollapsibleForTabChild(Boards);