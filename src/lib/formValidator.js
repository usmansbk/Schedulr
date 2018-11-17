import { ToastAndroid, Alert } from 'react-native';
import {
  repeatLength
} from './time';

const notify = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export function todoValidator(todo) {
  if (!todo.id) {
    notify('Select an event');
    return false;
  } else if (!todo.task) {
    notify('Enter a task');
    return false;
  }
  return true;
}

export function groupValidator(group) {
  let validity = true;
  if (!group.name) {
    notify('Name is empty');
    validity = false;
  }
  return validity;
}

export function eventValidator(event, groups) {
  if (groups && !groups.length) {
    Alert.alert("Groups", "You don't belong to any group. Follow or create one.")
    return false;
  }
  let validity = true;
  if (!event.name) {
    notify('Title is empty');
    validity = false;
  } else if (!canRepeat(event)) {
    Alert.alert("Repeat", "Event's duration should be shorter than repeat frequency.");
    validity = false;
  } else if ( Date.parse(event.start) > Date.parse(event.end)) {
    Alert.alert('Duration', 'End date should be greater than start date.');
    validity = false;
  } else if (!event.groupId) {
    Alert.alert('Group', 'Event should belong to a group.');
    validity = false;
  } else if (!event.start) {
    notify('Start date is required');
    validity = false;
  } else if (!event.end) {
    notify('End date is required');
    validity = false;
  }
  return validity;
}

const canRepeat = (event) => {
  if (event.repeat === 'ONCE') return true;
  const duration = Math.abs(Date.parse(event.end) - Date.parse(event.start));
  return duration < repeatLength(event.repeat);
};
