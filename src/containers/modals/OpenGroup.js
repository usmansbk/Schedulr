import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import OPEN_GROUP from '../../graphql/mutation/OpenGroup';
import {GENERIC_ERROR} from '../../lib/errorMessages';
import i18n from '../../config/i18n';

export default class OpenGroup extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }
  
  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)
  _onCompleted = () => {
    const { handleClose } = this.props;
    handleClose();
    ToastAndroid.show('Opened', ToastAndroid.SHORT);
  }

  render() {
    const { id, handleClose, isVisible, name } = this.props;
    return (
      <Mutation
        mutation={OPEN_GROUP}
        onCompleted={this._onCompleted}
        onError={this._handleError}
      >
        {(openGroup, { loading }) => {
          return (
            <Modal
              title={`${i18n.t('group.open')} "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              handleClose={handleClose}
              handleAccept={() => {
                openGroup({
                  variables: {
                    input: {
                      id
                    }
                  },
                })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}
