import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import GenericForm from '../../components/screens/EventForm/Generic';
import { eventValidator } from '../../lib/formValidator';
import NEW_EVENT from '../../graphql/localState/query/NewEvent';
import GROUPS from '../../graphql/localState/query/Groups';
import PageLoading from '../../components/common/PageLoading/Loading';

class NewEvent extends React.PureComponent {

  _onCompleted = () => {
    this.props.navigation.goBack();
    ToastAndroid.show('Event created', ToastAndroid.SHORT);
  }

  render() {
    const { id, title, onBack, onNewGroup } = this.props;
    return (
      <Query query={GROUPS}>
        {({ data = {}, loading }) => {
          if (loading) return <PageLoading />
          const { groups = {} } = data;
          let { edges = [] } = groups;

          edges = edges.filter(edge => edge.node.isAuthor && !edge.node.isClosed);

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
                    initialGroupId={id}
                    loading={loading}
                    onBack={onBack}
                    onNewGroup={onNewGroup}
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