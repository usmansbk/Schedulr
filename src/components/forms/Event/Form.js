import React from 'react';
import { View, Picker, ScrollView , Alert} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  RadioButton
} from 'react-native-paper';
import DateTimeInput from '../../common/DateTimeInput';
import { Formik } from 'formik';
import { isEventValid } from '../../../lib/formValidator';
import styles from './styles';
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
  const { groups=[], initialValues } = props;
  return (
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={formSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (isEventValid(values)) {
            // props.handleSubmit(values);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting=props.loading,
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue
        }) => (
          <React.Fragment>
          <View style={styles.header}>
            <Button
              icon="chevron-left"
              mode="outlined"
              onPress={props.handleCancel}
            >Cancel</Button>
            <Button
              loading={isSubmitting}
              mode="outlined"
              onPress={handleSubmit}
            >Save</Button>
          </View>
          <ScrollView style={styles.container}>
            <View style={styles.form}>
              <TextInput
                placeholder="Event name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
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
                  { (groups.length === 0) ? <Picker.Item label="No event group" value="" /> : 
                    groups.map(group => (
                      <Picker.Item key={group.id} label={group.name} value={group.id} />
                    ))
                  }
                </Picker>
                {
                  (!values.groupId) && (
                    <HelperText
                      type="error"
                      visible={!values.groupId}
                    >
                      Event group required!
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
            </View>
          </ScrollView>
          </React.Fragment>
        )}
      </Formik>
  );
};

export default Form;
