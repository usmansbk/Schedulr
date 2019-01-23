import React from 'react';
import {
  Button,
  Paragraph,
  Dialog,
  Portal
} from 'react-native-paper';

export default class DeleteEvent extends React.Component {
  state = {
    loading: false
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
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      visible,
      isSingle,
      handleDismiss
    } = this.props;

    const { loading } = this.state;

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
                <Paragraph>Will remove past and future events in this series</Paragraph>
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