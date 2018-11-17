import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import DELETE_EVENT from '../../graphql/mutation/DeleteEvent';
import i18n from '../../config/i18n';

class DeleteEvent extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }

  _onCompleted = () => {
    const { navigation } = this.props;
    navigation.pop();
    ToastAndroid.show(i18n.t('toast.event_deleted'), ToastAndroid.SHORT);
  }

  render() {
    const {
      id,
      groupId,
      name,
      handleClose,
      isVisible
    } = this.props;
    
    return (
      <Mutation
        mutation={DELETE_EVENT}
        onCompleted={this._onCompleted}
      >
        {(deleteEvent, { loading }) => {
          return (
            <Modal
              title={`Delete "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              handleClose={handleClose}
              handleAccept={() => {
                deleteEvent({
                  variables: {
                    input: {
                      id,
                      groupId
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

export default withNavigation(DeleteEvent);