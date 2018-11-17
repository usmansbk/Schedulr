import React, { PureComponent } from 'react';
import { ToastAndroid } from 'react-native';
import { Query } from 'react-apollo';
import GroupInfo from '../../components/screens/Group/GroupInfo';
import PageLoading from '../../components/common/PageLoading';
import GROUP from '../../graphql/localState/query/Group';

export default class GroupInfoContainer extends PureComponent {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _onCompleted = ({ group }) => {
    if (!group) ToastAndroid.show('Not found', ToastAndroid.SHORT);
  }
  
  render() {
    const id = this.props.navigation.getParam('id');
    return (
      <Query
        query={GROUP}
        variables={{
          id,
        }}
      >
        {({ loading, data }) => {
          if (loading) {
            return <PageLoading />
          }
          
          const { group } = data || {};
          const {
            id,
            name,
            description,
            url,
            membersCount,
            status,
            pictureUrl,
            author,
            privacy,
            isAuthor,
            isClosed,
            createdAt
          } = group || {};

          return (
            <GroupInfo
              id={id}
              name={name}
              description={description}
              url={url}
              membersCount={membersCount}
              status={status}
              logo={pictureUrl}
              author={author}
              privacy={privacy}
              isAuthor={isAuthor}
              isClosed={isClosed}
              createdAt={createdAt}
            />
          );
        }}
      </Query>
    )
  }
}