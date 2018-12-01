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
    checked: 'single',
  };

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextState.checked !== this.state.checked ||
    nextProps.loading !== this.props.loading
  );

  _onContinue = () => {
    const { id, onConfirm, handleDismiss } = this.props;
    handleDismiss();
    onConfirm({ id, option: this.state.checked });
  }

  render() {
    const {
      visible,
      handleDismiss,
      loading,
    } = this.props;
    const { checked } = this.state;
    return (
      <Portal>
        <Dialog
          dismissable={!loading}
          visible={visible}
          onDismiss={handleDismiss}
        >
          <Dialog.Title>Cancel event?</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Cancel only this event"
              right={() => (
                <RadioButton
                  value="single"
                  status={ checked === 'single' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'single'})}
                />
              )}
            />
            <List.Item
              title="Cancel all events"
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
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button disabled={loading} loading={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}