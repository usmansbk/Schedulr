import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text
} from 'react-native-paper';

export default class CancelEvent extends React.Component {
  state = {
    checked: 'single',
  };

  render() {
    const {
      visible,
      handleDismiss,
      onConfirm
    } = this.props;
    const { checked } = this.state;
    return (
      <View>
        <Portal>
          <Dialog
            dismissable
            visible={visible}
            onDismiss={handleDismiss}
          >
            <Dialog.Title>Cancel event?</Dialog.Title>
            <Dialog.Content>
              <View style={styles.radioButton}>
                <Text>Cancel only this event</Text>
                <RadioButton
                  value="single"
                  status={ checked === 'single' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'single'})}
                />
              </View>
              <View style={styles.radioButton}>
                <Text>Cancel all events</Text>
                <RadioButton
                  value="all"
                  status={ checked === 'all' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: 'all'})}
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDismiss}>Dismiss</Button>
              <Button onPress={handleDismiss}>Continue</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  }
})