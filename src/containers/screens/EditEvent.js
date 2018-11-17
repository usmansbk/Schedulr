import React from 'react';
import { withNavigation } from 'react-navigation';
import { ToastAndroid, Alert } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import GenericForm from '../../components/screens/EventForm/Generic';
import PageLoading from '../../components/common/PageLoading/Loading';
import EDIT_EVENT from '../../graphql/mutation/EditEvent';
import EVENT from '../../graphql/localState/query/Event';
import GROUPS from '../../graphql/localState/query/Groups';
import { eventValidator } from '../../lib/formValidator';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages';
import i18n from '../../config/i18n';

class EditEventContainer extends React.PureComponent {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _handleQueryError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)

  _handleMutationError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT);

  _onCompleted = () => {
    this.props.navigation.goBack();
    ToastAndroid.show('Saved', ToastAndroid.SHORT);
  }
  
  render() {
    const { id, title, onBack } = this.props;

    return (
      <Query query={GROUPS}>
        {({ data }) => {
          let groupList = [];
          if (data) {
            const { groups } = data;
            if (groups) {
              const { edges } = groups;
              if ( edges ) {
                groupList = edges;
              }
            }
          }
          return (
            <Query
              query={EVENT}
              variables={{
                id
              }}
            >
              {({loading, data }) => {
                if (loading) return <PageLoading/>
                const { event } = data;
                const {
                  name,
                  description,
                  eventType,
                  location,
                  repeat,
                  group
                } = event;
                let { start, end } = event;
                start = Date.parse(start);
                end = Date.parse(end);
      
                return (
                  <Mutation
                    mutation={EDIT_EVENT}
                    onCompleted={this._onCompleted}
                    onError={this._handleMutationError}
                  >
                    {(updateEvent, { loading }) => {
                      if (loading) return <PageLoading />
                      return (
                        <GenericForm
                          onBack={onBack}
                          title={title}
                          initialName={name}
                          initialDescription={description}
                          initialType={eventType}
                          initialLocation={location}
                          initialStart={new Date(start)}
                          initialEnd={new Date(end)}
                          initialRecurrence={repeat}
                          initialGroupId={group.id}
                          groups={groupList}
                          edit
      
                          loading={loading}
                          onSubmit={({ event, banner }) => {
                            const isValid = eventValidator(event);
                            if (!isValid) return;
                            updateEvent({
                            variables: {
                                input: {
                                  event,
                                  id
                                }
                              }
                            })
                          }}
                        />
                      )
                    }}
                  </Mutation>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(EditEventContainer);