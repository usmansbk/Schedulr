import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import DELETE_GROUP from '../../graphql/mutation/DeleteGroup';
import { GENERIC_ERROR } from '../../lib/errorMessages';
import i18n from '../../config/i18n';

class DeleteGroup extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }

  _handleClose = () => this.props.handleClose();

  _onCompleted = () => {
    const { navigation } = this.props;
    navigation.popToTop();
    ToastAndroid.show(i18n.t('group.deleted'), ToastAndroid.SHORT);
  }
  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)
  render() {
    const { id, isVisible, name } = this.props;
    return (
      <Mutation
        mutation={DELETE_GROUP}
        onCompleted={this._onCompleted}
        onError={this._handleError}
      >
        {(deleteGroup, { loading }) => {
          return (
            <Modal
              title={`${i18n.t('options.delete')} "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              message={i18n.t('group.delete_warning')}
              handleClose={this._handleClose}
              handleAccept={() => {
                deleteGroup({
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

export default withNavigation(DeleteGroup);