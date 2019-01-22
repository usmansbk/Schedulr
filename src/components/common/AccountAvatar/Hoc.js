import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import Container from './Container';
import { Me } from '../../../graphql/queries';

export default compose(
	withNavigation,
	graphql(gql(Me), {
		alias: 'withAccountAvatar',
		options: {
			fetchPolicy: 'cache-only',
		},
		props: ({ data }) => ({
			me: data && data.me || undefined
		}),
	})
)(Container);