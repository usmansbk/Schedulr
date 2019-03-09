import React from 'react';
import moment from "moment";
import isEqual from 'lodash.isequal';
import Geolocation from 'react-native-geolocation-service';
import SimpleToast from 'react-native-simple-toast';
import {
  View,
  Picker,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  // IconButton,
  Button,
  TextInput,
  Text,
  HelperText,
  RadioButton,
  Appbar,
  // Checkbox
} from 'react-native-paper';
import { Formik } from 'formik';
import DateTimeInput from '../../common/DateTimeInput';
import {
  isEventValid,
  canRepeat
} from '../../../lib/formValidator';
import { CANT_REPEAT } from '../../../lib/errorMessages';
import { getRepeatLabel } from '../../../lib/time';
import styles, { navButtonColor } from './styles';
import formSchema from './schema';
import eventTypes from './types';
import frequency from './frequency';
import { buildEventForm } from '../../../helpers/buildForm';
import { requestLocationPermission } from '../../../helpers/permissions';
// import colors from '../../../config/colors';


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      forever: !Boolean(props.initialValues.until)
    }
  }

  static defaultProps = {
    initialValues: {
      title: '',
      description: '',
      venue: {
        address: '',
        location: {
          longitude: null,
          latitude: null
        }
      },
      startAt: moment().toDate().toISOString(),
      endAt: moment().add(2, 'hours').toDate().toISOString(),
      allDay: false,
      eventType: eventTypes[0].id,
      repeat: frequency[0].id,
      until: null,
      boardId: '',
    }
  }

  componentDidMount = () => {
    this.getLocation();
  }

  // _tagLocation = () => {
  //   const { latitude, longitude } = this.state;
  //   if (latitude && longitude) {
  //     this.setState({ latitude: null, longitude: null });
  //   } else {
  //     this.getLocation();
  //   }
  // }
  
  getLocation = () => {
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: {
              longitude,
              latitude
            }
          } = position;
          this.setState({
            latitude,
            longitude
          });
        },
        (error) => {
          SimpleToast.show(error.message, SimpleToast.SHORT);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      )
    }
  };

  render() {
    const {
      boards=[],
      locked,
      initialValues,
      onSubmit,
      handleCancel,
      edit,
      isNew,
    } = this.props;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEventValid(values)) {
            const { longitude, latitude } = this.state;
            const input = buildEventForm(values, { longitude, latitude });
            onSubmit && await onSubmit(input);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          submitForm,
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
          initialValues,
          isValid
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
              disabled={!isNew && (!isValid || isSubmitting || isEqual(initialValues, values))}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
            >{ edit ? 'Save' : 'Create'}</Button>
          </Appbar.Header>
          <ScrollView
            refreshControl={<RefreshControl
              refreshing={false}
              onRefresh={() => resetForm()}
            />}
            style={styles.container}
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
                placeholder="Venue"
                value={values.venue.address}
                onChangeText={handleChange('venue.address')}
                onBlur={handleBlur('venue.address')}
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
                disabled={values.allDay}
                value={values.startAt}
                onChangeDate={(date) => {
                  const prevStartAt = Date.parse(values.startAt);
                  const currentEndAt = Date.parse(values.endAt);
                  const currentStartAt = Date.parse(date);
                  const prevDuration = Math.abs(currentEndAt - prevStartAt);
    
                  setFieldValue('startAt', date);
                  if (values.allDay) {
                    setFieldValue('endAt', moment(date).endOf('day').toISOString());
                  } else if (currentStartAt > currentEndAt) {
                    const newEnd = moment(date).add(prevDuration, 'milliseconds').toISOString();
                    setFieldValue('endAt', newEnd);
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
                      setFieldValue('startAt', moment(values.startAt).startOf('day').toISOString());
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
                  onValueChange={itemValue => {
                    setFieldValue('repeat', itemValue);
                    if (itemValue !== frequency[0].id) {
                      moment(values.startAt).add(1, 'year').toISOString()
                    } else {
                      setFieldValue('until', null);
                    }
                  }}
                >
                  {
                    frequency.map(freq => (
                      <Picker.Item key={freq.id} label={getRepeatLabel(freq.id, values.startAt)} value={freq.id} />
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

              {
                (values.repeat !== frequency[0].id) && (
                  <View style={styles.radio}>
                    <Text style={styles.radioText}>Repeat Forever</Text>
                    <RadioButton
                      value='Forever'
                      onPress={() => {
                        this.setState(prev => ({
                          forever: !prev.forever
                        }), () => {
                          if (this.state.forever) {
                            setFieldValue('until', null);
                          } else {
                            setFieldValue('until', moment(values.startAt).add(1, 'year').toISOString());
                          }
                        });
                      }}
                      status={this.state.forever ? 'checked' : 'unchecked'}
                    />
                  </View>
                )
              }
              {
                (!this.state.forever) && (
                  <DateTimeInput
                    label="Repeat Until"
                    value={values.until}
                    onChangeDate={(date) => setFieldValue('until', date)}
                  />
                )
              }
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
  }
}
