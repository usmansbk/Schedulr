import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  List,
} from 'react-native-paper';

export default class EditEvent extends React.Component {
  state = {
    checked: 'single',
  };

  _onContinue = () => {
    const { id, onConfirm, handleDismiss } = this.props;
    handleDismiss();
    onConfirm({ id, option: this.state.checked });
  }

  render() {
    const {
      visible,
      handleDismiss,
    } = this.props;
    const { checked } = this.state;
    return (
      <Portal>
        <Dialog
          dismissable
          visible={visible}
          onDismiss={handleDismiss}
        >
          <Dialog.Title>Edit event?</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Change only this event"
              right={() => (
                <RadioButton
                  value="single"
                  status={ checked === 'single' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'single'})}
                />
              )}
            />
            <List.Item
              title="Change all of this event"
              right={() => (
                <RadioButton
                  value="all"
                  status={ checked === 'all' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'all'})}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDismiss}>Dismiss</Button>
            <Button onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}
