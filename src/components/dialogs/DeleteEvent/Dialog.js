import React from 'react';
import {
  Button,
  Dialog,
  Portal,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n, Storage } from 'aws-amplify';

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
    } = this.props;
    this.setState({ loading: true });
    try {
      if (banner) await Storage.remove(banner.key).catch();
    } catch (error) {
      console.error(error);
    }
    onSubmit && onSubmit({ id });
    this.props.navigation.pop();
    this.setState({ loading: false });
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