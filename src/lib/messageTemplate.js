import moment from 'moment';
import capitalizr, { decapitalize } from './capitalizr';

export default function (event) {
  const start = Date.parse(event.start);
  const end = Date.parse(event.end);
  const {
    description,
    location,
    name,
    eventType,
  } = event;
  const startDate = moment(start).calendar().toString();
  const duration = moment(end).from(start, true);

  let message = `${name},\n${duration} ${decapitalize(eventType)},\n${decapitalize(startDate)}.\n`;
  if (location) {
    message += "At " + location + ",\n";
  }
  if (description) {
    message += capitalizr(description) + '.\n';
  }
  return message;
}