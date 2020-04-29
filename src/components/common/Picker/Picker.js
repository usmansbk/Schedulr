import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import PickerItem from './Item';
import { CustomPicker } from 'react-native-custom-picker';
import { inject, observer} from 'mobx-react';

class Button extends React.Component {
  
	_renderOption = ({ item: {
		label,
		value,	
  }}) => <PickerItem
		key={value}
		value={value}
		label={label}
		marked={value === this.props.value}
  />;
  
  _renderField = ({ selectedItem, defaultText }) => {

    const styles = this.props.stores.appStyles.picker;

    let label;
    if (selectedItem) {
      label = selectedItem.label;
    } else {
      const targetItem = this.props.items.find(item => item.value === this.props.value);
      label = !!targetItem ? targetItem.label : defaultText;
    }
    
    return (
      <View style={styles.button}>
        <Text>{label}</Text>
      </View>
    );
  };

  _onValueChange = item => {
    if (item.value === this.props.default) {
      this.props.onValueChange('');
    } else {
      this.props.onValueChange(item.value);
    }
    setTimeout(() => {
      if (this.props.runAfterChange) {
        this.props.runAfterChange(item.value);
      }
    }, 0)
  };

  render() {
    const {
      items,
      stores, 
      prompt,
      disabled
    } = this.props;

    const styles = stores.appStyles.picker;
    return (
      <CustomPicker
        placeholder={prompt}
        options={items}
        getLabel={item => item.label}
        optionTemplate={this._renderOption}
        fieldTemplate={this._renderField}
        onValueChange={this._onValueChange}
        modalStyle={styles.contentContainer}
        disabled={disabled}
      />
    );
  }
}

export default inject('stores')(observer(Button));