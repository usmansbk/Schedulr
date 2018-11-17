import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import LoginButton from '../components/common/LoginButton';
import LOGIN_STATUS from '../graphql/localState/query/LoginStatus';
import COMMUNITY from '../graphql/localState/query/Community';

export default class LoginButtonContainer extends PureComponent {
  render() {
    return (
      <Query query={COMMUNITY}>
        {({ data: { community } }) => {
          return (
            <Query query={LOGIN_STATUS}>
              {({ data: { loginStatus: { isLoggedIn, agent } } }) => {
                return (
                  <LoginButton
                    isLoggedIn={isLoggedIn}
                    agent={agent}
                    community={community}
                  />
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
} 
