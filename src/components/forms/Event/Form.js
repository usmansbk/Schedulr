import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  Button,
  TextInput,
  Appbar,
  Text
} from 'react-native-paper';
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
  repeat: '',
  groupId: '',
};

const formatDate = (date) => moment(date).format('ddd, Do MMM YYYY');
const formatTime = (time) => moment(time).format('hh:mm a');

const Form = props => (
  <Formik
    initialValues={defaultValues}
    onSubmit={(values, { setSubmitting }) => {
      props.handleSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      isSubmitting,
      handleSubmit,
      handleChange,
    }) => (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={props.onBack}
          />
          <Appbar.Content
            title={props.title}
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
            <Button style={styles.button} compact mode="outlined">
            {formatDate(values.startDate)}
            </Button>
            <Button compact mode="outlined">
            {formatTime(values.startTime)}
            </Button>
          </View>
          <Text style={styles.text}>
            To
          </Text>
          <View style={styles.date}>
            <Button style={styles.button} compact mode="outlined">
            {formatDate(values.endDate)}
            </Button>
            <Button compact mode="outlined">
            {formatTime(values.endTime)}
            </Button>
          </View>
        </View>
      </View>
    )}
  </Formik>
);

export default Form;