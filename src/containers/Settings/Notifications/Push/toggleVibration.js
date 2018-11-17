import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { updatePushSettings } from '../../../../lib/updateSettings';
import ToggleVibration from '../../../../components/common/ToggleButtons/ToggleVibration';
import TOGGLE_PUSH_VIBRATION from '../../../../graphql/mutation/TogglePushVibrate';

export default class ToggleVibrationContainer extends PureComponent {

  render() {
    const { vibrate } = this.props;
    return <Mutation
      mutation={TOGGLE_PUSH_VIBRATION}
      onCompleted={({ togglePushVibration }) => updatePushSettings('vibrate', togglePushVibration)}
    >
      {(toggle) => {
        return (
          <ToggleVibration vibrate={vibrate} toggle={() => toggle()} />
        )
      }}
    </Mutation>
  }
}