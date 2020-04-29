import * as Yup from 'yup';

const emptyToNull= val => !val ? null : val;

export default Yup.object().shape({
  name: Yup.string()
    .required('nameIsRequired')
    .trim()
    .min(2, 'tooShort')
    .max(51, 'tooLong'),
  bio: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .min(5, 'tooShort')
    .max(250, 'tooLong')
    .transform(emptyToNull),
  website: Yup.string()
    .nullable()
    .default(null)
    .trim()
    .transform(emptyToNull),
});