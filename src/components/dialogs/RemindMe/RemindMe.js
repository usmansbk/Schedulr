import React from 'react';
import {} from 'react-native';
import {
  Button,
  Dialog,
  Portal
} from 'react-native-paper';

export default ({
  visible,
  hideDialog
}) => (
  <Portal>
    <Dialog
      visible={visible}
      dismissable
      onDismiss={hideDialog}
    >
      <Dialog.Title>Remind me</Dialog.Title>
      <Dialog.Content>

      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);
