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
import DateTimeInput from 'components/common/DateTimeInput';
import PickerInputModal from 'components/common/PickerInputModal';
import PickerButton from 'components/common/PickerButton';
import {
  isEventValid,
  canRepeat
} from 'lib/formValidator';
import { CANT_REPEAT } from 'lib/errorMessages';
import { getRepeatLabel, getRecurrence } from 'lib/time';
import { WHAT_IS_A_BOARD, BOARD_TIP } from 'lib/constants';
import formSchema from './schema';
import frequency from './frequency';
import { buildEventForm } from 'helpers/buildForm';

class Form extends React.Component {

  state = {
    visible: false
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  static defaultProps = {
    boards: [],
    initialValues: {
      title: '',
      description: '',
      venue: '',
      startAt: moment().valueOf(),
      endAt: moment().add(2, 'hours').valueOf(),
      allDay: false,
      eventType: 'Normal',
      repeat: frequency[0].id,
      forever: false,
      until: null,
      boardId: '',
      isPublic: true
    }
  }

  _boardHelp = () => {
    const newBoard = this.props.newBoard;
    const hasBoards = this.props.boards.length;
    let buttons = [];
    if (newBoard && !hasBoards) {
      buttons.push({ text: 'Create', onPress: newBoard });
    }
    buttons.push({text: "Ok", onPress: () => null });
    Alert.alert("What is a schedule?", WHAT_IS_A_BOARD, buttons);
  }

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(this.props.stores.appState.requestLocation);
  }

  render() {
    const {
      boards,
      locked,
      initialValues,
      onSubmit,
      handleCancel,
      edit,
      isNew,
      stores
    } = this.props;
    const { visible } = this.state;

    const styles = stores.appStyles.eventForm;
    const navButtonColor = stores.themeStore.colors.navButtonColor;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEventValid(values)) {
            const input = buildEventForm(values, stores.appState.location);
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
          <>
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
                placeholder="Title"
                label="Title"
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
              {errors.title}
              </HelperText>
              <TextInput
                placeholder="Description"
                label="Description"
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
                label="Venue"
                value={values.venue}
                onChangeText={handleChange('venue')}
                onBlur={handleBlur('venue')}
                mode="outlined"
              />
              <HelperText
                type="error"
                visible={errors.venue && touched.venue}
              >
              {errors.venue}
              </HelperText>
              
              <View style={[styles.pickerSpacing, styles.firstPicker]}>
                <Text style={styles.radioText}>Type</Text>
                <PickerButton
                  value={values.eventType}
                  onPress={this._showModal}
                />
              </View>
              <View style={styles.pickerSpacing}>
                <Text style={styles.radioText}>From</Text>
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
                <Text style={styles.radioText}>To</Text>
                <DateTimeInput
                  noMin
                  value={values.endAt}
                  disabled={values.allDay}
                  onChangeDate={(date) => setFieldValue('endAt', date)}
                />
              </View>
              <View style={styles.radio}>
                <Text style={styles.radioText}>All-day</Text>
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
                <Text style={styles.radioText}>Repetition</Text>
                <Picker
                  prompt="Repeat"
                  selectedValue={values.repeat}
                  style={styles.picker}
                  
                  itemStyle={styles.pickerItem}
                  onValueChange={itemValue => {
                    setFieldValue('repeat', itemValue);
                    if (values.until) {
                      const recur = getRecurrence(itemValue);
                      setFieldValue('until', moment(values.startAt).add(1, recur).valueOf());
                    } else {
                      setFieldValue('forever',  (itemValue !== frequency[0].id));
                    }
                  }}
                >
                  {
                    frequency.map(freq => (
                      <Picker.Item
                        key={freq.id}
                        label={getRepeatLabel(freq.id, values.startAt)}
                        value={freq.id}
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
                      {CANT_REPEAT}
                    </HelperText>
                  )
                }
              </View>
              <Divider />
              {
                (values.repeat !== frequency[0].id) && (
                  <>
                    <View style={styles.radio}>
                      <Text style={styles.radioText}>Repeat forever</Text>
                      <Switch
                        value={values.forever}
                        onValueChange={() => {
                          const prevValue = values.forever;
                          const newValue = !prevValue;
                          setFieldValue('forever', newValue);
                          if (newValue) {
                            setFieldValue('until', null);
                          } else {
                            const recur = getRecurrence(values.repeat);
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
                (values.repeat !== frequency[0].id && !values.forever) && (
                  <View style={styles.pickerSpacing}>
                    <Text style={styles.radioText}>Repeat until</Text>
                    <DateTimeInput
                      noMin
                      value={values.until}
                      onChangeDate={(date) => setFieldValue('until', date)}
                    />
                  </View>
                )
              }
              <View style={styles.radio}>
                <Text style={styles.radioText}>Public</Text>
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
                  <Text style={styles.radioText}>Schedule</Text>
                  <Text style={styles.radioText} onPress={this._boardHelp}>Help</Text>
                </View>
                <Picker
                  prompt="Select a schedule"
                  selectedValue={values.boardId}
                  style={styles.picker}
                  enabled={!locked }
                  itemStyle={styles.pickerItem}
                  onValueChange={itemValue => setFieldValue('boardId', itemValue)}
                >
                  <Picker.Item label={(boards.length === 0) ? "No schedule" : "Add to a schedule"} value="" />
                  {
                    boards.map(board => (
                      <Picker.Item key={board.id} label={board.name} value={board.id} />
                    ))
                  }
                </Picker>
                <HelperText
                  type="info"
                  visible={!values.boardId}
                >
                  {BOARD_TIP}
                </HelperText>
              </View>
            </View>
          </ScrollView>
          
          <PickerInputModal
            visible={visible}
            prompt="Type"
            selectedValue={values.eventType || ''}
            hideModal={this._hideModal}
            onValueChange={itemValue => setFieldValue('eventType', itemValue)}
          />
          </>
        )}
      </Formik>
    );    
  }
}

export default inject("stores")(observer(Form));