import React from 'react';
import { Query } from 'react-apollo';
import { Spinner } from 'native-base';
import UserInfo from '../components/common/UserInfo';
import ME from '../graphql/query/Me';
import LOGIN_STATUS from '../graphql/localState/query/LoginStatus';
import COMMUNITY from '../graphql/localState/query/Community';
import LoginButton from '../components/common/HeaderLogin';

export default class UserInfoContainer extends React.PureComponent {
  _onPress = () => this.props.navigation.navigate('Login');
  _onPreview = () => this.props.navigation.navigate('Auth');

  render() {
    return (
      <Query query={COMMUNITY}>
        {({ data: { community } }) => {
          const isPreview = !community;
          return (
            <Query query={LOGIN_STATUS}>
              {({data: { loginStatus }}) => {
                const { isLoggedIn } = loginStatus
                if (!isLoggedIn) return (
                  <LoginButton
                    onPress={isPreview ? this._onPreview : this._onPress}
                  />
                );
                
                return (
                  <Query query={ME}>
                    {({data, loading }) => {
                      if (loading) return <Spinner />
                      if (!data) return null;
                      const { me } = data;
                      const {
                        name,
                        email,
                        photo
                      } = me || {};
                      
                      return (
                        <UserInfo
                          name={name}
                          email={email}
                          photo={photo}
                        />
                      )
                    }}
                  </Query>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}
