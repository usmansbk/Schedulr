import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class DeleteComment extends React.Component {
  state = {
    loading: false
  };

  _onDelete = () => {
    this.setState({ loading: true });
    this.props.onSubmit();
    this.setState({ loading: false });
    this.props.stores.appState.removeKeysFromStorage(this.props.attachment);
    this.props.handleDismiss();
  };
  
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
          <Dialog.Title>{I18n.get("DIALOG_deleteComment")}</Dialog.Title>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button loading={loading} disabled={loading} onPress={this._onDelete}>{I18n.get("BUTTON_continue")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default inject("stores")(observer(DeleteComment));