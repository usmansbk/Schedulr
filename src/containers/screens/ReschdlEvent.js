import React from 'react';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import GenericForm from '../../components/screens/EventForm/Generic';
import PageLoading from '../../components/common/PageLoading/Loading';
import NEW_EVENT from '../../graphql/localState/query/NewEvent';
import EVENT from '../../graphql/localState/query/Event';
import GROUPS from '../../graphql/localState/query/Groups';
import { eventValidator } from '../../lib/formValidator';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages';

class ReschdlEventContainer extends React.PureComponent {

  _handleMutationError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)
  _handleQueryError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)
  _onCompleted = (result) => {
    const { createEvent } = result;
    const { id } = createEvent;
    this.props.navigation.replace('EventCard', { id });
    ToastAndroid.show('Event created', ToastAndroid.SHORT);
  }

  render() {
    const { id, title, onBack } = this.props;

    return (
      <Query query={GROUPS}>
        {({ data, loading }) => {
          if (loading) return <PageLoading />
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
              fetchPolicy="cache-only"
              query={EVENT}
              variables={{
                id
              }}
              onError={this._handleQueryError}
            >
              {({loading, data }) => {
                if (loading) return <PageLoading />
                const { event } = data;
                const {
                  name,
                  description,
                  eventType,
                  location,
                  repeat,
                  start,
                  end,
                  group
                } = event;
      
                return (
                  <Mutation
                    mutation={NEW_EVENT}
                    onCompleted={this._onCompleted}
                    onError={this._handleMutationError}
                  >
                    {(createEvent, { loading }) => {
                      if (loading) return <PageLoading />
                      return (
                        <GenericForm
                          title={title}
                          initialName={name}
                          initialDescription={description}
                          initialStart={Date.parse(start)}
                          initialEnd={Date.parse(end)}
                          initialType={eventType}
                          initialLocation={location}
                          initialRecurrence={repeat}
                          initialGroupId={group.id}
                          groups={groupList}
      
                          onBack={onBack}
                          loading={loading}
                          onSubmit={({ event, banner }) => {
                            const isValid = eventValidator(event);
                            if (!isValid) return;
                            createEvent({
                              variables: {
                                input: {
                                  event,
                                  banner
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

export default withNavigation(ReschdlEventContainer);