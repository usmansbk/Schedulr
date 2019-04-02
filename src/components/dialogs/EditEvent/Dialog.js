import React from 'react';
import {
  Button,
  Dialog,
  Portal,
} from 'react-native-paper';
import colors from 'config/colors';

export default class EditEvent extends React.Component {
  _onContinue = () => {
    const { id, onConfirm, handleDismiss, refStartAt, refEndAt } = this.props;
    handleDismiss();
    onConfirm({ id, option: this.state.checked, refEndAt, refStartAt });
  }

  render() {
    const {
      visible,
      handleDismiss,
    } = this.props;

    return (
      <Portal>
        <Dialog
          dismissable
          visible={visible}
          onDismiss={handleDismiss}
          style={{backgroundColor: colors.bg}}
        >
          <Dialog.Title>Edit event?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={handleDismiss}>Dismiss</Button>
            <Button onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}
