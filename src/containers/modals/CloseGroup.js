import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import CLOSE_GROUP from '../../graphql/mutation/CloseGroup';
import { GENERIC_ERROR } from '../../lib/errorMessages'
import i18n from '../../config/i18n';

export default class CloseGroup extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }
  
  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)
  _onCompleted = () => {
    const { handleClose } = this.props;
    handleClose();
    ToastAndroid.show('Closed', ToastAndroid.SHORT);
  }
  
  render() {
    const { id, handleClose, isVisible, name } = this.props;
    return (
      <Mutation
        mutation={CLOSE_GROUP}
        onCompleted={this._onCompleted}
        onError={this._handleError}
      >
        {(closeGroup, { loading }) => {
          return (
            <Modal
              title={`${i18n.t('menu.close')} "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              handleClose={handleClose}
              handleAccept={() => {
                closeGroup({
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
