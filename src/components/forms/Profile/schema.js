import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .max(50, 'tooLong')
    .required('nameIsRequired'),
  website: Yup.string().trim()
});