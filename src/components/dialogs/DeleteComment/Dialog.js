import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class DeleteComment extends React.Component {
  state = {
    loading: false
  }

  _onDelete = () => {
    this.setState({ loading: true });
    this.props.onDelete();
    this.setState({ loading: false });
    this.props.handleDismiss();
  }
  
  render() {
    const {
      visible,
      handleDismiss,
      stores
    } = this.props;
    const { loading } = this.state;

    return (
      <Portal>
        <Dialog
          visible={visible}
          style={{backgroundColor: stores.themeStore.colors.bg}}
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
