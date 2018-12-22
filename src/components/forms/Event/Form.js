import React from 'react';
import moment from "moment";
import {
  View,
  Picker,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  RadioButton,
  Appbar
} from 'react-native-paper';
import { Formik } from 'formik';
import DateTimeInput from '../../common/DateTimeInput';
import {
  isEventValid,
  canRepeat
} from '../../../lib/formValidator';
import { CANT_REPEAT } from '../../../lib/errorMessages';
import styles, { navButtonColor } from './styles';
import formSchema from './schema';
import eventTypes from './types';
import frequency from './frequency';

const defaultValues = {
  title: '',
  description: '',
  location: {
    address: ''
  },
  startAt: moment().toDate().toISOString(),
  endAt: moment().add(2, 'hours').toDate().toISOString(),
  allDay: false,
  eventType: eventTypes[0].id,
  repeat: frequency[0].id,
  boardId: '',
};

const Form = ({
  loading,
  boards=[],
  locked,
  initialValues,
  onSubmit,
  handleCancel,
  isEdit
}) => (
  <Formik
    initialValues={initialValues || defaultValues}
    validationSchema={formSchema}
    onSubmit={(values, { setSubmitting }) => {
      if (isEventValid(values)) {
        onSubmit && onSubmit(values);
      }
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      isSubmitting=loading,
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      resetForm,
    }) => (
      <React.Fragment>
      <Appbar.Header style={styles.header}>
        <Button
          mode="outlined"
          onPress={handleCancel}
          color={navButtonColor}
        >Cancel</Button>
        <Button
          loading={isSubmitting}
          mode="outlined"
          color={navButtonColor}
          onPress={handleSubmit}
        >{ isEdit ? 'Save' : 'Create'}</Button>
      </Appbar.Header>
      <ScrollView
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => resetForm()} />}
      >
        <View style={styles.form}>
          <TextInput
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            mode="outlined"
          />
          <HelperText
            type="error"
            visible={errors.title && touched.title}
          >
          {errors.title}
          </HelperText>
          <TextInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            mode="outlined"
          />
          <HelperText
            type="error"
            visible={errors.description && touched.description}
          >
          {errors.description}
          </HelperText>
          <TextInput
            placeholder="Location"
            value={values.location.address}
            onChangeText={handleChange('location.address')}
            onBlur={handleBlur('location.address')}
            mode="outlined"
          />
          <HelperText
            type="error"
            visible={errors.location && touched.location}
          >
          {errors.location}
          </HelperText>
          <DateTimeInput
            label="From"
            value={values.startAt}
            onChangeDate={(date) => {
              setFieldValue('startAt', date);
              if (values.allDay) {
                setFieldValue('endAt', moment(date).endOf('day').toISOString());
              }
            }}
          />
          <DateTimeInput
            label="To"
            value={values.endAt}
            disabled={values.allDay}
            onChangeDate={(date) => setFieldValue('endAt', date)}
          />
          <View style={styles.radio}>
            <Text style={styles.radioText}>All-day</Text>
            <RadioButton
              value='allDay'
              onPress={() => {
                const { allDay } = values;
                setFieldValue('allDay', !allDay);
                if (!allDay) {
                  setFieldValue('endAt', moment(values.startAt).endOf('day').toISOString());
                }
              }}
              status={values.allDay ? 'checked' : 'unchecked'}
            />
          </View>
          <View style={styles.pickerSpacing}>
            <Text style={styles.radioText}>Repetition</Text>
            <Picker
              prompt="Repeat"
              selectedValue={values.repeat}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setFieldValue('repeat', itemValue)}
            >
              {
                frequency.map(freq => (
                  <Picker.Item key={freq.id} label={freq.name} value={freq.id} />
                ))
              }
            </Picker>
            {
              (!canRepeat(values)) && (
                <HelperText
                  type="error"
                  visible={true}
                >
                  {CANT_REPEAT}
                </HelperText>
              )
            }
          </View>
          <View style={styles.pickerSpacing}>
            <Text style={styles.radioText}>Type</Text>
            <Picker
              prompt="Type"
              selectedValue={values.eventType}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setFieldValue('eventType', itemValue)}
            >
              {
                eventTypes.map(eventType => (
                  <Picker.Item key={eventType.id} label={eventType.name} value={eventType.id} />
                ))
              }
            </Picker>
          </View>
          <View style={styles.pickerSpacing}>
            <Text style={styles.radioText}>Board</Text>
            <Picker
              prompt="Select a board"
              selectedValue={values.boardId}
              style={styles.picker}
              enabled={!locked }
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setFieldValue('boardId', itemValue)}
            >
              <Picker.Item label={(boards.length === 0) ? "No board" : "Select a board"} value="" />
              {
                boards.map(board => (
                  <Picker.Item key={board.id} label={board.name} value={board.id} />
                ))
              }
            </Picker>
            <HelperText
              type="error"
              visible={errors.boardId && touched.boardId}
            >
              {errors.boardId}
            </HelperText>
          </View>
        </View>
      </ScrollView>
      </React.Fragment>
    )}
  </Formik>
);

export default Form;
