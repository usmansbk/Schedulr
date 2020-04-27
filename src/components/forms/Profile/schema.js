import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .max(51, 'tooLong')
    .required('nameIsRequired'),
  bio: Yup.string()
    .trim()
    .min(5, 'tooShort')
    .max(250, 'tooLong')
});