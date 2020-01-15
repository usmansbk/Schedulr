import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'tooShort')
    .required('nameIsRequired'),
  description: Yup.string()
    .trim(),
  topic: Yup.string().trim()
});