import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {inject, observer} from 'mobx-react';
import Item from './Item';
import Empty from './Empty';
import getImageUrl from 'helpers/getImageUrl';

const ITEM_HEIGHT = 150;

class List extends React.Component {
  _onPress = (key) => {
    if (this.props.selected.length) {
      this.props.onLongPress(key);
    } else {
      this.props.onPress(key);
    }
  };

  _onLongPress = (key) => this.props.onLongPress(key);

  _keyExtractor = (item) => item.key;

  _getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });
  _renderEmpty = () => <Empty />;
  _renderItem = ({item}) => {
    const uri = getImageUrl(item, 320);
    const source = {uri};
    const selected = this.props.selected.includes(item.key);
    return (
      <Item
        selected={selected}
        source={source}
        style={{
          width: 150,
          height: 150,
        }}
        s3Key={item.key}
        onLongPress={this._onLongPress}
        onPress={this._onPress}
        color={this.props.color}
      />
    );
  };

  render() {
    const {images = [], stores, onRefresh, loading} = this.props;
    return (
      <FlatList
        contentContainerStyle={{
          flex: 1,
          backgroundColor: stores.theme.colors.bg,
          paddingHorizontal: 5,
        }}
        data={images}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={loading}
            colors={[stores.theme.colors.primary]}
            progressBackgroundColor={stores.theme.colors.bg}
          />
        }
        horizontal={false}
        numColumns={2}
        renderItem={this._renderItem}
        getItemLayout={this._getItemLayout}
        initialNumToRender={1}
        extraData={this.props.selected.length}
        keyExtractor={this._keyExtractor}
        ListEmptyComponent={this._renderEmpty}
      />
    );
  }
}

export default inject('stores')(observer(List));
