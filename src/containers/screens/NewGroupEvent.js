import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import GenericForm from '../../components/screens/EventForm/Generic';
import PageLoading from '../../components/common/PageLoading/Loading';
import NEW_EVENT from '../../graphql/localState/query/NewEvent';
import GROUPS from '../../graphql/localState/query/Groups';
import { eventValidator } from '../../lib/formValidator';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages';

class NewEvent extends React.PureComponent {
  _handleError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)
  _onCompleted = (result) => {
    const { createEvent } = result;
    this.props.navigation.replace('EventCard', {
      id: createEvent.id
    });
    ToastAndroid.show('Event created', ToastAndroid.SHORT);
  }

  render() {
    const { id, title, onBack } = this.props;
    return (
      <Query query={GROUPS}>
        {({ data = {}, loading }) => {
          if (loading) return <PageLoading />
          const { groups = {} } = data;
          let { edges } = groups;
          edges = edges.filter(group => group.node.isAuthor);
          const group = edges.find(group => group.node.id === id);
          const { node: { name, isClosed } = {} } = group || {};

          return (
            <Mutation
              mutation={NEW_EVENT}
              onCompleted={this._onCompleted}
            >
              {(createEvent, { loading }) => {
                if (loading) return <PageLoading />
                return (
                  <GenericForm
                    title={title}
                    groups={edges}
                    initialName={name}
                    initialGroupId={id}
                    loading={loading}
                    isClosed={isClosed}
                    isGroup
                    onBack={onBack}
                    onSubmit={(input) => {
                      if (!eventValidator(input.event, edges)) return;
                      createEvent({
                        variables: {
                          input,
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
  }
}

export default withNavigation(NewEvent);