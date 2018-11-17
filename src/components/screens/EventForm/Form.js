import React from 'react';
import {
  Content,
  Item,
  Input,
  Picker,
  Icon,
  Text,
} from 'native-base';
import {
  ToastAndroid,
  View,
  TouchableNativeFeedback,
  RefreshControl
} from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './styles';
import { decapitalize } from '../../../lib/capitalizr';
import i18n from '../../../config/i18n';

const format = 'ddd, Do MMM YYYY, h:mm a';

export default class EventForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEndTimeVisible: false,
      isStartTimeVisible: false,
    }
  }

  _onReset = () => !this.props.edit && this.props.onReset;

  render() {
    const {
      name,
      description,
      start,
      end,
      eventType,
      groupId,
      repeat,
      groups,
      location,
      frequency,
      loading,
      eventTypes,
      handleDatePicked,
      onValueChange,
      onTextChange,
      edit,
      isGroup
    } = this.props;

    const { 
      isEndTimeVisible,
      isStartTimeVisible,
    } = this.state;

    const formattedStart = moment(start).format(format);
    const formattedEnd = moment(end).format(format);
  
    return (
      <Content
        padder
        refreshControl={<RefreshControl refreshing={!edit && loading} onRefresh={this._onReset} />}
      >
        <Item>
          <Input
            onChangeText={(value) => onTextChange('name', value)}
            value={name} placeholder={i18n.t('event_form.title')} />
        </Item>
        <Item
          style={styles.spacing}
        >
          <Picker
            mode="dialog"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder={i18n.t('event_form.type')}
            selectedValue={eventType}
            onValueChange={(value) => onValueChange('eventType', value)}
          >
            {
              eventTypes.map(eventType => (
                <Picker.Item
                  label={decapitalize(eventType)}
                  value={eventType}
                  key={eventType}
                />
              ))
            }
          </Picker>
        </Item>
        <Item style={styles.spacing}>
          <Input
            multiline
            value={description}
            onChangeText={(value) => onTextChange('description', value)}
            rowSpan={3} bordered placeholder={i18n.t('event_form.description')}
          />
        </Item>
        <Item style={styles.spacing}>
          <Icon style={styles.icon} name="map-pin" type="Feather"/>
          <Input
            multiline
            dataDetectorTypes="address"
            onChangeText={(value) => onTextChange('location', value)}
            value={location} placeholder={i18n.t('event_form.location')} />
        </Item>
        <Item style={styles.spacing}>
          <Icon
            name="clock"
            type="Feather"
            style={[styles.marginRight, styles.icon]}
            onPress={() => ToastAndroid.show(i18n.t('toast.start_time'), ToastAndroid.SHORT)}
          />
          <TouchableNativeFeedback
            onPress={() => this.setState({isStartTimeVisible: true})}
            style={{ flexGrow: 1, backgroundColor: 'blue' }}
          >
            <View style={styles.itemText}>
              <Text uppercase={false}>{formattedStart}</Text>  
            </View>
          </TouchableNativeFeedback>
        </Item>

        <DateTimePicker
          mode="datetime"
          minimumDate={new Date()}
          date={new Date(start)}
          isVisible={isStartTimeVisible}
          onConfirm={(date) => this.setState({ isStartTimeVisible: false }, () => {
            handleDatePicked('start', date)
          })}
          onCancel={() => this.setState({isStartTimeVisible: false})}
        />
  
        <Item style={styles.spacing}>
          <Icon
            name="clock"
            type="Feather"
            style={[styles.marginRight, styles.icon]}
            onPress={() => ToastAndroid.show(i18n.t('toast.end_time'), ToastAndroid.SHORT)}
          />
          <TouchableNativeFeedback
            onPress={() => this.setState({isEndTimeVisible: true})}
          >
            <View style={styles.itemText}>
              <Text uppercase={false}>{formattedEnd}</Text>    
            </View>
          </TouchableNativeFeedback>
        </Item>

        <DateTimePicker
          mode="datetime"
          minimumDate={new Date()}
          date={new Date(end)}
          isVisible={isEndTimeVisible}
          onConfirm={(date) => this.setState({ isEndTimeVisible: false }, () => {
            handleDatePicked('end', date)
          })}
          onCancel={() => this.setState({isEndTimeVisible: false})}
        />
  
        <Item
          style={styles.spacing}
        >
          <Icon
            style={styles.icon}
            name="repeat"
            type="Feather"
            onPress={() => ToastAndroid.show(i18n.t('toast.repeat'), ToastAndroid.SHORT)}
          />
          <Picker
            mode="dialog"
            style={styles.picker}
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder={i18n.t('event_form.repeat')}
            selectedValue={repeat}
            onValueChange={(value) => onValueChange('repeat', value)}
          >
            {
              frequency.map(freq => (
                <Picker.Item
                  label={freq === 'ONCE' ? 'One-time event' : decapitalize(freq)}
                  value={freq}
                  key={freq}
                />
              ))
            }
          </Picker>
        </Item>

        <Item last style={styles.spacing} disabled={edit}>
          <Icon
            style={styles.icon}
            type="Feather"
            name="users"
            onPress={() => ToastAndroid.show(i18n.t('toast.group'), ToastAndroid.SHORT)}
          />
          <Picker
            mode="dialog"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder={i18n.t('event_form.group')}
            selectedValue={groupId}
            onValueChange={(value) => onValueChange('groupId', value)}
            enabled={!edit && !isGroup}
          >
            <Picker.Item value='' label="Select group (required)" />
            {
              groups.map(group => (
                <Picker.Item
                  label={group.node.name}
                  value={group.node.id}
                  key={group.node.id}
                />
              ))
            }
          </Picker>
        </Item>
      </Content>
    )
  }
}
