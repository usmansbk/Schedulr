import React from 'react';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';

export default ({
  visible,
  handleDismiss,
  loading,
  onConfirm
}) => (
  <Portal>
    <Dialog
      dismissable={!loading}
      visible={visible}
      onDismiss={handleDismiss}
    >
      <Dialog.Title>Close board?</Dialog.Title>
      <Dialog.Actions>
        <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
        <Button loading={loading} disabled={loading} onPress={handleDismiss}>Continue</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
)