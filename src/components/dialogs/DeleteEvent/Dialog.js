import React from 'react';
import {
  Button,
  Paragraph,
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
                <List.Item
                  title="Delete only this event"
                  right={() => (
                    <RadioButton
                      value="single"
                      status={ checked === 'single' ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: 'single'})}
                    />
                  )}
                />
                <List.Item
                  title="Delete all of this event"
                  right={() => (
                    <RadioButton
                      value="all"
                      status={ checked === 'all' ? 'checked' : 'unchecked'}
                      onPress={() => this.setState({ checked: 'all'})}
                    />
                  )}
                />
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