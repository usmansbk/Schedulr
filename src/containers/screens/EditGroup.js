import React from 'react';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import GenericForm from '../../components/screens/GroupForm/Form';
import PageLoading from '../../components/common/PageLoading/Loading';
import { groupValidator } from '../../lib/formValidator';
import EDIT_GROUP from '../../graphql/mutation/EditGroup';
import GROUP from '../../graphql/localState/query/Group';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages';

class EditGroupContainer extends React.PureComponent {
  _handleMutationError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)
  _onCompleted = () => {
    this.props.navigation.goBack();
    ToastAndroid.show('Saved',ToastAndroid.SHORT);
  }
  render() {
    const { id } = this.props;
    return (
      <Query
        query={GROUP}
        variables={{
          id
        }}
      >
        {({loading, data}) => {
          if (loading) return <PageLoading />
          const { group } = data;
          const { name, description, privacy, url } = group;
          return (
            <Mutation
              mutation={EDIT_GROUP}
              onCompleted={this._onCompleted}
              onError={this._handleMutationError}
            >
              {(updateGroup, { loading }) => {
                if (loading) return <PageLoading />
                return (
                  <GenericForm
                    initialName={name}
                    initialDescription={description}
                    initialUrl={url}
                    initialPrivacy={privacy}
                    loading={loading}
                    onSubmit={(group) => {
                      if (!groupValidator(group)) return;
                      updateGroup({
                      variables: {
                        input: {
                          group,
                          id
                        }
                      }})
                    }}
                  />
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(EditGroupContainer);