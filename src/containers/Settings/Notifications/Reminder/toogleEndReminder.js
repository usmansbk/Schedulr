import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import ToggleSound from '../../../../components/common/ToggleButtons/ToggleEndReminder';
import TOGGLE_END_REMINDER from '../../../../graphql/mutation/ToggleEndReminder';

export default class ToggleSoundContainer extends PureComponent {

  render() {
    const { endReminder } = this.props;
    return (
      <Mutation mutation={TOGGLE_END_REMINDER}>
        {(toggle) => {
          return <ToggleSound endReminder={endReminder} toggle={() => toggle()} />
        }}
      </Mutation>
    )
  }
}