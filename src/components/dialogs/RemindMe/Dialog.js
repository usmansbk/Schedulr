import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  List,
  Switch
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class RemindMe extends React.Component {
  static defaultProps = {
    stores: {
      remindMeBefore: {
        fiveMin: false,
        tenMin: false,
        fifteenMin: false,
        thirtyMin: false,
        oneHour: false,
        oneDay: false,
      }
    }
  };

  _toggle = async (key) => {
    await this.props.stores.remindMeStore.toggle(key);
  }

  render() {
    const {
      stores,
      visible,
      hideDialog,
    } = this.props;

    const {
      fiveMin,
      tenMin,
      fifteenMin,
      thirtyMin,
      oneHour,
      oneDay,
    } = stores.remindMeStore;

    const { colors } = stores.themeStore;

    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={hideDialog}
          style={{backgroundColor: colors.bg}}
        >
          <Dialog.Title>{I18n.get("REMIND_ME_title")}</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title={I18n.get("REMIND_ME_five")}
              right={() => (
                <Switch
                  value={fiveMin}
                  onValueChange={() => this._toggle('fiveMin')}
                />
              )}
            />
            <List.Item
              title={I18n.get("REMIND_ME_ten")}
              right={() => (
                <Switch
                  value={tenMin}
                  onValueChange={() => this._toggle('tenMin')}
                />
              )}
            />
            <List.Item
              title={I18n.get("REMIND_ME_fifteen")}
              right={() => (
                <Switch
                  value={fifteenMin}
                  onValueChange={() => this._toggle('fifteenMin')}
                />
              )}
            />
            <List.Item
              title={I18n.get("REMIND_ME_thirty")}
              right={() => (
                <Switch
                  value={thirtyMin}
                  onValueChange={() => this._toggle('thirtyMin')}
                />
              )}
            />
            <List.Item
              title={I18n.get("REMIND_ME_oneHour")}
              right={() => (
                <Switch
                  value={oneHour}
                  onValueChange={() => this._toggle('oneHour')}
                />
              )}
            />
            <List.Item
              title={I18n.get("REMIND_ME_oneDay")}
              right={() => (
                <Switch
                  value={oneDay}
                  onValueChange={() => this._toggle('oneDay')}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{I18n.get("BUTTON_done")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

export default inject("stores")(observer(RemindMe));