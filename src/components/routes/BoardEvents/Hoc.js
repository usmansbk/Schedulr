import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Analytics } from 'aws-amplify';
import Screen from './Screen';
import { getBoard, listAllEvents } from '../../../graphql/queries';

const alias = 'withBoardEventsContainer';

export default compose(
  graphql(gql(getBoard), {
    alias,
    options: props => ({
      variables: {
        id: props.id,
      },
      fetchPolicy: 'cache-only'
    }),
    props: ({ data, ownProps }) => ({
      error: data.error,
      loading: data.loading,
      onRefresh: async () => {
        try {
          await data.refetch()
        } catch(e) {
          console.log(e);
          // Log error if it occurs multiple times
          Analytics.record({
            name: e.name,
            attributes: {
              message: e.message,
              component: alias
            }
          })
        }
      },
      board: data && data.getBoard,
      ...ownProps,
    })
  }),
  graphql(gql(listAllEvents), {
    alias,
    options: props => ({
      fetchPolicy: 'cache-only',
    }),
    props: ({ data, ownProps}) => ({
      fetchingEvents: data.loading,
      fetchingEventsError: data.error,
      events: data && data.listAllEvents && data.listAllEvents.items,
      nextToken: data && data.listAllEvents && data.listAllEvents.nextToken,
      onRefreshEvents: async () => {
        try {
          await data.refetch()
        } catch(e) {
          console.log(e);
          // Log error if it occurs multiple times
          Analytics.record({
            name: e.name,
            attributes: {
              message: e.message,
              component: alias
            }
          })
        }
      },
      ...ownProps
    })
  })
)(Screen);