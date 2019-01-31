import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';

export default class DeleteComment extends React.Component {
  state = {
    loading: false
  }

  _onDelete = async () => {
    this.setState({ loading: true });
    await this.props.onDelete();
    this.setState({ loading: false });
    this.props.handleDismiss();
  }
  
  render() {
    const {
      visible,
      handleDismiss,
    } = this.props;
    const { loading } = this.state;

    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={handleDismiss}
        >
          <Dialog.Title>Delete comment?</Dialog.Title>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button loading={loading} disabled={loading} onPress={this._onDelete}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}
