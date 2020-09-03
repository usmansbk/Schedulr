import React from 'react';
import {FlatList} from 'react-native';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import {ALL_FILTER, chips} from 'lib/constants';
import Item from './Item';

const {ITEM_HEIGHT} = chips;

class List extends React.Component {
  static defaultProps = {
    data: [],
  };

  _getItemLayout = (_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  _onPressItem = (id) => this.props.stores.appState.toggleFilter(id);

  _renderItem = ({item}) => (
    <Item
      id={item}
      text={item === ALL_FILTER ? I18n.get('All') : item}
      onPress={this._onPressItem}
      selected={this.props.stores.appState.isToggled(item)}
    />
  );

  _keyExtractor = (item, index) => item + index;

  render() {
    const {stores, data} = this.props;
    return (
      <FlatList
        horizontal
        contentContainerStyle={stores.styles.chipList.container}
        data={[ALL_FILTER, ...data]}
        renderItem={this._renderItem}
        initialNumToRender={5}
        keyExtractor={this._keyExtractor}
        showsHorizontalScrollIndicator={false}
        extraData={stores.appState.discoverFilter}
        getItemLayout={this._getItemLayout}
        keyboardShouldPersistTaps="always"
      />
    );
  }
}

export default inject('stores')(observer(List));
