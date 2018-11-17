import React from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Container,
} from 'native-base';
import { ToastAndroid } from 'react-native';
import moment from 'moment';
import Form from './Form';
import {
  getEnd,
  getStart
} from '../../../lib/time';
import {
  MAX_NAME_LEN,
  MAX_STR_LEN
} from '../../../lib/constants';
import IconButton from '../../common/IconButton';
import i18n from '../../../config/i18n';

const eventTypes = [
  'LECTURE',
  'EVENT',
  'TEST',
  'TUTORIAL',
  'PRACTICAL',
  'EXAMINATION',
  'HOBBY',
  'STUDIES',
  'WORK',
  'SPORT',
  'MEETING',
  'FESTIVAL',
  'CEREMONY',
  'COMPETITION',
  'FUNFARE',
  'PARTY',
  'HAPPENING',
  'INTERVIEW',
];

const frequency = [
  'ONCE',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
];

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this._default(),
    }
  }

  _default = () => ({
    name: this.props.initialName || '',
    description: this.props.initialDescription || '',
    start: getStart(this.props.initialStart, this.props.initialRecurrence, this.props.edit),
    end: getEnd(this.props.initialEnd, this.props.initialRecurrence, this.props.edit),
    eventType: this.props.initialType || eventTypes[0],
    location: this.props.initialLocation || '',
    repeat: this.props.initialRecurrence || frequency[0],
    groupId: this.props.initialGroupId || '',
  });

  _onReset = () => {
    this.setState({
      event: this._default(),
    }, () => ToastAndroid.show(i18n.t('toast.form_reset'), ToastAndroid.SHORT));
  }

  handleSubmit = () => {
    const { onSubmit, isClosed } = this.props;
    if (isClosed) {
      ToastAndroid.show('This group is closed!', ToastAndroid.SHORT);
    } else {
      onSubmit(this.state);
    }
  }

  handleDatePicked = (name, date) => {
    date = moment(Date.parse(date)).toISOString(true);
    const { event } = this.state;
    event[name] = date;
    if (name === 'start') {
      event['end'] = moment(date).add(2, 'hours').toISOString(true);
    }
    this.setState({ event });
  }

  onTextChange = (name, value) => {
    const { event } = this.state;
    if (name === 'name' && value.length > MAX_NAME_LEN) {
      ToastAndroid.show(i18n.t('input.warn_51'), ToastAndroid.SHORT);
      return;
    }
    if (value.length < MAX_STR_LEN) {
      event[name] = value;
    } else {
      ToastAndroid.show(i18n.t('input.warn'), ToastAndroid.SHORT);
    }
    this.setState({ event })
  }

  onValueChange = (name, value) => {
    const { event } = this.state;
    event[name] = value;
    this.setState({ event });
  };

  render() {
    const { event } = this.state;
    const {
      name,
      description,
      start,
      end,
      eventType,
      location,
      repeat,
      groupId,
    } = event;
    const { groups, loading, edit, isGroup } = this.props;

    return (
      <Container>
        <Header transparent>
          <Left>
            <IconButton
              onPress={this.props.onBack}
              name="x"
              type="Feather"
              color="black"
            />
          </Left>
          <Body>
          </Body>
          <Right>
            <IconButton
              name="check"
              type="Feather"
              color="black"
              disable={loading}
              onPress={this.handleSubmit}
            />
          </Right>
        </Header>
        <Form
          name={name}
          description={description}
          start={start}
          end={end}
          eventType={eventType}
          eventTypes={eventTypes}
          location={location}
          repeat={repeat}
          groupId={groupId}

          edit={edit}
          isGroup={isGroup}
          loading={loading}
          groups={groups}
          frequency={frequency}
          handleImageSelect={this.handleImageSelect}
          handleDatePicked={this.handleDatePicked}
          onValueChange={this.onValueChange}
          onTextChange={this.onTextChange}
          onReset={this._onReset}
          onNewGroup={this.props.onNewGroup}
        />
      </Container>
    )
  }
}