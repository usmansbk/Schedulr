import React from 'react';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

export default inject('stores')(observer(
  ({
    loading,
    visible,
    handleDismiss,
    title,
    message,
    cancelText=I18n.get('BUTTON_dismiss'),
    confirmText=I18n.get('BUTTON_continue'),
    onConfirm,
    stores
  }) => (
    <Portal>
      <Dialog
        dismissable
        style={{backgroundColor: stores.themeStore.colors.bg, borderRadius: undefined }}
        visible={visible}
        onDismiss={handleDismiss}
      >
        <Dialog.Title>{title}</Dialog.Title>
        {
          !!message && (
            <Dialog.Content>
              <Paragraph>{message}</Paragraph>
            </Dialog.Content>
          )
        }
        <Dialog.Actions>
          <Button onPress={handleDismiss}>{cancelText}</Button>
          { onConfirm && <Button disabled={loading} loading={loading} onPress={onConfirm}>{confirmText}</Button> }
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
));
