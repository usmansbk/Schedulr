import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal
} from 'react-native-paper';

export default ({
  visible,
  handleDismiss,
  onConfirm
}) => (
  <View>
    <Portal>
      <Dialog
        dismissable
        visible={visible}
        onDismiss={handleDismiss}
      >
        <Dialog.Title>Select an option</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
)