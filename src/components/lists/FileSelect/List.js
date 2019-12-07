import React from 'react';
import { FlatList, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Item from './Item';

const ITEM_HEIGHT = 60;

class FileSelect extends React.Component {

  static defaultProps = {
    data: []
  };
  
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }
  );

  _renderItem = ({ item }) => {
    return (
      <Item
        name={item.name}
        uri={item.uri}
        onPress={this.props.onPressItem}
      />
    );
  };

  _keyExtractor = (item) => item.uri;

  render() {
    const { stores, onCancel } = this.props;
    return (
      <View style={stores.appStyles.fileSelect.view}>
        <FlatList
          horizontal
          contentContainerStyle={stores.appStyles.fileSelect.container}
          data={this.props.data}
          getItemLayout={this._getItemLayout}
          renderItem={this._renderItem}
          initialNumToRender={4}
          keyExtractor={this._keyExtractor}
          showsHorizontalScrollIndicator={false}
        />
        <IconButton
          onPress={onCancel}
          color={stores.themeStore.colors.gray}
          icon={({ size, color }) => <Icon
            color={color}
            size={size}
            name="x"
          />}
        />
      </View>
    );
  }
}

export default inject("stores")(observer(FileSelect));