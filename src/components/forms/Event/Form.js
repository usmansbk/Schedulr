import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, HelperText, Appbar, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import Switch from 'components/common/Switch';
import Picker, {CustomPicker, PickerInput} from 'components/common/Picker';
import DateTimePicker from 'components/common/DateTimePicker';
import LocationPicker from 'components/common/LocationPicker';
import Suspense from 'components/common/Suspense';
import {getRepeatLabel, getTimeUnit} from 'lib/time';
import {
  toISOString,
  date,
  add,
  addDuration,
  diffDuration,
  toDate,
  isAfter,
  subtractDuration,
  startOf,
  endOf,
  diff,
} from 'lib/date';
import recurrence from './recurrence';
import schema from './schema';

const MIN_UNTIL_DATE = 1;

class Form extends React.Component {
  state = {
    display: false,
    showLocationPicker: false,
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  _showLocationPicker = () => this.setState({showLocationPicker: true});
  _hideLocationPicker = () => this.setState({showLocationPicker: false});

  static defaultProps = {
    schedules: [],
    initialValues: {
      title: '',
      description: null,
      venue: null,
      startAt: toISOString(),
      endAt: toISOString(add(date(), 2, 'hours')),
      allDay: false,
      category: 'Event',
      recurrence: recurrence[0].id,
      until: null,
      forever: false,
      eventScheduleId: null,
      isPublic: true,
      location: null,
    },
  };

  render() {
    const {display} = this.state;

    if (!display) return <Suspense />;

    const {
      schedules,
      locked,
      initialValues,
      onSubmit,
      handleCancel,
      edit,
      stores,
    } = this.props;

    const styles = stores.styles.eventForm;
    const navButtonColor = stores.theme.colors.primary;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, {setSubmitting}) => {
          values.venue = values.venue || values.location;
          values.geo_point = stores.location.point;
          setTimeout(() => {
            const castVal = schema.cast(values);
            onSubmit && onSubmit(castVal);
            setSubmitting(false);
          }, 0);
        }}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          submitForm,
          handleChange,
          handleBlur,
          setFieldValue,
          isValid,
        }) => (
          <>
            <Appbar.Header style={styles.header}>
              <Button danger onPress={handleCancel} color={navButtonColor}>
                {I18n.get('BUTTON_cancel')}
              </Button>
              <Button
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                onPress={submitForm}>
                {edit ? I18n.get('BUTTON_save') : I18n.get('BUTTON_create')}
              </Button>
            </Appbar.Header>
            <ScrollView
              keyboardShouldPersistTaps="always"
              style={styles.container}>
              <View style={styles.form}>
                <TextInput
                  error={errors.title}
                  placeholder={I18n.get('PLACEHOLDER_untitledEvent')}
                  label={I18n.get('EVENT_FORM_title')}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                <View style={styles.gap} />
                <View style={styles.pickerSpacing}>
                  <Text style={styles.radioText}>
                    {I18n.get('EVENT_FORM_category')}
                  </Text>
                  <CustomPicker
                    icon="tago"
                    prompt={I18n.get('EVENT_FORM_category')}
                    value={values.category}
                    onValueChange={handleChange('category')}
                    onBlur={handleBlur('category')}
                    data={stores.appState.categories}
                  />
                </View>
                <View style={styles.baseHorizonalSpacing}>
                  {!locked && (
                    <View style={styles.pickerSpacing}>
                      <Text style={styles.radioText}>
                        {I18n.get('EVENT_FORM_schedule')}
                      </Text>
                      <Picker
                        icon="team"
                        prompt={I18n.get('EVENT_FORM_selectASchedule')}
                        value={values.eventScheduleId}
                        disabled={locked}
                        onValueChange={handleChange('eventScheduleId')}
                        onItemChange={(itemValue) => {
                          const found = schedules.find(
                            (item) => item.id === itemValue,
                          );
                          if (found) {
                            setFieldValue('location', found.location);
                            setFieldValue('isPublic', !!found.isPublic);
                          }
                        }}
                        items={schedules.map((schedule) => ({
                          key: schedule.id,
                          label: schedule.name,
                          value: schedule.id,
                        }))}
                      />
                    </View>
                  )}
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>
                      {I18n.get('EVENT_FORM_from')}
                    </Text>
                    <DateTimePicker
                      noMin
                      disabled={values.allDay}
                      value={values.startAt}
                      hideTime={values.allDay}
                      onValueChange={handleChange('startAt')}
                      onDateChange={(value) => {
                        const prevStartAt = date(values.startAt);
                        const prevEndAt = date(values.endAt);

                        if (values.allDay) {
                          setFieldValue(
                            'endAt',
                            toISOString(endOf(date(value), 'day')),
                          );
                        } else {
                          const duration = diffDuration(prevEndAt, prevStartAt);
                          const endAt = toISOString(
                            addDuration(date(value), duration),
                          );
                          setFieldValue('endAt', endAt);
                        }
                      }}
                    />
                  </View>
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>
                      {I18n.get('EVENT_FORM_to')}
                    </Text>
                    <DateTimePicker
                      min={toDate()}
                      noMin
                      value={values.endAt}
                      disabled={values.allDay}
                      hideTime={values.allDay}
                      onValueChange={handleChange('endAt')}
                      onDateChange={(value) => {
                        const prevStartAt = date(values.startAt);
                        const prevEndAt = date(values.endAt);
                        if (isAfter(prevStartAt, date(value))) {
                          const duration = diff(prevEndAt, prevStartAt);
                          const startAt = toISOString(
                            subtractDuration(value, duration),
                          );
                          setFieldValue('startAt', startAt);
                        }
                      }}
                    />
                  </View>
                  <View style={[styles.radio, styles.pickerSpacing]}>
                    <Switch
                      textStyle={styles.radioText}
                      label={I18n.get('EVENT_FORM_allDay')}
                      value={values.allDay}
                      onValueChange={() => {
                        const {allDay} = values;
                        setFieldValue('allDay', !allDay);
                        if (!allDay) {
                          setFieldValue(
                            'startAt',
                            toISOString(startOf(values.startAt, 'day')),
                          );
                          setFieldValue(
                            'endAt',
                            toISOString(endOf(values.startAt, 'day')),
                          );
                        }
                      }}
                    />
                  </View>
                  <View style={styles.gap} />
                  <Divider />
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>
                      {I18n.get('EVENT_FORM_repetition')}
                    </Text>
                    <Picker
                      icon="retweet"
                      prompt={I18n.get('EVENT_FORM_repeat')}
                      value={values.recurrence}
                      onValueChange={handleChange('recurrence')}
                      onItemChange={(itemValue) => {
                        if (itemValue === recurrence[0].id) {
                          setFieldValue('until', null);
                          setFieldValue('forever', false);
                        } else if (!values.forever) {
                          const unit = getTimeUnit(itemValue);
                          setFieldValue(
                            'until',
                            toISOString(
                              endOf(add(values.startAt, MIN_UNTIL_DATE, unit)),
                            ),
                          );
                        }
                      }}
                      items={recurrence.map((recur) => ({
                        key: recur.id,
                        label: getRepeatLabel(recur.id, values.startAt),
                        value: recur.id,
                      }))}
                    />
                    {Boolean(errors.recurrence) && (
                      <HelperText
                        type="error"
                        visible={errors.recurrence && touched.recurrence}>
                        {I18n.get(`HELPER_TEXT_${errors.recurrence}`)}
                      </HelperText>
                    )}
                  </View>
                  {values.recurrence !== recurrence[0].id && (
                    <View style={[styles.radio, styles.pickerSpacing]}>
                      <Text style={styles.radioText}>
                        {I18n.get('EVENT_FORM_repeatForever')}
                      </Text>
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
                              toISOString(
                                endOf(
                                  add(values.startAt, MIN_UNTIL_DATE, unit),
                                  'day',
                                ),
                              ),
                            );
                          }
                          setFieldValue('forever', value);
                        }}
                      />
                    </View>
                  )}
                  {values.recurrence !== recurrence[0].id && !values.forever && (
                    <View style={styles.pickerSpacing}>
                      <Text style={styles.radioText}>
                        {I18n.get('EVENT_FORM_repeatUntil')}
                      </Text>
                      <DateTimePicker
                        minDate={toDate()}
                        value={values.until}
                        onValueChange={handleChange('until')}
                        hideTime
                      />
                      {Boolean(errors.until) && (
                        <HelperText
                          type="error"
                          visible={errors.until && touched.until}>
                          {I18n.get(`HELPER_TEXT_${errors.until}`)}
                        </HelperText>
                      )}
                    </View>
                  )}
                </View>

                <TextInput
                  error={errors.venue}
                  placeholder={I18n.get('PLACEHOLDER_venue')(values.location)}
                  label={I18n.get('EVENT_FORM_venue')}
                  value={values.venue}
                  onChangeText={handleChange('venue')}
                  onBlur={handleBlur('venue')}
                />
                <PickerInput
                  leftIcon="find"
                  rightIcon="environment"
                  value={values.location}
                  onPress={this._showLocationPicker}
                  placeholder={I18n.get('PLACEHOLDER_global')}
                  onPressRightIcon={() =>
                    stores.location.fetchLocation((value) =>
                      setFieldValue('location', value),
                    )
                  }
                />
                <View style={styles.gap} />
                <TextInput
                  error={errors.description}
                  placeholder={I18n.get('PLACEHOLDER_description')}
                  label={I18n.get('EVENT_FORM_description')}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  multiline
                />
              </View>
            </ScrollView>
            <LocationPicker
              visible={this.state.showLocationPicker}
              hideModal={this._hideLocationPicker}
              onSelect={handleChange('location')}
            />
          </>
        )}
      </Formik>
    );
  }
}

export default inject('stores')(observer(Form));
