import React, { PureComponent } from 'react';
import { ToastAndroid } from 'react-native';
import { Query } from 'react-apollo';
import EventCard from '../../components/screens/EventCard';
import PageLoading from '../../components/common/PageLoading';
import EVENT from '../../graphql/localState/query/Event';
import { SOMETHING_WENT_WRONG } from '../../lib/errorMessages';

export default class EventsCardContainer extends PureComponent {
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _handleError = () => ToastAndroid.show(SOMETHING_WENT_WRONG, ToastAndroid.SHORT)
  _onCompleted = ({ event }) => {
    if (!event) ToastAndroid.show('Not found', ToastAndroid.SHORT);
  }
  
  render() {
    const id = this.props.navigation.getParam('id');
    
    return (
      <Query
        query={EVENT}
        variables={{
          id,
        }}
        onCompleted={this._onCompleted}
      >
        {({ loading, data }) => {
          if (loading) return <PageLoading />
          const { event } = data || {};
          return (
            <EventCard
              event={event}
            />
          )
        }}
      </Query>
    )
  }
}