import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import ReminderModal from '../../../../components/common/Modal/ReminderModal';
import TOGGLE_REMINDER from '../../../../graphql/mutation/ToggleReminder';

export default class ReminderModalContainer extends Component {
  render() {
    const { before, isVisible, handleClose } = this.props;
    return (
      <Mutation mutation={TOGGLE_REMINDER}>
        {(toggleReminder) => {
          return <ReminderModal
            isVisible={isVisible}
            handleClose={handleClose}
            toggle={(key) => toggleReminder({
              variables: {
                key
              }
            })}
            {...before}
          />
        }}
      </Mutation>
    )
  }
}