import React from 'react';
import { View, Picker, ScrollView } from 'react-native';
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
  name: '',
  description: '',
  location: '',
  start: Date.now(),
  end: Date.now(),
  allDay: false,
  type: eventTypes[0].id,
  repeat: frequency[0].id,
  groupId: '',
};

const Form = (props) => {
  const {
    loading,
    groups=[],
    initialValues,
    handleSubmit,
    handleCancel,
    isEdit
  } = props;
  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (isEventValid(values)) {
          handleSubmit && handleSubmit(values);
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
        setFieldValue
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
        <ScrollView>
          <View style={styles.form}>
            <TextInput
              placeholder="Event name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              mode="outlined"
            />
            <HelperText
              type="error"
              visible={errors.name && touched.name}
            >
            {errors.name}
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
              onChangeDate={(date) => setFieldValue('start', date)}
            />
            <DateTimeInput
              label="To"
              value={values.end}
              disabled={values.allDay}
              onChangeDate={(date) => setFieldValue('end', date)}
            />
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
            <View style={styles.pickerSpacing}>
              <Text style={styles.radioText}>Repetition</Text>
              <Picker
                prompt="Repeat event"
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
              <Text style={styles.radioText}>Event type</Text>
              <Picker
                prompt="Event type"
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
              <Text style={styles.radioText}>Event group</Text>
              <Picker
                prompt="Select event group"
                selectedValue={values.groupId}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={itemValue => setFieldValue('groupId', itemValue)}
              >
                <Picker.Item label={(groups.length === 0) ? "No event group" : "Select event group"} value="" />
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
};

export default Form;
