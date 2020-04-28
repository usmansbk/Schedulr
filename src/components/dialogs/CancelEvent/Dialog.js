import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text
} from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import { SINGLE_EVENT, ALL_EVENTS } from 'lib/constants';

class CancelEvent extends React.Component {
  state = {
    checked: SINGLE_EVENT,
    loading: false,
  };

  shouldComponentUpdate = (nextProps, nextState) => (
    nextProps.visible !== this.props.visible ||
    nextProps.date !== this.props.date ||
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading
  );

  _onContinue = () => {
    const {
      id,
      date,
      onSubmit,
      cancelledDates,
      handleDismiss,
    } = this.props;
    this.setState({ loading: true });
    const input = {id};
    const { checked } = this.state;
    if ((checked === ALL_EVENTS) || !date) {
      input.isCancelled = true;
      input.cancelledDates = null;
    } else {
      input.cancelledDates = Array.from(new Set([
        ...cancelledDates,
        date
      ]));
    }
    setTimeout(() => {
      onSubmit(input);
    }, 0);
    handleDismiss();
    this.setState({ loading: false });
  };

  _handleDismiss = () => this.props.handleDismiss();

  _toggleButton = checked => this.setState({ checked });

  render() {
    const {
      date,
      visible,
      stores
    } = this.props;
    const { checked, loading } = this.state;
    return (
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={this._handleDismiss}
          style={{backgroundColor: stores.themeStore.colors.bg}}
        >
          <Dialog.Title>{I18n.get("DIALOG_cancelEvent")}</Dialog.Title>
          {
            Boolean(date) && (
              <Dialog.Content>
                <RadioButton.Group onValueChange={this._toggleButton} value={checked}>
                  <View style={styles.row}>
                    <Text>{I18n.get("DIALOG_onlyThisEvent")}</Text>
                    <RadioButton value={SINGLE_EVENT} />
                  </View>
                  <View style={styles.row}>
                    <Text>{I18n.get("DIALOG_allOfThisEvent")}</Text>
                    <RadioButton value={ALL_EVENTS} />
                  </View>
                </RadioButton.Group>
              </Dialog.Content>
            )
          }
          <Dialog.Actions>
            <Button disabled={loading} onPress={this._handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button disabled={loading} loading={loading} onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16
  }
});

export default inject("stores")(observer(CancelEvent));