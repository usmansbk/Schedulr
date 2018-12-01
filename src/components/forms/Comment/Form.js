import React from 'react';
import { Formik } from 'formik';
import CommentInput from '../../common/CommentInput';

export default () => (
  <Formik>
    {() => (
      <CommentInput
      />
    )}
  </Formik>
)