import React from 'react';
import { I18n } from 'aws-amplify';
import { withApollo } from 'react-apollo';
import Confirm from 'components/common/Confirm';
import gql from 'graphql-tag';
import { getUserData } from 'api/queries';
import { baseEventsFilter } from 'api/filters';
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';

class Dialog extends React.Component {
  state = {
    loading: false
  };

  open = () => this.confirmRef.open();
  _confirmRef = ref => this.confirmRef = ref;

  _onConfirm = async () => {
    const variables = {
      filter: baseEventsFilter(),
      limit: 50
    };
    this.setState({ loading: true });
    try {
      await this.props.client.query({
        query: gql(getUserData),
        fetchPolicy: 'network-only',
        variables
      });
      snackbar(I18n.get("SYNC_complete"));
    } catch (error) {
      snackbar(I18n.get("ERROR_noConnection"), error);
      logger.logError(error);
    }
    this.setState({ loading: false });
    this.props.onConfirm();
  };

  render() {
    return (
      <Confirm
        title={I18n.get("MORE_sync")}
        message={I18n.get("SYNC_message")}
        onConfirm={this._onConfirm}
        ref={this._confirmRef}
      />
    );
  }
}

export default withApollo(Dialog, { withRef: true });