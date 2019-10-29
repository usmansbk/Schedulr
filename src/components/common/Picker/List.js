import React from 'react';
import { FlatList } from 'react-native';
import PickerItem from './Item';
import { inject, observer } from 'mobx-react';

const ITEM_HEIGHT = 48;

class List extends React.Component {
	_renderItem = ({
		item: {
			label,
			value,	
		}
	}) => <PickerItem
		value={label}
		marked={value === this.props.selectedValue}
	/>;

	_getItemLayout = (_, index) => (
		{
		  length: ITEM_HEIGHT,
		  offset: ITEM_HEIGHT * index,
		  index
		}
	);

	_keyExtractor = (item) => item.key;

	render() {
		return (
			<FlatList
				getItemLayout={this._getItemLayout}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				data={this.props.data}
			/>
		);
	}
}

export default inject("stores")(observer(List));