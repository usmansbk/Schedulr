import React from 'react';
import {
  Button,
  Dialog,
  Portal,
  List,
  Switch
} from 'react-native-paper';

export default class RemindMe extends React.Component {
  static defaultProps = {
    remindMeBefore: {
      fiveMin: true,
      tenMin: false,
      fifteenMin: false,
      thirtyMin: false,
      fortyfiveMin: false,
      oneHour: true,
      oneDay: false,
    }
  };

  render() {
    const {
      remindMeBefore,
      visible,
      hideDialog,
      handleValueChange,
    } = this.props;

    const {
      fiveMin,
      tenMin,
      fifteenMin,
      thirtyMin,
      fortyfiveMin,
      oneHour,
      oneDay,
    } = remindMeBefore;

    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={hideDialog}
        >
          <Dialog.Title>Remind me</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="5 minutes before"
              right={() => (
                <Switch
                  value={fiveMin}
                  onValueChange={() => handleValueChange('fiveMin')}
                />
              )}
            />
            <List.Item
              title="10 minutes before"
              right={() => (
                <Switch
                  value={tenMin}
                  onValueChange={() => handleValueChange('tenMin')}
                />
              )}
            />
            <List.Item
              title="15 minutes before"
              right={() => (
                <Switch
                  value={fifteenMin}
                  onValueChange={() => handleValueChange('fifteenMin')}
                />
              )}
            />
            <List.Item
              title="30 minutes before"
              right={() => (
                <Switch
                  value={thirtyMin}
                  onValueChange={() => handleValueChange('thirtyMin')}
                />
              )}
            />
            <List.Item
              title="45 minutes before"
              right={() => (
                <Switch
                  value={fortyfiveMin}
                  onValueChange={() => handleValueChange('fortyfiveMin')}
                />
              )}
            />
            <List.Item
              title="1 hour before"
              right={() => (
                <Switch
                  value={oneHour}
                  onValueChange={() => handleValueChange('oneHour')}
                />
              )}
            />
            <List.Item
              title="1 day before"
              right={() => (
                <Switch
                  value={oneDay}
                  onValueChange={() => handleValueChange('oneDay')}
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
