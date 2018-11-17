import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { updatePushSettings } from '../../../../lib/updateSettings';
import ToggleSound from '../../../../components/common/ToggleButtons/ToggleSound';
import TOGGLE_PUSH_SOUND from '../../../../graphql/mutation/TogglePushSound';

export default class ToggleSoundContainer extends PureComponent {

  render() {
    const { sound } = this.props;
    return (
      <Mutation
        mutation={TOGGLE_PUSH_SOUND}
        onCompleted={({ togglePushSound }) => updatePushSettings('sound', togglePushSound)}
      >
        {(toggle) => {
          return <ToggleSound sound={sound} toggle={() => toggle()} />
        }}
      </Mutation>
    )
  }
}