import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  Caption
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import logger from 'config/logger';

class DeleteEvent extends React.Component {
  state = {
    loading: false,
  };
  
  shouldComponentUpdate = (nextProps, nextState) => (
    nextState.checked !== this.state.checked ||
    nextProps.visible !== this.props.visible ||
    nextState.loading !== this.state.loading
  );

  _onContinue = async () => {
    const {
      id,
      banner,
      onSubmit,
      handleDismiss,
      stores
    } = this.props;
    this.setState({ loading: true });
    if (banner) {
      stores.appState.removeKeysFromStorage([banner.key])
    }
    handleDismiss();
    this.setState({ loading: false });
    setTimeout(() => {
      onSubmit && onSubmit({ id });
    }, 0);
    this.props.navigation.goBack();
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
          onDismiss={handleDismiss}
          style={{backgroundColor: stores.themeStore.colors.bg}}
        >
          <Dialog.Title>{I18n.get("DIALOG_deleteEvent")}</Dialog.Title>
          <Dialog.Content>
            <Caption>{I18n.get("DIALOG_deleteEventWarning")}</Caption>
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button loading={loading} disabled={loading} onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(DeleteEvent));