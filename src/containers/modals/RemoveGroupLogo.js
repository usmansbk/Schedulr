import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import Modal from '../../components/common/Modal';
import REMOVE_LOGO from '../../graphql/mutation/RemoveLogo';
import { GENERIC_ERROR } from '../../lib/errorMessages';
import i18n from '../../config/i18n';

class RemoveLogo extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }
  
  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)
  _onCompleted = () => this.props.navigation.pop()
  render() {
    const {
      id,
      handleClose,
      isVisible,
    } = this.props;
    return (
      <Mutation
        mutation={REMOVE_LOGO}
        onCompleted={this._onCompleted}
        onError={this._handleError}
      >
        {(mutate, { loading }) => {
          return (
            <Modal
              title={i18n.t('group.remove_logo')}
              loading={loading}
              isVisible={isVisible}
              handleClose={handleClose}
              handleAccept={() => {
                mutate({
                  variables: {
                    input: {
                      id
                    }
                  }
                })
              }}
            />
          )
        }}
      </Mutation>
    );
  }
}

export default withNavigation(RemoveLogo);