import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .required('titleIsRequired'),
  description: Yup.string()
    .trim(),
  eventScheduleId: Yup.string()
    .required()
});