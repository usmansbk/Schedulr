import * as Yup from 'yup';

const emptyToNull= val => !val ? null : val;

export default Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .required('nameIsRequired'),
  description: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .min(10, 'tooShort')
    .max(300, 'tooLong')
    .transform(emptyToNull),
  topic: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .transform(emptyToNull),
  isPublic: Yup.boolean()
    .nullable()
    .default(true),
  geo_point: Yup.object().shape({
    lat: Yup.number().required(),
    lon: Yup.number().required()
  })
    .default(null)
    .nullable(),
  location: Yup.string()
    .default(null)
    .nullable()
    .transform(emptyToNull)
  ,
});