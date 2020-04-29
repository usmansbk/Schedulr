import * as Yup from 'yup';
import moment from 'moment';
import { repeatLength, canRecur } from 'lib/time';

const emptyToNull= val => !val ? null : val;

export default Yup.object().shape({
  title: Yup.string()
    .required('titleIsRequired')
    .trim()
    .min(2, 'tooShort')
  ,
  description: Yup.string()
    .trim()
    .min(10, 'tooShort')
    .max(300, 'tooLong')
    .transform(emptyToNull)
    .nullable()
  ,
  venue: Yup.string()
    .trim()
    .transform(emptyToNull)
    .nullable()
  ,
  eventScheduleId: Yup.string()
    .required()
  ,
  startAt: Yup.date()
    .required()
    .when('endAt', (endAt, schema) => (
      schema.max(moment(endAt).subtract(5, 'minutes').toDate(), 'durationTooShort')
    ))
  ,
  endAt: Yup.date()
    .required()
    .min(moment().toDate(), 'invalidEndDate')
  ,
  until: Yup.date()
    .nullable()
    .when(['endAt', 'recurrence'],
    (endAt, recurrence, schema) => {
      const length = repeatLength(recurrence);
      const duration = moment.duration(length);
      const minFinalDate = moment(endAt).add(duration, 'ms');
      return schema.min(minFinalDate.toDate(), 'shortUntil');
    })
  ,
  recurrence: Yup.string()
    .required()
    .when(['startAt', 'endAt'],
    (startAt, endAt, schema) => {
      const possibleRecurrence = canRecur({ startAt, endAt });
      return schema.oneOf(possibleRecurrence, 'invalidDatesAndRecur');
    })
  ,
  forever: Yup.boolean()
    .nullable()
});