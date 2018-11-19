import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Name is required'),
  description: Yup.string()
    .max(160, 'Too Long'),
  link: Yup.string()
  // groupId: Yup.number()
  //   .required('Event group is required')
});