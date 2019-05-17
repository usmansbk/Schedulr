import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';
import { inject, observer } from 'mobx-react/native';

@inject('stores')
@observer
export default class DeleteBoard extends React.Component {
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
    try {
      onSubmit({
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
          <Dialog.Title>Delete calendar?</Dialog.Title>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button loading={loading} disabled={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}