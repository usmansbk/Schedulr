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
        <Dialog.Title>Delete event?</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Will remove past and future events in this series</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button onPress={handleDismiss}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  </View>
)