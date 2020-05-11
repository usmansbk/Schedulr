import React from 'react';
import moment from "moment";
import isEqual from 'lodash.isequal';
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Appbar,
  Switch,
} from 'react-native-paper';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Picker from 'components/common/Picker';
import DateTimeInput from 'components/common/DateTimeInput';
import EventTypePicker from 'components/common/EventTypePicker';
import Suspense from 'components/common/Suspense';
import { getRepeatLabel, getTimeUnit } from 'lib/time';
import recurrence from './recurrence';
import schema from './schema';

const MIN_UNTIL_DATE = 1
class Form extends React.Component {

  state = {
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
    setTimeout(
      this.props.stores.locationStore.fetchLocation, 0);
  };

  static defaultProps = {
    schedules: [], 
    initialValues: {
      title: '',
      description: null,
      venue: null,
      startAt: moment().toISOString(),
      endAt: moment().add(2, 'hours').toISOString(),
      allDay: false,
      category: 'Event',
      recurrence: recurrence[0].id,
      until: null,
      forever: false,
      eventScheduleId: null,
      isPublic: true,
      location: null
    }
  };

  render() {
    const {
      display
    } = this.state;

    if (!display) return <Suspense />;

    const {
      schedules,
      locked,
      initialValues,
      onSubmit,
      handleCancel,
      edit,
      isNew,
      stores
    } = this.props;

    const styles = stores.appStyles.eventForm;
    const navButtonColor = stores.themeStore.colors.primary;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          values.venue = values.venue || values.location;
          values.geo_point = stores.locationStore.point;
          setTimeout(() => {
            const castVal = schema.cast(values);
            onSubmit && onSubmit(castVal);
            setSubmitting(false);
          },0);
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
          <>
          <Appbar.Header style={styles.header}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              color={navButtonColor}
              uppercase
            >{I18n.get("BUTTON_cancel")}</Button>
            <Button
              loading={isSubmitting}
              disabled={!isNew && (!isValid || isSubmitting || isEqual(initialValues, values))}
              mode="outlined"
              color={navButtonColor}
              onPress={submitForm}
              uppercase
            >{ edit ? I18n.get("BUTTON_save") : I18n.get("BUTTON_create")}</Button>
          </Appbar.Header>
          <ScrollView
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={resetForm}
                colors={[stores.themeStore.colors.primary]}
                progressBackgroundColor={stores.themeStore.colors.bg}
              />
            }
            style={styles.container}
          >
            <View style={styles.form}>
              <TextInput
                // placeholder={I18n.get("EVENT_FORM_title")}
                label={I18n.get("EVENT_FORM_title")}
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                style={styles.textInput}
                underlineColor="transparent"
                theme={{
                  roundness: 0
                }}
              />
              <HelperText
                type="error"
                visible={errors.title && touched.title}
              >
              {errors.title && I18n.get(`HELPER_TEXT_${errors.title}`)}
              </HelperText>
              <View style={{paddingLeft: 10}}>
              {
                !locked && (
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>{I18n.get("EVENT_FORM_schedule")}</Text>
                    <Picker
                      prompt={I18n.get("EVENT_FORM_selectASchedule")}
                      value={values.eventScheduleId}
                      disabled={locked}
                      onValueChange={handleChange('eventScheduleId')}
                      onItemChange={itemValue => {
                        const found = schedules.find(item => item.id === itemValue);
                        if (found) {
                          setFieldValue('location', found.location);
                          setFieldValue('isPublic', Boolean(found.isPublic));
                        }
                      }}
                      items={schedules.map(schedule => ({
                        key: schedule.id,
                        label: schedule.name,
                        value: schedule.id
                      }))}
                    />
                  </View>
                )
              }
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_category")}</Text>
                <EventTypePicker
                  prompt={I18n.get("EVENT_FORM_category")}
                  value={values.category}
                  onValueChange={handleChange('category')}
                  onBlur={handleBlur('category')}
                />
              </View>
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_from")}</Text>
                <DateTimeInput
                  noMin
                  disabled={values.allDay}
                  value={values.startAt}
                  hideTime={values.allDay}
                  onValueChange={handleChange('startAt')}
                  onDateChange={(date) => {
                    const prevStartAt = moment(values.startAt);
                    const prevEndAt = moment(values.endAt);

                    if (values.allDay) {
                      setFieldValue('endAt', moment(date).endOf('day').toISOString());
                    } else {
                      const prevDuration = Math.abs(prevEndAt.valueOf() - prevStartAt.valueOf());
                      const newEnd = moment(date).add(prevDuration, 'milliseconds').toISOString();
                      setFieldValue('endAt', newEnd);
                    }
                  }}
                />
              </View>
              {
                errors.startAt && (
                  <HelperText
                    type="error"
                    visible={errors.startAt && touched.startAt}
                  >
                  {errors.startAt && I18n.get(`HELPER_TEXT_${errors.startAt}`)}
                  </HelperText>
                )
              }

              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_to")}</Text>
                <DateTimeInput
                  min={moment().toDate()}
                  value={values.endAt}
                  disabled={values.allDay}
                  hideTime={values.allDay}
                  onValueChange={handleChange('endAt')}
                />
              </View>
              {
                errors.endAt && (
                  <HelperText
                    type="error"
                    visible={errors.endAt && touched.endAt}
                  >
                  {errors.endAt && I18n.get(`HELPER_TEXT_${errors.endAt}`)}
                  </HelperText>
                )
              }
              
