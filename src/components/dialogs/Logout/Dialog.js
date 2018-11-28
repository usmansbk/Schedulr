import React from 'react';
import { AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Button,
  Paragraph,
  Dialog,
  Portal
} from 'react-native-paper';

const ConfirmDialog = ({
  visible,
  handleDismiss,
  loading,
  navigation,
}) => (
  <Portal>
    <Dialog
      dismissable={!loading}
      visible={visible}
      onDismiss={handleDismiss}
    >
      <Dialog.Title>Sign out?</Dialog.Title>
      <Dialog.Content>
        <Paragraph>Will clear data</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
        <Button loading={loading} disabled={loading} onPress={async () => {
          await AsyncStorage.clear();
          handleDismiss();
          navigation.navigate('Auth');
        }}>Continue</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default withNavigation(ConfirmDialog)