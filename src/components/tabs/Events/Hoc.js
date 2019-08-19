import { graphql, compose } from 'react-apollo';
import { withNavigationFocus } from 'react-navigation';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import Events from './Events';

const alias = 'withEventsContainer';

export default (
  compose(
    withNavigationFocus,
    graphql(gql(getUserData), {
      alias,
      options: props => ({
        fetchPolicy: 'cache-only',
        variables: {
          id: props.id
        }
      }),
      props: ({ data, ownProps}) => ({
        data: data && data.getUserData,
        ...ownProps
      })
    }),
  )(Events)
);