import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { updatePushSettings } from '../../../../lib/updateSettings';
import TogglePush from '../../../../components/common/ToggleButtons/TogglePush';
import TOGGLE_PUSH from '../../../../graphql/mutation/TogglePush';

export default class TogglePushContainer extends PureComponent {

  render() {
    const { push } = this.props;
    return (
      <Mutation
        mutation={TOGGLE_PUSH}
        onCompleted={({ togglePush }) => updatePushSettings('push', togglePush)}
      >
        {(toggle) => {
          return <TogglePush push={push} toggle={() => toggle()} />
        }}
      </Mutation>
    )
  }
}