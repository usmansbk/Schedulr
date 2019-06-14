import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { Divider } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Item from './Item';

@inject('stores')
@observer
export default class Input extends React.Component {
  state = {
    query: '',
    hideResults: true
  };

  _onBlur = () => this.setState({ hideResults: true });
  _onFocus = () => this.setState({ hideResults: false });

  _keyExtractor = (item) => item.id;
  _onChangeText = text => this.setState({ query: text });
  _filterData = (query) => this.props.data.filter(item => item.id.toLowerCase().includes(query.toLowerCase()));
  _onPressItem = (id) => this.props.onValueChange(id);
  _renderItem = ({ item }) => (
    <Item
      value={item.name}
      id={item.id}
      onPressItem={this._onPressItem}
    />
  );
  _renderSeparator = () => <Divider />

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.props.value) {
      this.setState({
        query: nextProps.value
      });
    }
  }

  render() {
    const { query, hideResults } = this.state;
    const data = this._filterData(query);

    return (
      <Autocomplete
        data={data}
        value={query}
        placeholder="Event type"
        onChangeText={this._onChangeText}
        renderItem={this._renderItem}
        renderSeparator={this._renderSeparator}
        keyExtractor={this._keyExtractor}
        hideResults={hideResults}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
    );
  }
}