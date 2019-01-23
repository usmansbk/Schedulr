import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  List
} from 'react-native-paper';

export default class DeleteEvent extends React.Component {
  state = {
    loading: false,
    checked: 'single',
  };
  
  shouldComponentUpdate = (nextProps, nextState) => (
    nextState.checked !== this.state.checked ||
    nextProps.visible !== this.props.visible ||
    nextState.loading !== this.state.loading
  );

  _onContinue = async () => {
    const {
      id,
      onSubmit,
    } = this.props;
    this.setState({ loading: true });
    try {
      await onSubmit({
        id
      });
      this.props.navigation.popToTop();
    } catch (error) {
      // alert(error.message);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      visible,
      isSingle,
      handleDismiss
    } = this.props;

    const { loading, checked } = this.state;

    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleDismiss}
        >
          <Dialog.Title>Delete event?</Dialog.Title>
          {
            !isSingle && (
              <Dialog.Content>
                <RadioButton.Group
                  value={checked}
                  onValueChange={checked => this.setState({ checked })}
                >
                  <List.Item
                    title="Delete only this event"
                    right={() => <RadioButton value="single" />}
                  />
                  <List.Item
                    title="Delete all of this event"
                    right={() => <RadioButton value="all" />}
                  />
                </RadioButton.Group>
              </Dialog.Content>
            )
          }
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button loading={loading} disabled={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}