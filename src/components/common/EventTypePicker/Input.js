import React from 'react';
import { TextInput } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Picker from 'components/common/Picker';

const customValue = "__custom__event__type__schdlr__mobile__";
const customType = I18n.get("SELECT_customType");

class Input extends React.Component {

  state = {
    custom: false
  };

  _onValueChange = (value) => {
    if (value === customValue) {
      this.setState({ custom: true });
    } else {
      this.props.onValueChange(value);
    }
  };

  render() {
    const {
      value,
      stores,
      disabled,
      onValueChange,
      onBlur
    } = this.props;

    const items = [
      {value: customValue, label: customType } 
    ].concat(stores.appState.categories.map(value => ({ value, label: value})));

    return (
      this.state.custom ? (
        <TextInput
          theme={{
            roundness: 0
          }}
          dense
          style={{
            marginTop: 8,
            backgroundColor: stores.themeStore.colors.textInput
          }}
          underlineColor="transparent"
          placeholder={I18n.get('PLACEHOLDER_customType')}
          value={value}
          editable={!disabled}
          maxLength={51}
          onBlur={onBlur}
          onChangeText={onValueChange}
          clearButtonMode="while-editing"
          autoFocus={this.state.custom}
        />
      ) : (
      <Picker
        value={value}
        items={items}
        prompt={value || I18n.get('PLACEHOLDER_normal')}
        disabled={disabled}
        onValueChange={this._onValueChange}
      />
      )
    );
  }
}

export default inject("stores")(observer(Input));