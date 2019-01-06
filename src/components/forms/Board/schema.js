import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim()
    .max(160, 'Too Long'),
});