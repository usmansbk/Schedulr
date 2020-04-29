import * as Yup from 'yup';
import moment from 'moment';
import { canRecur, getTimeUnit } from 'lib/time';
import recurrence from './recurrence';

const emptyToNull= val => !val ? null : val;

export default Yup.object().shape({
  title: Yup.string()
    .required('titleIsRequired')
    .trim()
    .min(2, 'tooShort')
  ,
  description: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .nullable()
    .min(10, 'tooShort')
    .max(300, 'tooLong')
    .transform(emptyToNull)
  ,
  venue: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .transform(emptyToNull)
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
    .default(null)
    .when(['startAt', 'recurrence'],
    (startAt, recurrence, schema) => {
      const unit = getTimeUnit(recurrence);
      const nextDate = moment(startAt).add(1, unit);
      return schema.min(nextDate.toDate(), 'shortUntil');
    })
  ,
  recurrence: Yup.string()
    .required()
    .default(recurrence[0].id)
    .when(['startAt', 'endAt'],
    (startAt, endAt, schema) => {
      const validRecurrence = canRecur({ startAt, endAt });
      return schema.oneOf(validRecurrence, 'invalidDatesAndRecur');
    })
  ,
  forever: Yup.boolean()
    .default(false)
    .nullable()
  ,
  allDay: Yup.boolean()
    .default(false)
    .nullable()
  ,
  isPublic: Yup.boolean()
    .default(false)
    .nullable()
  ,
  geo_point: Yup.object().shape({
    lat: Yup.number().required(),
    lon: Yup.number().required()
  })
    .default(null)
    .nullable()
  ,
  location: Yup.string()
    .default(null)
    .nullable()
  ,
  category: Yup.string()
    .nullable()
    .default(null)
    .transform(emptyToNull)
});