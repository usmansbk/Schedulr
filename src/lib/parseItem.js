import moment from 'moment';
import capitalizr, { decapitalize } from './capitalizr';
import { Event } from '../types/types';

const START_TIME = 'hh:mm a';
const DATE_FORMAT = 'DD MM YYYY';
const REMINDER = 'REMINDER'

/**
 * Parse an event details to a simple readable format
 * @param { Event } param0
 */
export const parseDetails = ({ eventType, repeat, endAt, allDay, startAt }) => {
  const recurrence = repeat === 'NEVER' ? '' : (decapitalize(repeat));
  if ((eventType === REMINDER) || allDay) return `${recurrence ? (recurrence + ' ' + decapitalize(eventType, true)) : decapitalize(eventType)}`;
  const duration = moment(Date.parse(endAt)).from(Date.parse(startAt), true);
  return capitalizr(`${duration} ${eventType.toLowerCase()} ${recurrence.toLowerCase()}`);
};

/**
 * 
 * @param { Event } param0 
 */
export const startTime = ({ allDay, startAt }) => {
  return  allDay ? 'All-day' : moment(Date.parse(startAt)).format(START_TIME).toUpperCase()
};

/**
 * 
 * @param { Event } param0 
 */
export const endTime = ({ endAt, startAt }) => {
  const parsedEnd = Date.parse(endAt);
  const parsedStart = Date.parse(startAt);

  const startDay = moment(parsedStart).format(DATE_FORMAT);
  const isSameDay = (startDay === moment(parsedEnd).format(DATE_FORMAT));
  return (isSameDay) ? moment(parsedEnd).format(START_TIME).toUpperCase() : '';
};

/**
 * 
 * @param { Event } param0 
 */
export const isStarted = ({ isCancelled, startAt, endAt }) => {
  return (!isCancelled && (Date.now() > Date.parse(startAt)) && (Date.now() < Date.parse(endAt)));
};
