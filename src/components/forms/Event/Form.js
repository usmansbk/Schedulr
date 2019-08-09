import React from 'react';
import moment from "moment";
import isEqual from 'lodash.isequal';
import {
  View,
  Picker,
  ScrollView,
  RefreshControl,
  Alert,
  InteractionManager
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  HelperText,
  Appbar,
  Switch,
  Divider
} from 'react-native-paper';
import { Formik } from 'formik';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import DateTimeInput from 'components/common/DateTimeInput';
import PickerInputModal from 'components/common/PickerInputModal';
import PickerButton from 'components/common/PickerButton';
import {
  isEventValid,
  canRepeat
} from 'lib/formValidator';
import { getRepeatLabel, getRecurrence } from 'lib/time';
import formSchema from './schema';
import recurrence from './recurrence';
import { buildEventForm } from 'helpers/buildForm';

class Form extends React.Component {

  state = {
    showPicker: false
  };

  _showModal = () => this.setState({ showPicker: true });
  _hideModal = () => this.setState({ showPicker: false });

  static defaultProps = {
    schedules: [],
    initialValues: {
      title: '',
      description: '',
      venue: '',
      startAt: moment().valueOf(),
      endAt: moment().add(2, 'hours').valueOf(),
      allDay: false,
      category: 'Normal',
      recur: recurrence[0].id,
      until: null,
      // scheduleId: '',
      isPublic: true
    }
  }

  _scheduleHelp = () => {
    const newSchedule = this.props.newSchedule;
    const hasSchedules = this.props.schedules.length;
    let buttons = [];
    if (newSchedule && !hasSchedules) {
      buttons.push({ text: I18n.get("BUTTON_create"), onPress: newSchedule });
    }
    buttons.push({text: I18n.get("BUTTON_ok"), onPress: () => null });
    Alert.alert(I18n.get("ALERT_whatIsASchedule"), I18n.get("ALERT_whatIsAScheduleA"), buttons);
  }

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(this.props.stores.appState.requestLocation);
  }

  render() {
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
    const { showPicker } = this.state;

    const styles = stores.appStyles.eventForm;
    const navButtonColor = stores.themeStore.colors.navButtonColor;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEventValid(values)) {
            const input = buildEventForm(values, stores.appState.location);
            console.log(input);
            // onSubmit && await onSubmit(input);
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
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => resetForm()}
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
                autoFocus
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
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                mode="outlined"
              />
              <HelperText
                type="error"
                visible={errors.description && touched.description}
              >
              {errors.description && I18n.get(`HELPER_TEXT_${errors.description}`)}
              </HelperText>
              <TextInput
                placeholder={I18n.get("EVENT_FORM_venue")}
                label={I18n.get("EVENT_FORM_venue")}
                value={values.venue}
                onChangeText={handleChange('venue')}
                onBlur={handleBlur('venue')}
                mode="outlined"
              />
              <HelperText
                type="error"
                visible={errors.venue && touched.venue}
              >
              {errors.venue && I18n.get(`HELPER_TEXT_${errors.venue}`)}
              </HelperText>
              
              <View style={[styles.pickerSpacing, styles.firstPicker]}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_category")}</Text>
                <PickerButton
                  value={values.category}
                  onPress={this._showModal}
                />
              </View>
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_from")}</Text>
                <DateTimeInput
                  noMin
                  disabled={values.allDay}
                  value={values.startAt}
                  onChangeDate={(date) => {
                    const prevStartAt = values.startAt;
                    const prevEndAt = values.endAt;

                    setFieldValue('startAt', date);
                    if (values.allDay) {
                      setFieldValue('endAt', moment(date).endOf('day').valueOf());
                    } else {
                      const prevDuration = Math.abs(prevEndAt - prevStartAt);
                      const newEnd = moment(date).add(prevDuration, 'milliseconds').valueOf();
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
                      setFieldValue('startAt', moment(values.startAt).startOf('day').valueOf());
                      setFieldValue('endAt', moment(values.startAt).endOf('day').valueOf());
                    }
                  }}
                />
              </View>
              <Divider />
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repetition")}</Text>
                <Picker
                  prompt={I18n.get("EVENT_FORM_repeat")}
                  selectedValue={values.recur}
                  style={styles.picker}
                  
                  itemStyle={styles.pickerItem}
                  onValueChange={itemValue => {
                    setFieldValue('recur', itemValue);
                    if (itemValue === recurrence[0].id) {
                      setFieldValue('until', null);
                    } else if (values.until) {
                      const recur = getRecurrence(itemValue);
                      setFieldValue('until', moment(values.startAt).add(1, recur).valueOf());
                    }
                  }}
                >
                  {
                    recurrence.map(recur => (
                      <Picker.Item
                        key={recur.id}
                        label={getRepeatLabel(recur.id, values.startAt)}
                        value={recur.id}
                      />
                    ))
                  }
                </Picker>
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
              <Divider />
              {
                (values.recur !== recurrence[0].id) && (
                  <>
                    <View style={styles.radio}>
                      <Text style={styles.radioText}>{I18n.get("EVENT_FORM_repeatForever")}</Text>
                      <Switch
                        value={!Boolean(values.until)}
                        onValueChange={() => {
                          const until = values.until;
                          if (until) {
                            setFieldValue('until', null);
                          } else {
                            const recur = getRecurrence(values.recur);
                            setFieldValue('until', moment(values.startAt).add(2, recur).valueOf());
                          }
                        }}
                      />
                    </View>
                    <Divider />
                  </>
                )
              }
              {
                (values.recur !== recurrence[0].id && values.until) && (
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
              <View style={styles.radio}>
                <Text style={styles.radioText}>{I18n.get("EVENT_FORM_public")}</Text>
                <Switch
                  value={values.isPublic}
                  onValueChange={() => {
                    const { isPublic } = values;
                    setFieldValue('isPublic', !isPublic);
                  }}
                />
              </View>
              <Divider />
              <View style={styles.pickerSpacing}>
                <View style={styles.row}>
                  <Text style={styles.radioText}>{I18n.get("EVENT_FORM_schedule")}</Text>
                  <Text style={styles.radioText} onPress={this._scheduleHelp}>{I18n.get("BUTTON_help")}</Text>
                </View>
                <Picker
                  prompt={I18n.get("EVENT_FORM_selectASchedule")}
                  selectedValue={values.scheduleId}
                  style={styles.picker}
                  enabled={!locked }
                  itemStyle={styles.pickerItem}
                  onValueChange={itemValue => setFieldValue('scheduleId', itemValue)}
                >
                  <Picker.Item label={(schedules.length === 0) ? I18n.get("EVENT_FORM_noSchedule") : I18n.get("EVENT_FORM_addToASchedule")} value="" />
                  {
                    schedules.map(schedule => (
                      <Picker.Item key={schedule.id} label={schedule.name} value={schedule.id} />
                    ))
                  }
                </Picker>
                <HelperText
                  type="info"
                  visible={!values.scheduleId}
                >
                  {I18n.get("HELPER_TEXT_recommended")}
                </HelperText>
              </View>
            </View>
          </ScrollView>
          
          <PickerInputModal
            visible={showPicker}
            prompt={I18n.get("EVENT_FORM_category")}
            selectedValue={values.category || ''}
            hideModal={this._hideModal}
            onValueChange={itemValue => setFieldValue('category', itemValue)}
          />
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));