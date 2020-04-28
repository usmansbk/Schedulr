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
import EventTypeInput from 'components/common/EventTypeInput';
import PickerButton from 'components/common/PickerButton';
import Alert from 'components/dialogs/Alert';
import Suspense from 'components/common/Suspense';
import {
  isEventValid,
  canRepeat,
  buildForm
} from 'lib/formValidator';
import { getRepeatLabel, getTimeUnit } from 'lib/time';
import formSchema from './schema';
import recurrence from './recurrence';

class Form extends React.Component {

  state = {
    showEventTypePicker: false,
    showScheduleHelpAlert: false,
    display: false
  };

  _showEventTypePicker = () => this.setState({ showEventTypePicker: true });

  _hideModal = () => this.setState({
    showScheduleHelpAlert: false,
    showEventTypePicker: false,
  });
  _scheduleHelp = () => this.setState({ showScheduleHelpAlert: true });

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
      showEventTypePicker,
      showScheduleHelpAlert,
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
        validationSchema={formSchema}
        onSubmit={(values) => {
          if (isEventValid(values)) {
            values.venue = values.venue || values.location;
            const input = buildForm(values);
            input.geo_point = stores.locationStore.point;
            setTimeout(() => {
              onSubmit && onSubmit(input);
            },0);
          }
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
                placeholder={I18n.get("EVENT_FORM_title")}
                label={I18n.get("EVENT_FORM_title")}
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                mode="outlined"
                style={styles.textInput}
              />
              <HelperText
                type="error"
                visible={errors.title && touched.title}
              >
              {errors.title && I18n.get(`HELPER_TEXT_${errors.title}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("EVENT_FORM_description")}
                label={I18n.get("EVENT_FORM_description")}
                value={values.description}
                multiline
                maxHeight={120}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                mode="outlined"
                style={styles.textInput}
              />
              <HelperText
                type="error"
                visible={errors.description && touched.description}
              >
              {errors.description && I18n.get(`HELPER_TEXT_${errors.description}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("PLACEHOLDER_venue")(values.location)}
                label={I18n.get("EVENT_FORM_venue")}
                value={values.venue}
                onChangeText={handleChange('venue')}
                onBlur={handleBlur('venue')}
                mode="outlined"
                style={styles.textInput}
              />
              <HelperText
                type="error"
                visible={errors.venue && touched.venue}
              >
              {errors.venue && I18n.get(`HELPER_TEXT_${errors.venue}`)}
              </HelperText>
              {
                !locked && (
                  <View style={[styles.pickerSpacing, styles.firstPicker]}>
                    <View style={styles.row}>
                      <Text style={styles.radioText}>{I18n.get("EVENT_FORM_schedule")}</Text>
                      <Text style={styles.radioText} onPress={this._scheduleHelp}>{I18n.get("BUTTON_help")}</Text>
                    </View>
                    <Picker
                      prompt={I18n.get("EVENT_FORM_selectASchedule")}
                      value={values.eventScheduleId}
                      disabled={locked}
                      onValueChange={itemValue => {
                        setFieldValue('eventScheduleId', itemValue);
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
              <View style={[styles.pickerSpacing, styles.firstPicker]}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_category")}</Text>
                <PickerButton
                  value={values.category}
                  onPress={this._showEventTypePicker}
                />
              </View>
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_from")}</Text>
                <DateTimeInput
                  noMin
                  disabled={values.allDay}
                  value={values.startAt}
                  hideTime={values.allDay}
                  onChangeDate={(date) => {
                    const prevStartAt = moment(values.startAt);
                    const prevEndAt = moment(values.endAt);

                    setFieldValue('startAt', date);
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
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_to")}</Text>
                <DateTimeInput
                  noMin
                  value={values.endAt}
                  disabled={values.allDay}
                  hideTime={values.allDay}
                  onChangeDate={(date) => setFieldValue('endAt', date)}
                />
              </View>
              <View style={styles.radio}>
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
                  onValueChange={itemValue => {
                    setFieldValue('recurrence', itemValue);
                    if (itemValue === recurrence[0].id) {
                      setFieldValue('until', null);
                      setFieldValue('forever', false);
                    } else if (values.until) {
                      const unit = getTimeUnit(itemValue);
                      setFieldValue('until', moment(values.startAt).add(1, unit).toISOString());
                    }
                  }}
                  items={recurrence.map(recur => ({
                    key: recur.id,
                    label: getRepeatLabel(recur.id, values.startAt),
                    value: recur.id
                  }))}
                />
                {
                  (!canRepeat(values)) && (
                    <HelperText
                      type="error"
                      visible={true}
                    >
                      {I18n.get("HELPER_TEXT_invalidDatesAndRecur")}
                    </HelperText>
                  )
                }
              </View>
              {
                (values.recurrence !== recurrence[0].id) && (
                  <View style={styles.radio}>
                    <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repeatForever")}</Text>
                    <Switch
                      value={values.forever}
                      onValueChange={() => {
                        const forever = values.forever;
                        if (!forever) {
                          setFieldValue('until', null);
                        } else {
                          const unit = getTimeUnit(values.recurrence);
                          setFieldValue('until', moment(values.startAt).add(2, unit).toISOString());
                        }
                        setFieldValue('forever', !forever);
                      }}
                    />
                  </View>
                )
              }
              {
                (values.recurrence !== recurrence[0].id && !values.forever) && (
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repeatUntil")}</Text>
                    <DateTimeInput
                      noMin
                      value={values.until}
                      onChangeDate={(date) => setFieldValue('until', date)}
                    />
                  </View>
                )
              }
            </View>
          </ScrollView>
          <EventTypeInput
            visible={showEventTypePicker}
            prompt={I18n.get("EVENT_FORM_category")}
            selectedValue={values.category || ''}
            hideModal={this._hideModal}
            onValueChange={itemValue => setFieldValue('category', itemValue)}
          />
          <Alert
            visible={showScheduleHelpAlert}
            title={I18n.get("ALERT_whatIsASchedule")}
            message={I18n.get("ALERT_whatIsAScheduleA")(schedules.find(schdl => schdl.id === values.eventScheduleId))}
            handleDismiss={this._hideModal}
          />
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));