import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text, RadioButton } from 'react-native-paper';
import { I18n } from 'aws-amplify';
import { SINGLE_EVENT, ALL_EVENTS } from 'lib/constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from 'components/common/Button';

class CancelEvent extends React.Component {
  state = {
    checked: SINGLE_EVENT,
    loading: false,
  };

  _confirmRef = ref => this.confirmRef = ref;
  open = () => this.confirmRef.open();

  shouldComponentUpdate = (nextProps, nextState) => (
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
      // snackbar(I18n.get("EVENT_cancelling"));
      onSubmit(input);
    }, 200);
    this.setState({ loading: false });
    this._handleDismiss();
  };

  _handleDismiss = () => this.confirmRef.close();

  _toggleButton = checked => this.setState({ checked });

  render() {
    const {
      date,
      stores
    } = this.props;
    const { checked, loading } = this.state;
    const styles = stores.appStyles.sheet;

    return (
      <RBSheet
        ref={this._confirmRef}
        closeOnDragDown
        customStyles={{
          container: styles.container
        }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{I18n.get("DIALOG_cancelEvent")}</Text>
          </View>
          {
            Boolean(date) && (
              <View style={styles.body}>
                <RadioButton.Group onValueChange={this._toggleButton} value={checked}>
                  <View style={styles.row}>
                    <Text style={styles.boldMessage}>{I18n.get("DIALOG_onlyThisEvent")}</Text>
                    <RadioButton value={SINGLE_EVENT} />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.boldMessage}>{I18n.get("DIALOG_allOfThisEvent")}</Text>
                    <RadioButton value={ALL_EVENTS} />
                  </View>
                </RadioButton.Group>
              </View>
            )
          }
          <View style={styles.footer}>
            <Button disabled={loading} onPress={this._handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button danger disabled={loading} loading={loading} onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}

export default inject("stores")(observer(CancelEvent));