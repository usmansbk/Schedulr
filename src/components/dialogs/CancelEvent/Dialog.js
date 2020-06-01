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
      stores,
      banner,
      navigation,
      cancelEvent,
      deleteEvent,
      cancelledDates,
    } = this.props;
    const { checked } = this.state;
    if ((checked === SINGLE_EVENT) && date) {
      const input = {
        id,
        cancelledDates : Array.from(new Set([
          ...cancelledDates,
          date
        ]))
      };
      setTimeout(() => cancelEvent(input), 200);
    } else {
      const input = {id};
      if (banner) {
        stores.appState.removeKeysFromStorage([banner.key])
      }
      setTimeout(() => deleteEvent(input), 200);
      navigation.goBack();
    }
    this._handleDismiss();
  };

  _handleDismiss = () => this.confirmRef.close();

  _toggleButton = checked => this.setState({ checked });

  render() {
    const {
      date,
      stores,
      cancelledDates,
    } = this.props;
    const { checked } = this.state;
    const styles = stores.appStyles.sheet;
    const isCancelled = cancelledDates.includes(date);

    return (
      <RBSheet
        ref={this._confirmRef}
        height={350}
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
            Boolean(date) ? (
              <View style={styles.body}>
                <RadioButton.Group onValueChange={this._toggleButton} value={checked}>
                  <View style={styles.row}>
                    <Text style={styles.message}>{I18n.get("DIALOG_onlyThisEvent")}</Text>
                    <RadioButton value={SINGLE_EVENT} />
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.message}>{I18n.get("DIALOG_allOfThisEvent")}</Text>
                    <RadioButton value={ALL_EVENTS} />
                  </View>
                </RadioButton.Group>
              </View>
            ) : (
              <Text style={styles.message}>{I18n.get("DIALOG_cancelWarning")}</Text>
            )
          }
          <View style={styles.footer}>
            <Button onPress={this._handleDismiss}>{I18n.get("BUTTON_dismiss")}</Button>
            <Button danger onPress={this._onContinue}>{I18n.get("BUTTON_continue")}</Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}

export default inject("stores")(observer(CancelEvent));