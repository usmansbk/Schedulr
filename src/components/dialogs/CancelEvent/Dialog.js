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

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextState.checked !== this.state.checked ||
    nextProps.loading !== this.props.loading
  );

  _onContinue = () => {
    const { id, onConfirm, handleDismiss } = this.props;
    handleDismiss();
    onConfirm({ id, option: this.state.checked });
  }

  render() {
    const {
      visible,
      handleDismiss,
      loading,
    } = this.props;
    const { checked } = this.state;
    console.log('render');
    return (
      <View>
        <Portal>
          <Dialog
            dismissable={!loading}
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
              <Button disabled={loading} onPress={handleDismiss}>Dismiss</Button>
              <Button disabled={loading} loading={loading} onPress={this._onContinue}>Continue</Button>
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