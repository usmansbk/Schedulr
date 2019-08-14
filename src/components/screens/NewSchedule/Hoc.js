import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { createSchedule } from 'api/mutations';

const alias =  'withNewScheduleContainer';

export default inject("stores")(observer(
  graphql(gql(createSchedule), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
      }),
      ...ownProps
    })
  })(Screen)
));