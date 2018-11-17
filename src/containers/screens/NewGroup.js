import React from 'react';
import { ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Mutation, Query } from 'react-apollo';
import GenericForm from '../../components/screens/GroupForm/Form';
import PageLoading from '../../components/common/PageLoading/Loading';
import { groupValidator } from '../../lib/formValidator';
import NEW_GROUP from '../../graphql/localState/query/NewGroup';
import COMMUNITY from '../../graphql/localState/query/Community';
import ME from '../../graphql/query/Me';
import i18n from '../../config/i18n';

class NewGroup extends React.PureComponent {
  _onCompleted = () => {
    this.props.navigation.goBack();
    ToastAndroid.show('Group created', ToastAndroid.SHORT);
  }

  render() {
    const { onBack } = this.props;
    return (
      <Query query={ME}>
        {({ data }) => {
          const { me } = data || {};
          return (<Query query={COMMUNITY}>
            {({ data }) => {
              let { community } = data || {};
              const communityId = community && community.id
              return (
                <Mutation
                  mutation={NEW_GROUP}
                  onCompleted={this._onCompleted}
                >
                  {(createGroup, { loading }) => {
                    if (loading) return <PageLoading />
                    return (
                      <GenericForm
                        onBack={onBack}
                        loading={loading}
                        communityId={communityId}
                        onSubmit={(group) => {
                          if (!community) {
                            this.props.navigation.navigate('Auth');
                            return;
                          } else if (!me) {
                            this.props.navigation.navigate('Login');
                            ToastAndroid.show(i18n.t('toast.login_message'), ToastAndroid.SHORT);
                            return;
                          } else if (groupValidator(group)) {
                            return createGroup({
                              variables: {
                                input: {
                                  group,
                                }
                              }
                            });
                          }
                          ToastAndroid.show('failed', ToastAndroid.SHORT);
                        }}
                      />
                    )
                  }}
                </Mutation>
              )
            }}
          </Query>)
        }}
      </Query>
    )
  }
}

export default withNavigation(NewGroup);