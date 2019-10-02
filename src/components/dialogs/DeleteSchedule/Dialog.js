import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class DeleteSchedule extends React.Component {
  state = {
    loading: false
  };
  
  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextState.loading !== this.state.loading
  );

  _onContinue = () => {
    const {
      id,
      onSubmit,
    } = this.props;
    this.setState({ loading: true });
    onSubmit && onSubmit({ id });
    this.props.navigation.popToTop();
    this.setState({ loading: false });
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
          onDismiss={handleDismiss}
          style={{backgroundColor: stores.themeStore.colors.bg}}
        >
          <Dialog.Title>{I18n.get("DIALOG_deleteSchedule")}</Dialog.Title>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button loading={loading} disabled={loading} onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(DeleteSchedule));