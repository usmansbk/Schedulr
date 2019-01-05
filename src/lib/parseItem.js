import moment from 'moment';
import capitalizr, { decapitalize } from './capitalizr';
import { ONE_TIME_EVENT } from './constants';
import { Event } from '../types/types';

const START_TIME = 'hh:mm a';
const DATE_FORMAT = 'DD MM YYYY';

/**
 * Parse an event details to a simple readable format
 * @param { Event } event
 */
export const parseDetails = (event) => {
  const { endAt, allDay, startAt } = event;
  const eventType = decapitalize(event.eventType);
  const isRecurring = event.repeat !== ONE_TIME_EVENT;
  const repeat = decapitalize(event.repeat);
  const note = `${isRecurring ? (repeat + ' ') : ''}${eventType}`;
  if (allDay) return note;
  const duration = moment(Date.parse(endAt)).from(Date.parse(startAt), true);
  return capitalizr(`${duration} ${note}`);
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
