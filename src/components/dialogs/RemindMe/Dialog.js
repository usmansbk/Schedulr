import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  List,
  Switch
} from 'react-native-paper';
import colors from '../../../config/colors';

export default class RemindMe extends React.Component {
  static defaultProps = {
    remindMeBefore: {
      fiveMin: false,
      tenMin: false,
      fifteenMin: false,
      thirtyMin: false,
      oneHour: false,
      oneDay: false,
    }
  };

  _toggle = async (key) => {
    await this.props.toggleRemindMe(key);
  }

  render() {
    const {
      remindMeBefore,
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
    } = remindMeBefore;

    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={hideDialog}
          style={{backgroundColor: colors.bg}}
        >
          <Dialog.Title>Remind me</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="5 minutes before"
              right={() => (
                <Switch
                  value={fiveMin}
                  onValueChange={() => this._toggle('fiveMin')}
                />
              )}
            />
            <List.Item
              title="10 minutes before"
              right={() => (
                <Switch
                  value={tenMin}
                  onValueChange={() => this._toggle('tenMin')}
                />
              )}
            />
            <List.Item
              title="15 minutes before"
              right={() => (
                <Switch
                  value={fifteenMin}
                  onValueChange={() => this._toggle('fifteenMin')}
                />
              )}
            />
            <List.Item
              title="30 minutes before"
              right={() => (
                <Switch
                  value={thirtyMin}
                  onValueChange={() => this._toggle('thirtyMin')}
                />
              )}
            />
            <List.Item
              title="1 hour before"
              right={() => (
                <Switch
                  value={oneHour}
                  onValueChange={() => this._toggle('oneHour')}
                />
              )}
            />
            <List.Item
              title="1 day before"
              right={() => (
                <Switch
                  value={oneDay}
                  onValueChange={() => this._toggle('oneDay')}
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}
