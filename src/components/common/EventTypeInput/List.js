import React from 'react';
import { FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Item from './Item';
import Alert from 'components/dialogs/Alert';

const ITEM_HEIGHT = 48;

class List extends React.Component {
  state = {
    id: null,
    showDeleteAlert: false,
  };

  _hideModal = () => this.setState({
    id: null,
    showDeleteAlert: false
  })

  _onLongPressItem = (id) => this.setState({
    id,
    showDeleteAlert: true
  });

  _onConfirm = () => {
    this.props.stores.appState.removeCustomType(this.state.id);
    this._hideModal();
   };

  _onPressItem = (id) => {
    this.props.onValueChange(id);
    this.props.hideModal();
  };
  
  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    }
  );

  _keyExtractor = (item) => item;
  
  _renderItem = ({ item }) => (
    <Item
      value={item}
      onLongPressItem={this._onLongPressItem}
      onPressItem={this._onPressItem}
      marked={item.toLowerCase() === this.props.selectedValue.toLowerCase()}
    />
  );

  render() {
    const { data } = this.props;
    return (
      <>
      <FlatList
        renderItem={this._renderItem}
        data={data}
        keyExtractor={this._keyExtractor}
        getItemLayout={this._getItemLayout}
      />
      <Alert
        visible={this.state.showDeleteAlert}
        title={I18n.get("ALERT_deleteType")}
        handleDismiss={this._hideModal}
        onConfirm={this._onConfirm}
      />
      </>
    )
  }
}

export default inject("stores")(observer(List));