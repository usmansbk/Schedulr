import React from 'react';
import { inject, observer } from 'mobx-react';
import Confirm from 'components/common/Confirm';
import { I18n } from 'aws-amplify';
import { SCHEDULE_CLOSED } from 'lib/constants';

class CloseSchedule extends React.Component {
  state = {
    loading: false
  };

  _confirmRef = ref => this.confirmRef = ref;
  open = () => this.confirmRef.open();
  
  shouldComponentUpdate = (_, nextState) => (
    nextState.loading !== this.state.loading
  );

  _onContinue = () => {
    const {
      id,
      onSubmit,
    } = this.props;
    this.setState({ loading: true });
    setTimeout(() => {
      onSubmit({ id, status: SCHEDULE_CLOSED }).catch(() => {});
    }, 0);
    this.setState({ loading: false });
  }

  render() {
    // const { stores } = this.props;

    return (
      <Confirm
        title={I18n.get("DIALOG_closeSchedule")}
        message={I18n.get("DIALOG_closeScheduleWarning")}
        onConfirm={this._onContinue}
        confirmText={"Archive"}
        ref={this._confirmRef}
      />
    );
  }
}

export default inject("stores")(observer(CloseSchedule));