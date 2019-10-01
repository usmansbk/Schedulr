import React from 'react';
import Alert from 'components/dialogs/Alert';
import { I18n } from 'aws-amplify';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';

class Dialog extends React.Component {
  state = {
    loading: false
  };

  _onConfirm = async () => {
    const variables = {
      id: this.props.id,
      filter: baseEventsFilter(),
      limit: 50
    };
    this.setState({ loading: true });
    await this.props.client.query({
      query: gql(getUserData),
      variables
    });
    this.setState({ loading: false });
    this.props.onConfirm();
  };

  render() {
    return (
      <Alert
        visible={this.props.visible}
        onConfirm={this._onConfirm}
        handleDismiss={this.props.handleDismiss}
        title={I18n.get("MORE_sync")}
        message={I18n.get("SYNC_message")}
        loading={this.state.loading}
      />
    );
  }
}

export default withApollo(Dialog);