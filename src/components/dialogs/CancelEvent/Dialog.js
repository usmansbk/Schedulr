import React from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Text} from 'react-native-paper';
import {I18n} from 'aws-amplify';
import {SINGLE_EVENT, ALL_EVENTS} from 'lib/constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from 'components/common/Button';
import RadioButton from 'components/common/RadioButton';

class CancelEvent extends React.Component {
  state = {
    checked: SINGLE_EVENT,
  };

  _confirmRef = (ref) => (this.confirmRef = ref);
  open = () => this.confirmRef.open();

  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.date !== this.props.date ||
    nextProps.cancelledDates !== this.props.cancelledDates ||
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading;

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
      isSingle,
    } = this.props;
    const {checked} = this.state;
    if (checked === SINGLE_EVENT && !isSingle) {
      const input = {
        id,
        cancelledDates: Array.from(new Set([...cancelledDates, date])),
      };
      setTimeout(() => cancelEvent(input), 200);
    } else {
      const input = {id};
      if (banner) {
        stores.appState.removeKeysFromStorage([banner.key]);
      }
      setTimeout(() => deleteEvent(input), 200);
      navigation.goBack();
    }
    this._handleDismiss();
  };

  _handleDismiss = () => this.confirmRef.close();

  _toggleAll = () => this.setState({checked: ALL_EVENTS});
  _toggleSingle = () => this.setState({checked: SINGLE_EVENT});

  render() {
    const {date, stores, cancelledDates, isSingle} = this.props;
    const {checked} = this.state;
    const styles = stores.styles.sheet;
    const isCancelled = cancelledDates && cancelledDates.includes(date);

    return (
      <RBSheet
        ref={this._confirmRef}
        height={isSingle ? 200 : 350}
        closeOnDragDown
        customStyles={{
          container: styles.container,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={(styles.header, {alignItems: 'center'})}>
            <Text style={styles.title}>{I18n.get('DIALOG_cancelEvent')}</Text>
          </View>
          {!isSingle && (
            <View style={{flex: 1, padding: 40}}>
              {!isCancelled && (
                <RadioButton
                  label={I18n.get('DIALOG_onlyThisEvent')}
                  checked={checked === SINGLE_EVENT}
                  textStyle={styles.message}
                  onPress={this._toggleSingle}
                />
              )}
              <RadioButton
                checked={checked === ALL_EVENTS}
                label={I18n.get('DIALOG_allOfThisEvent')}
                textStyle={styles.message}
                onPress={this._toggleAll}
              />
            </View>
          )}
          <View style={styles.footer}>
            <Button onPress={this._handleDismiss}>
              {I18n.get('BUTTON_dismiss')}
            </Button>
            <Button danger onPress={this._onContinue}>
              {I18n.get('BUTTON_continue')}
            </Button>
          </View>
        </View>
      </RBSheet>
    );
  }
}

export default inject('stores')(observer(CancelEvent));
