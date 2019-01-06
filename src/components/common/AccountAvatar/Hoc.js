import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import Container from './Container';
import { userLogin } from '../../../graphql/queries';

export default compose(
	withNavigation,
	graphql(gql(userLogin), {
		alias: 'withAccountAvatar',
		fetchPolicy: 'cache-only',
		props: ({ data }) => ({
			me: data && data.me
		})
	})
)(Container);