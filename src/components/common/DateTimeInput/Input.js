import React from 'react';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Button from './Picker';

@inject('stores')
@observer
export default class Input extends React.Component {

  state = {
    showDatePicker: false,
    showTimePicker: false,
  }

  shouldComponentUpdate = (nextProps, nextState) => (
    (nextProps.value !== this.props.value) ||
    (nextProps.disabled !== this.props.disabled) ||
    (nextState.showDatePicker !== this.state.showDatePicker) ||
    (nextState.showTimePicker !== this.state.showTimePicker)
  );
  
  _formatDate = (date) => moment(date).format('ddd, Do MMM YYYY');
  _formatTime = (time) => moment(time).format('hh:mm a');
  _hidePicker = (name) => this.setState({[name]: false});
  _showPicker = (name) => this.setState({[name]: true});
  _handleConfirmDate = (date) => {
    this.props.onChangeDate(date);
    this._hidePicker('showDatePicker');
  }
  _handleConfirmTime = (date) => {
    this.props.onChangeDate(date);
    this._hidePicker('showTimePicker');
  }

  _showDatePicker = () => this._showPicker('showDatePicker');
  _showTimePicker = () => this._showPicker('showTimePicker');
  _hideDatePicker = () => this._hidePicker('showDatePicker');
  _hideTimePicker = () => this._hidePicker('showTimePicker');
  
  render() {
    const {
      label,
      disabled,
      noMin,
      stores
    } = this.props;

    const value = this.props.value || moment().toISOString();
    const styles = stores.appStyles.datePicker;

    return (
      <View>
        <View style={styles.date}>
          <Button
            disabled={disabled}
            style={styles.dateButton}
            onPress={this._showDatePicker}
          >
          {this._formatDate(value)}
          </Button>
          <Button
            disabled={disabled}
            style={styles.timeButton}
            onPress={this._showTimePicker}
          >
          {this._formatTime(value)}
          </Button>
          <DateTimePicker
            mode="date"
            date={new Date(value)}
            minimumDate={noMin ? undefined : new Date()}
            isVisible={this.state.showDatePicker}
            onCancel={this._hideDatePicker}
            onConfirm={this._handleConfirmDate}
          />
          <DateTimePicker
            mode="time"
            date={new Date(value)}
            minimumDate={new Date()}
            isVisible={this.state.showTimePicker}
            onCancel={this._hideTimePicker}
            onConfirm={this._handleConfirmTime}
          />
        </View>
      </View>
    );
  }
}
