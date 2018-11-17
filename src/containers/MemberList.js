import React, { PureComponent } from 'react';
import { ToastAndroid, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import MemberList from '../components/screens/Members/MemberList';
import MEMBERS from '../graphql/query/Members';
import { UPDATE_LIST_ERROR } from '../lib/errorMessages';

const LIMIT = 25;

class Members extends PureComponent {
  updateQuery = (prev, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev;
    const { members } = prev;
    const updated = Object.assign({}, prev, {
      members: Object.assign({}, members, {
        edges: [...fetchMoreResult.members.edges,...members.edges ],
        pageInfo: Object.assign({}, members.pageInfo,
          fetchMoreResult.members.pageInfo
        ),
      })
    });
    return updated;
  }

  _handleError = () => ToastAndroid.show(UPDATE_LIST_ERROR, ToastAndroid.SHORT)

  render() {
    const { id } = this.props;
    return (
      <Query
        query={MEMBERS}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange
        variables={{
          id
        }}
        onError={this._handleError}
      >
        {({loading, data, fetchMore, refetch, networkStatus}) => {
          if (!Boolean(data)) {
            return <FlatList
              refreshing={networkStatus === 4}
              onRefresh={refetch}
            />
          }
          let memberList = [];
          let after;
          let hasNextPage;
          if (data) {
            const { classroom } = data;
            if (classroom) {
              const { members } = classroom;
              if (members) {
                const { edges, pageInfo } = members;
                if (edges) {
                  memberList = edges;
                  after = pageInfo.after;
                  hasNextPage = pageInfo.hasNextPage
                }
              }
            }
          }
          return (
            <MemberList
              onRefresh={refetch}
              hasNextPage={hasNextPage}
              loading={loading || networkStatus === 4}
              members={memberList}
              fetchMoreMembers={() => {
                fetchMore({
                  variables: {
                    after,
                    first: LIMIT,
                  },
                  updateQuery: this.updateQuery
                })
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(Members);