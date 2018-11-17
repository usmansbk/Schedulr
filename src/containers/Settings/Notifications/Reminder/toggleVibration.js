import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import ToggleVibration from '../../../../components/common/ToggleButtons/ToggleVibration';
import TOGGLE_REMINDER_VIBRATION from '../../../../graphql/mutation/ToggleReminderVibration';

export default class ToggleVibrationContainer extends PureComponent {

  render() {
    const { vibrate } = this.props;
    return <Mutation mutation={TOGGLE_REMINDER_VIBRATION}>
      {(toggle) => {
        return (
          <ToggleVibration vibrate={vibrate} toggle={() => toggle()} />
        )
      }}
    </Mutation>
  }
}