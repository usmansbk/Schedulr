import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .max(50, 'tooLong')
    .required('titleIsRequired'),
  description: Yup.string()
    .trim()
    .max(700, 'tooLong'),
  eventScheduleId: Yup.string()
    .required()
});