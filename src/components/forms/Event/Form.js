import React from 'react';
import { View } from 'react-native';
import {
  Button,
  TextInput,
  Appbar,
  Text,
  RadioButton
} from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import moment from 'moment';
import styles from './styles';

const defaultValues = {
  name: '',
  description: '',
  location: '',
  startDate: Date.now(),
  startTime: Date.now(),
  endDate: Date.now(),
  endTime: Date.now(),
  allDay: false,
  repeat: '',
  groupId: '',
};

const formatDate = (date) => moment(date).format('ddd, Do MMM YYYY');
const formatTime = (time) => moment(time).format('hh:mm a');

export default class Form extends React.PureComponent {
  state = {
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  };

  _hidePicker = (name) => this.setState({[name]: false});
  _showPicker = (name) => this.setState({[name]: true});

  render() {
    return (
      <Formik
        initialValues={defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          // this.props.handleSubmit(values);
          alert(JSON.stringify(values));
          setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmitting,
          handleSubmit,
          handleChange,
          setFieldValue
        }) => (
          <View style={styles.container}>
            <Appbar.Header>
              <Appbar.BackAction
                onPress={this.props.onBack}
              />
              <Appbar.Content
                title={this.props.title}
              />
              <Appbar.Action
                disabled={isSubmitting}
                icon="send"
                onPress={handleSubmit}
              />
            </Appbar.Header>
            <View style={styles.form}>
              <TextInput
                placeholder="Event name"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              <TextInput
                placeholder="Description"
                value={values.description}
                onChangeText={handleChange('description')}
                style={styles.input}
              />
              <TextInput
                placeholder="Location"
                value={values.location}
                onChangeText={handleChange('location')}
              />
              <Text style={styles.text}>
                From
              </Text>
              <View style={styles.date}>
                <Button
                  disabled={values.allDay}
                  style={styles.button}
                  compact
                  mode="outlined"
                  onPress={() => this._showPicker('startDate')}
                >
                {formatDate(values.startDate)}
                </Button>
                <Button
                  disabled={values.allDay}
                  compact
                  mode="outlined"
                  onPress={() => this._showPicker('startTime')}
                >
                {formatTime(values.startTime)}
                </Button>
                <DateTimePicker
                  mode="date"
                  date={new Date()}
                  minimumDate={new Date()}
                  isVisible={this.state.startDate}
                  onCancel={() => this._hidePicker('startDate')}
                  onConfirm={(date) => {
                    setFieldValue('startDate', Date.parse(date));
                    this._hidePicker('startDate');
                  }}
                />
                <DateTimePicker
                  mode="time"
                  date={new Date()}
                  minimumDate={new Date()}
                  isVisible={this.state.startTime}
                  onCancel={() => this._hidePicker('startTime')}
                  onConfirm={(date) => {
                    setFieldValue('startTime', Date.parse(date));
                    this._hidePicker('startTime');
                  }}
                />
              </View>
              <Text style={styles.text}>
                To
              </Text>
              <View style={styles.date}>
                <Button
                  disabled={values.allDay}
                  style={styles.button}
                  compact
                  mode="outlined"
                  onPress={() => this._showPicker('endDate')}
                >
                {formatDate(values.endDate)}
                </Button>
                <Button
                  disabled={values.allDay}
                  compact
                  mode="outlined"
                  onPress={() => this._showPicker('endTime')}
                >
                {formatTime(values.endTime)}
                </Button>
                <DateTimePicker
                  mode="date"
                  date={new Date()}
                  minimumDate={new Date()}
                  isVisible={this.state.endDate}
                  onCancel={() => this._hidePicker('endDate')}
                  onConfirm={(date) => {
                    setFieldValue('endDate', Date.parse(date));
                    this._hidePicker('endDate');
                  }}
                />
                <DateTimePicker
                  mode="time"
                  date={new Date()}
                  minimumDate={new Date()}
                  isVisible={this.state.endTime}
                  onCancel={() => this._hidePicker('endTime')}
                  onConfirm={(date) => {
                    setFieldValue('endTime', Date.parse(date));
                    this._hidePicker('endTime');
                  }}
                />
              </View>
              <View style={styles.radio}>
                <Text style={styles.radioText}>All Day</Text>
                <RadioButton
                  value='allDay'
                  onPress={() => {
                    setFieldValue('allDay', !values.allDay)
                  }}
                  status={values.allDay ? 'checked' : 'unchecked'}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}
