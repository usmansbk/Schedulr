import React from 'react';
import {
  TouchableRipple,
  Text,
} from 'react-native-paper';
import Modal from './Modal';
import { inject, observer} from 'mobx-react';

class Button extends React.Component {
  render() {
    const {
      items,
      stores, 
      value,
      onValueChange,
      prompt
    } = this.props;

    const styles = stores.appStyles.picker;

    return (
      <Modal
        items={items}
        prompt={prompt}
        visible={this.state.showModal}
        onDismiss={this._hideModal}
        onValueChange={onValueChange}
        selectedValue={value}
      />
    )
  }
}

export default inject('stores')(observer(Button));