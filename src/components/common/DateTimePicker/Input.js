import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import Button from './Picker';
import {format, exactTime, toDate, calendar, date} from 'lib/date';
import {I18n} from 'aws-amplify';

class Input extends React.Component {
  state = {
    showPicker: false,
    mode: 'date',
  };

  shouldComponentUpdate = (nextProps, nextState) =>
    nextProps.value !== this.props.value ||
    nextProps.disabled !== this.props.disabled ||
    nextState.showPicker !== this.state.showPicker ||
    nextState.mode !== this.state.mode;

  _formatDate = (date) => calendar(date, I18n.get('calendarFormats'));
  _formatTime = (time) => format(time, 'hh:mm a');

  _hidePicker = () => this.setState({showPicker: false});
  _showPicker = (mode) => this.setState({showPicker: true, mode});

  _datePicker = () => this._showPicker('date');
  _timePicker = () => this._showPicker('time');

  _handleChange = (_, date) => {
    this.setState({showPicker: false});
    if (date) {
      this.timer = setTimeout(() => {
        if (this.props.onDateChange) {
          this.props.onDateChange(date);
        }
        this.props.onValueChange(exactTime(date));
      }, 0);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    const {disabled, minimumDate, stores, hideTime} = this.props;

    const value = this.props.value || date();
    const styles = stores.styles.datePicker;

    return (
      <>
        <View style={styles.date}>
          <Button
            icon="calendar"
            disabled={disabled}
            style={styles.dateButton}
            onPress={this._datePicker}>
            {this._formatDate(value)}
          </Button>
          {!hideTime && (
            <Button
              icon="clock"
              disabled={disabled}
              style={styles.timeButton}
              onPress={this._timePicker}>
              {this._formatTime(value)}
            </Button>
          )}
        </View>
        {this.state.showPicker && (
          <DateTimePicker
            mode={this.state.mode}
            value={toDate(value)}
            minimumDate={minimumDate}
            onChange={this._handleChange}
            is24Hour={false}
          />
        )}
      </>
    );
  }
}

export default inject('stores')(observer(Input));
