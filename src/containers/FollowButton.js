import React, { PureComponent } from 'react';
import { Mutation, Query } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import JOIN_GROUP from '../graphql/mutation/JoinClass';
import GROUPS from '../graphql/localState/query/Groups';
import GROUP from '../graphql/localState/query/Group';
import FollowButton from '../components/common/FollowButton';
import { ERROR_OCCURED } from '../lib/errorMessages';

export default class FollowButtonContainer extends PureComponent {
  update = (cache, { data }) => {
    const { groups } = cache.readQuery({ query: GROUPS });
    const { joinGroup } = data;
    const { group } = joinGroup;
    cache.writeQuery({
      query: GROUPS,
      data: {
        groups: Object.assign(groups, {
          edges: [{
            cursor: group.id,
            node: group,
            __typename: "ClassEdge",
          },...groups.edges ],
        })
      }
    }) 
  }

  _handleError = () => ToastAndroid.show(ERROR_OCCURED, ToastAndroid.SHORT)
  render() {
    const {
      id,
      color
    } = this.props;
    return <Query
      query={GROUP}
      variables={{
        id
      }}
    >
      {({ data, error, loading }) => {
        if (Boolean(error) || loading) return null;
        let isMember;
        let name;
        let optimisticResponse;
        if (data) {
          const { group } = data;
          if (group) {
            isMember = group.isMember;
            name = group.name;
            if (group) {
              isMember = group.isMember;
              isAuthor = group.isAuthor;
              name = group.name
              optimisticResponse = {
                __typename: "Mutation",
                joinClass: {
                  __typename: "JoinClassPayload",
                  myClass: Object.assign({}, group, {
                    isMember: true
                  })
                }
              }
            }
          }
        }
        return (
          <Mutation
            mutation={JOIN_GROUP}
            optimisticResponse={optimisticResponse}
            onError={this._handleError}
          >
            {(joinGroup) => {
              return (
                <FollowButton
                  name={name}
                  id={id}
                  color={color}
                  isMember={isMember}
                  joinGroup={() => {
                    joinGroup({
                      variables: {
                        input: {
                          id
                        }
                      },
                      update: this.update,
                    })
                  }}
                />
              )
            }}
          </Mutation>
        )
      }}
    </Query>
  }
}