              <View style={[styles.radio, styles.pickerSpacing]}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_allDay")}</Text>
                <Switch
                  value={values.allDay}
                  onValueChange={() => {
                    const { allDay } = values;
                    setFieldValue('allDay', !allDay);
                    if (!allDay) {
                      setFieldValue('startAt', moment(values.startAt).startOf('day').toISOString());
                      setFieldValue('endAt', moment(values.startAt).endOf('day').toISOString());
                    }
                  }}
                />
              </View>
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repetition")}</Text>
                <Picker
                  prompt={I18n.get("EVENT_FORM_repeat")}
                  value={values.recurrence}
                  onValueChange={handleChange('recurrence')}
                  onItemChange={itemValue => {
                    if (itemValue === recurrence[0].id) {
                      setFieldValue('until', null);
                      setFieldValue('forever', false);
                    } else if (!values.forever) {
                      const unit = getTimeUnit(itemValue);
                      setFieldValue(
                        'until',
                        moment(values.startAt)
                          .add(MIN_UNTIL_DATE, unit)
                          .endOf('day').toISOString()
                      );
                    }
                  }}
                  items={recurrence.map(recur => ({
                    key: recur.id,
                    label: getRepeatLabel(recur.id, values.startAt),
                    value: recur.id
                  }))}
                />
              </View>
              {
                Boolean(errors.recurrence) && (
                  <HelperText
                    type="error"
                    visible={errors.recurrence && touched.recurrence}
                  >
                    {errors.recurrence && I18n.get(`HELPER_TEXT_${errors.recurrence}`)}
                  </HelperText>
                )
              }
              {
                (values.recurrence !== recurrence[0].id) && (
                  <View style={[styles.radio, styles.pickerSpacing]}>
                    <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repeatForever")}</Text>
                    <Switch
                      value={values.forever}
                      onValueChange={(value) => {
                        const forever = values.forever;
                        if (!forever) {
                          setFieldValue('until', null);
                        } else {
                          const unit = getTimeUnit(values.recurrence);
                          setFieldValue(
                            'until',
                            moment(values.startAt)
                              .add(MIN_UNTIL_DATE, unit)
                              .endOf('day').toISOString()
                          );
                        }
                        setFieldValue('forever', value);
                      }}
                    />
                  </View>
                )
              }
              {
                (values.recurrence !== recurrence[0].id && !values.forever) && (
                  <>
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repeatUntil")}</Text>
                    <DateTimeInput
                      minDate={new Date()}
                      value={values.until}
                      onValueChange={handleChange('until')}
                      hideTime
                    />
                  </View>
                  {Boolean(errors.until) && (
                    <HelperText
                      type="error"
                      visible={errors.until && touched.until }
                    >
                    {errors.until && I18n.get(`HELPER_TEXT_${errors.until}`)}
                    </HelperText>
                  )}
                  </>
                )
              }
              </View>
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_venue")(values.location)}
                label={I18n.get("EVENT_FORM_venue")}
                value={values.venue}
                onChangeText={handleChange('venue')}
                onBlur={handleBlur('venue')}
                style={styles.textInput}
                underlineColor="transparent"
                theme={{
                  roundness: 0
                }}
              />
              <HelperText
                type="error"
                visible={errors.venue && touched.venue}
              >
              {errors.venue && I18n.get(`HELPER_TEXT_${errors.venue}`)}
              </HelperText>
              <TextInput
                // placeholder={I18n.get("EVENT_FORM_description")}
                label={I18n.get("EVENT_FORM_description")}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                style={styles.textInput}
                theme={{
                  roundness: 0
                }}
                underlineColor="transparent"
              />
              {
                Boolean(errors.description) && (
                  <HelperText
                    type="error"
                    visible={errors.description && touched.description}
                  >
                  {errors.description && I18n.get(`HELPER_TEXT_${errors.description}`)}
                  </HelperText>
                )
              }
            </View>
          </ScrollView>
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));