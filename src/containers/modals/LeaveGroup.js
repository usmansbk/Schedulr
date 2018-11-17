import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import LEAVE_GROUP from '../../graphql/mutation/LeaveClass';
import GROUPS from '../../graphql/localState/query/Groups';
import { GENERIC_ERROR } from '../../lib/errorMessages';
import i18n from '../../config/i18n';

class LeaveGroup extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }
  
  update = (cache, { data: { leaveClass } }) => {
    const data = cache.readQuery({ query: GROUPS });
    const { classes } = data;
    const { edges } = classes;
    const targetIndex = edges.findIndex(edge => edge.node.id === leaveClass.myClass.id);
    if (targetIndex !== -1) {
      const updatedData = Object.assign({}, data, {
        classes: Object.assign({}, data.classes, {
          edges: data.classes.edges.slice(0, targetIndex).concat(
            data.classes.edges.slice(targetIndex + 1)
          )
        })
      })
      cache.writeQuery({
        query: GROUPS,
        data: updatedData
      });
    }
  }

  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)
  _onCompleted = () => {
    this.props.handleClose();
  }
  render() {
    const { id, handleClose, isVisible, name } = this.props;
    return (
      <Mutation
        mutation={LEAVE_GROUP}
        onCompleted={this._onCompleted}
        update={this.update}
        onError={this._handleError}
      >
        {(leaveGroup, { loading }) => {
          return (
            <Modal
              title={`${i18n.t('group.leave')} "${name}"?`}
              isVisible={isVisible}
              loading={loading}
              message={i18n.t('group.leave_warning')}
              handleClose={handleClose}
              handleAccept={() => {
                leaveGroup({
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

export default withNavigation(LeaveGroup);