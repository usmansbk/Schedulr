import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { createSchedule } from 'api/mutations';
import updateApolloCache from 'helpers/updateApolloCache';
import Screen from './Screen';

const alias =  'withNewScheduleContainer';

export default inject("stores")(observer(
  graphql(gql(createSchedule), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input
        },
        update: (cache, { data: { createSchedule } }) => (
          updateApolloCache(cache, createSchedule, 'ADD')
        )
      }),
      ...ownProps
    })
  })(Screen)
));