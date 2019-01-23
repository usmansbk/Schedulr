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
            <RadioButton.Group  
              value={checked}
              onValueChange={checked => this.setState({ checked })}
            >
              <List.Item
                title="Change only this event"
                right={() => <RadioButton value="single" />}
              />
              <List.Item
                title="Change all of this event"
                right={() => <RadioButton value="all" />}
              />
            </RadioButton.Group>
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
