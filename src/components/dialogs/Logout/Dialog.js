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
    visible,
    handleDismiss,
    loading,
    handleLogout,
    stores
  }) => (
    <Portal>
      <Dialog
        style={{backgroundColor: stores.themeStore.colors.bg, borderRadius: undefined }}
        dismissable={!loading}
        visible={visible}
        onDismiss={handleDismiss}
      >
        <Dialog.Title>{I18n.get("SIGN_OUT_title")}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{I18n.get("SIGN_OUT_message")}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button disabled={loading} onPress={handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
          <Button loading={loading} disabled={loading} onPress={handleLogout}>{I18n.get("BUTTON_continue")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
));
