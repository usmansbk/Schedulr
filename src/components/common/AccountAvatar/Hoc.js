import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';
import { userLogin } from '../../../graphql/queries';

export default graphql(gql(userLogin), {
	alias: 'withAccountAvatar',
	fetchPolicy: 'cache-only',
	props: ({ data }) => ({
		me: data && data.me
	})
})(Container);