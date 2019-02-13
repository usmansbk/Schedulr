import React, {Component} from 'react';
import { Animated } from 'react-native';
import { FlatList } from 'react-navigation';
import { withCollapsibleForTabChild } from 'react-navigation-collapsible';
import Item from '../../lists/Boards/Item';
import Separator from '../../lists/Boards/Separator';
import styles, {
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT
} from '../../lists/Boards/styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FollowingBoards extends Component{

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
  _renderFooter = () => <Footer visible={this.props.boards.length} />;
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
        data={data}
        renderItem={this._renderItem}

        onScroll={onScroll} 
        _mustAddThis={animatedY}
        
        getItemLayout={this._getItemLayout}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmptyList}
      />
    )
  }
}
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

export default withCollapsibleForTabChild(FollowingBoards);