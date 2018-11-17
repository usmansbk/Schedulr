import React from 'react';
import { Query } from 'react-apollo';
import Groups from '../components/GroupList';
import GROUPS from '../graphql/localState/query/Groups';
import PageLoading from '../components/common/PageLoading/Loading';

export default class GroupsTab extends React.Component {
  render() {
    return (
      <Query
        query={GROUPS}
        notifyOnNetworkStatusChange
      >
        {({ loading, data, networkStatus }) => {
          if (loading) return <PageLoading />

          const { groups } = data || {};
          const { edges } = groups || {};
          return (
            <Groups
              loading={networkStatus === 4}
              groups={edges}
            />
          )
        }}
      </Query>
    )
  }
}