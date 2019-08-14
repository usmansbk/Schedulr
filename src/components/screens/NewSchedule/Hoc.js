import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import shortid from 'shortid';
import { inject, observer } from 'mobx-react';
import Screen from './Screen';
import { createSchedule } from 'api/mutations';
// import { listAllSchedules } from 'api/queries';
// import { createScheduleResponse } from 'helpers/optimisticResponse';

const alias =  'withNewScheduleContainer';

export default inject("stores")(observer(
  graphql(gql(createSchedule), {
    alias,
    props: ({ mutate, ownProps }) => ({
      onSubmit: (input) => mutate({
        variables: {
          input: {
            id: `${ownProps.stores.appState.userId}-${shortid.generate()}`,
            ...input
          }
        },
      }),
      ...ownProps
    })
  })(Screen)
));