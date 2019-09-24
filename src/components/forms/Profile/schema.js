import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .max(50, 'tooLong')
    .required('nameIsRequired'),
  bio: Yup.string()
    .trim()
    .min(5, 'tooShort')
    .max(81, 'tooLong')
});