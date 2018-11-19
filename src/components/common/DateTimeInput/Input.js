import React from 'react';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import colors from '../../../config/colors';

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
  
  render() {
    const {
      label,
      value,
      disabled,
    } = this.props;
    return (
      <View>
        <Text style={styles.text}>
          {label}
        </Text>
        <View style={styles.date}>
          <Button
            disabled={disabled}
            style={styles.button}
            compact
            mode="outlined"
            color={colors.black}
            onPress={() => this._showPicker('showDatePicker')}
          >
          {this._formatDate(value)}
          </Button>
          <Button
            disabled={disabled}
            compact
            mode="outlined"
            color={colors.black}
            onPress={() => this._showPicker('showTimePicker')}
          >
          {this._formatTime(value)}
          </Button>
          <DateTimePicker
            mode="date"
            date={new Date(value)}
            minimumDate={new Date()}
            isVisible={this.state.showDatePicker}
            onCancel={() => this._hidePicker('showDatePicker')}
            onConfirm={this._handleConfirmDate}
          />
          <DateTimePicker
            mode="time"
            date={new Date(value)}
            minimumDate={new Date()}
            isVisible={this.state.showTimePicker}
            onCancel={() => this._hidePicker('showTimePicker')}
            onConfirm={this._handleConfirmTime}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    flexDirection: 'row',
  },
  button: {
    flexGrow: 1
  },
  text: {
    color: colors.primary,
    marginVertical: 8,
    fontWeight: 'bold'
  },
});
