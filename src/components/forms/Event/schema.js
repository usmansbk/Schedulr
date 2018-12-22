import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Title is required'),
  description: Yup.string()
    .max(160, 'Too Long'),
  location: Yup.string()
    .max(160, 'Too Long'),
  boardId: Yup.string()
    .required('Board is required')
});