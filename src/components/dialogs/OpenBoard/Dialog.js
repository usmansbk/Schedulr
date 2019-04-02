import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';
import colors from 'config/colors';

export default class OpenBoard extends React.Component {
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
      handleDismiss
    } = this.props;
    this.setState({ loading: true });
    try {
      onSubmit({ id });
      handleDismiss();
    } catch (error) {
      this.setState({ loading: false });
    }
    // onConfirm({ id, option: this.state.checked });
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
          style={{backgroundColor: colors.bg}}
        >
          <Dialog.Title>Open board?</Dialog.Title>
          <Dialog.Actions>
            <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
            <Button loading={loading} disabled={loading} onPress={this._onContinue}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}