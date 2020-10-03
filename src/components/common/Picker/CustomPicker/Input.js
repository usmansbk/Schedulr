import React from 'react';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import Picker from '../Picker';
import TextInput from '../../TextInput';

const customValue = '__custom__type__schdlr__mobile__';

class Input extends React.Component {
  state = {
    custom: false,
  };

  _onValueChange = (value) => {
    if (value === customValue) {
      this.setState({custom: true});
    } else {
      this.props.onValueChange(value);
    }
  };

  _onAddCustomType = () => {
    this.props.stores.appState.addCustomType(this.props.value);
    this.setState({custom: false});
  };

  render() {
    const {
      value,
      icon,
      disabled,
      onValueChange,
      onLongPressItem,
      onBlur,
      data = [],
    } = this.props;
    const customType = I18n.get('SELECT_customType');

    const items = [{value: customValue, label: customType}].concat(
      data.map((value) => ({value, label: value})),
    );

    return this.state.custom ? (
      <TextInput
        placeholder={I18n.get('PLACEHOLDER_customType')}
        value={value}
        editable={!disabled}
        maxLength={51}
        leftIcon={icon}
        onBlur={onBlur}
        onChangeText={onValueChange}
        clearButtonMode="while-editing"
        autoFocus={this.state.custom}
        rightIcon="pluscircleo"
        onPressRightIcon={this._onAddCustomType}
      />
    ) : (
      <Picker
        icon={icon}
        value={value}
        items={items}
        prompt={value}
        disabled={disabled}
        onValueChange={this._onValueChange}
        onLongPressItem={onLongPressItem}
      />
    );
  }
}

export default inject('stores')(observer(Input));
