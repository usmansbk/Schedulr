import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import PickerItem from './Item';
import {CustomPicker} from 'react-native-custom-picker';
import Icon from '../Icon';
import {inject, observer} from 'mobx-react';

class Button extends React.Component {
  _renderOption = ({item: {label, value}}) => (
    <PickerItem
      onLongPress={this.props.onLongPressItem}
      key={value}
      value={value}
      label={label}
      marked={value === this.props.value}
    />
  );

  _renderField = ({selectedItem, defaultText}) => {
    const styles = this.props.stores.styles.picker;

    let label;
    if (selectedItem) {
      label = selectedItem.label;
    } else {
      const targetItem = this.props.items.find(
        (item) => item.value === this.props.value,
      );
      label = !!targetItem ? targetItem.label : defaultText;
    }

    return (
      <View style={styles.button}>
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            size={24}
            color={this.props.stores.theme.colors.tint}
            style={styles.icon}
          />
        )}
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  };

  _onValueChange = (item) => {
    if (item.value === this.props.default) {
      this.props.onValueChange('');
    } else {
      this.props.onValueChange(item.value);
    }
    this.timer = setTimeout(() => {
      if (this.props.onItemChange) {
        this.props.onItemChange(item.value);
      }
    }, 0);
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    const {items, stores, prompt, disabled} = this.props;

    const styles = stores.styles.picker;
    return (
      <CustomPicker
        placeholder={prompt}
        options={items}
        getLabel={(item) => item.label}
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
