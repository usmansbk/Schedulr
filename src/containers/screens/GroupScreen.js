import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PageLoading from '../../components/common/PageLoading';
import GroupScreen from '../../components/screens/Group';
import GROUP from '../../graphql/localState/query/Group';
import EVENTS from '../../graphql/localState/query/AllEvents';

export default class GroupScreenContainer extends PureComponent {

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _infoNav = () => {
    const id = this.props.navigation.getParam('id');
    this.props.navigation.navigate('GroupInfo', { id });
  }

  render() {
    const id = this.props.navigation.getParam('id');

    return (
      <Query query={GROUP} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) return <PageLoading />
          const { group } = data || {};
          const {
            name,
            description,
          } = group || {};
          return (
            <Query query={EVENTS}>
              {({ loading, data={} }) => {
                if (loading) return <PageLoading />
                const { events: { edges } } = data;
                const events = edges.filter(edge => edge.node.group.id === id);
                return (
                  <GroupScreen
                    toInfo={this._infoNav}
                    id={id}
                    name={name}
                    description={description}
                    edges={events}
                    onPress={() =>(
                      this.props.navigation.navigate('NewEvent', {
                        id,
                        title: 'New event'
                      }))
                    }
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