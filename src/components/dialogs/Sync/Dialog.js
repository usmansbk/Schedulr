import React from 'react';
import Alert from 'components/dialogs/Alert';
import { I18n } from 'aws-amplify';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import logger from 'config/logger';
import stores from 'stores';

class Dialog extends React.Component {
  state = {
    loading: false
  };

  _handleDismiss = () => {
    this.setState({ loading: false }, this.props.handleDismiss);
  };

  _onConfirm = async () => {
    const variables = {
      filter: baseEventsFilter(),
      limit: 50
    };
    this.setState({ loading: true });
    try {
      const res = await this.props.client.query({
        query: gql(getUserData),
        fetchPolicy: 'network-only',
        variables
      });
      console.log(JSON.stringify(res))
      stores.snackbar.show(I18n.get("SYNC_complete"));
    } catch (error) {
      stores.snackbar.show(I18n.get("ERROR_noConnection"), error);
      logger.logError(error);
    }
    this.setState({ loading: false });
    this.props.onConfirm();
  };

  render() {
    return (
      <Alert
        visible={this.props.visible}
        onConfirm={this._onConfirm}
        handleDismiss={this._handleDismiss}
        title={I18n.get("MORE_sync")}
        message={I18n.get("SYNC_message")}
        loading={this.state.loading}
        dismissable={!this.state.loading}
      />
    );
  }
}

export default withApollo(Dialog);