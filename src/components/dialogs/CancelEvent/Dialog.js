import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  List
} from 'react-native-paper';

export default class CancelEvent extends React.Component {
  state = {
    checked: 'SINGLE',
    loading: false
  };

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading
  );

  _onContinue = async () => {
    const {
      id,
      onSubmit,
      handleDismiss
    } = this.props;
    this.setState({ loading: true });
    try {
      await onSubmit({
        id,
        option: this.state.checked
      });
      handleDismiss();
    } catch (error) {
      this.setState({ loading: false });
    }
    // onConfirm({ id, option: this.state.checked });
  }

  render() {
    const {
      visible,
      handleDismiss
    } = this.props;
    const { checked, loading } = this.state;
    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleDismiss}
        >
          <Dialog.Title>Cancel event?</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Cancel only this event"
              right={() => (
                <RadioButton
                  value="SINGLE"
                  status={ checked === 'SINGLE' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'SINGLE'})}
                />
              )}
            />
            <List.Item
              title="Cancel all events"
              right={() => (
                <RadioButton
                  value="ALL"
                  status={ checked === 'ALL' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'ALL'})}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button disabled={loading} loading={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}