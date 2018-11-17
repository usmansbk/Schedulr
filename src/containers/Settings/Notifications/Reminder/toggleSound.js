import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import ToggleSound from '../../../../components/common/ToggleButtons/ToggleSound';
import TOGGLE_REMINDER_SOUND from '../../../../graphql/mutation/ToggleReminderSound';

export default class ToggleSoundContainer extends PureComponent {

  render() {
    const { sound } = this.props;
    return (
      <Mutation mutation={TOGGLE_REMINDER_SOUND}>
        {(toggle) => {
          return <ToggleSound sound={sound} toggle={() => toggle()} />
        }}
      </Mutation>
    )
  }
}