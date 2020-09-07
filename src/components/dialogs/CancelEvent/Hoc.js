import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withNavigation} from 'react-navigation';
import Dialog from './Dialog';
import {updateEvent} from 'api/mutations';
import {getEvent} from 'api/queries';
import buildOptimisticResponse from 'helpers/optimisticResponse';
import {UPDATE, ONE_TIME_EVENT} from 'lib/constants';

export default compose(
  withNavigation,
  graphql(gql(updateEvent), {
    alias: 'withCancelEventDialog',
    withRef: true,
    props: ({mutate, ownProps}) => ({
      cancelEvent: (input) =>
        mutate({
          variables: {
            input,
          },
          optimisticResponse: buildOptimisticResponse({
            input,
            mutationName: 'updateEvent',
            operationType: UPDATE,
            responseType: 'Event',
          }),
        }),
      ...ownProps,
    }),
  }),
  graphql(gql(getEvent), {
    withRef: true,
    options: (props) => ({
      fetchPolicy: 'cache-only',
      variables: {
        id: props.id,
      },
    }),
    props: ({data, ownProps}) => ({
      banner: data.getEvent.banner,
      cancelledDates: data.getEvent.cancelledDates || [],
      isSingle: data.getEvent.recurrence === ONE_TIME_EVENT,
      ...ownProps,
    }),
  }),
)(Dialog);
