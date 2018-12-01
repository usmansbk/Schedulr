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
import DateTimeInput from '../../common/DateTimeInput';
import { Formik } from 'formik';
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
  location: '',
  start: Date.now(),
  end: Date.now(),
  allDay: false,
  type: eventTypes[0].id,
  repeat: frequency[0].id,
  groupId: '',
};

const Form = ({
  loading,
  groups=[],
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
            value={values.location}
            onChangeText={handleChange('location')}
            onBlur={handleBlur('location')}
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
            value={values.start}
            onChangeDate={(date) => {
              setFieldValue('start', date);
              if (values.allDay) {
                setFieldValue('end', moment(date).endOf('day'));
              }
            }}
          />
          <DateTimeInput
            label="To"
            value={values.end}
            disabled={values.allDay}
            onChangeDate={(date) => setFieldValue('end', date)}
          />
          <View style={styles.radio}>
            <Text style={styles.radioText}>All-day</Text>
            <RadioButton
              value='allDay'
              onPress={() => {
                const { allDay } = values;
                setFieldValue('allDay', !allDay);
                if (!allDay) {
                  setFieldValue('end', moment(values.start).endOf('day'));
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
              selectedValue={values.type}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setFieldValue('type', itemValue)}
            >
              {
                eventTypes.map(type => (
                  <Picker.Item key={type.id} label={type.name} value={type.id} />
                ))
              }
            </Picker>
          </View>
          <View style={styles.pickerSpacing}>
            <Text style={styles.radioText}>Group</Text>
            <Picker
              prompt="Select a group"
              selectedValue={values.groupId}
              style={styles.picker}
              enabled={!locked }
              itemStyle={styles.pickerItem}
              onValueChange={itemValue => setFieldValue('groupId', itemValue)}
            >
              <Picker.Item label={(groups.length === 0) ? "No group" : "Select a group"} value="" />
              {
                groups.map(group => (
                  <Picker.Item key={group.id} label={group.name} value={group.id} />
                ))
              }
            </Picker>
            <HelperText
              type="error"
              visible={errors.groupId && touched.groupId}
            >
              {errors.groupId}
            </HelperText>
          </View>
        </View>
      </ScrollView>
      </React.Fragment>
    )}
  </Formik>
);

export default Form;
