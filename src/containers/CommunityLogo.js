import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Spinner } from 'native-base';
import Logo from '../components/common/Logo';
import COMMUNITY from '../graphql/localState/query/Community';

export default class CommunityLogo extends PureComponent {
  render() {
    return (
      <Query query={COMMUNITY}>
        {({ data, loading, error }) => {
          if (error || !data) return <Logo />
          if (loading) return <Spinner />
          const { community } = data;
          if (!community) return <Logo />
          const { logo } = community;
          return <Logo src={logo} />;
        }}
      </Query>
    )
  }
}