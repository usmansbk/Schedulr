import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import { withNavigation } from 'react-navigation';
import Modal from '../../components/common/Modal';
import CANCEL_EVENT from '../../graphql/mutation/CancelEvent';
import i18n from '../../config/i18n';

class CancelEvent extends PureComponent {
  _onCompleted = () => {
    const { handleClose } = this.props;
    handleClose();
    ToastAndroid.show(i18n.t('toast.event_cancelled'), ToastAndroid.SHORT);
  }
  
  render() {
    const {
      id,
      name,
      handleClose,
      isVisible
    } = this.props;

    return (
      <Mutation
        mutation={CANCEL_EVENT}
        onCompleted={this._onCompleted}
      >
        {(cancelEvent, { loading }) => {
          return (
            <Modal
              title={`${i18n.t('options.cancel')} "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              handleClose={handleClose}
              handleAccept={() => {
                cancelEvent({
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

export default withNavigation(CancelEvent);