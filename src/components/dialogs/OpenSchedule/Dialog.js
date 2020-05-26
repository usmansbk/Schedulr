import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Confirm from 'components/common/Confirm';
import { SCHEDULE_OPEN } from 'lib/constants';

class OpenSchedule extends React.Component {
  state = {
    loading: false
  };
  
  shouldComponentUpdate = (_, nextState) => (
    nextState.loading !== this.state.loading
  );

  _confirmRef = ref => this.confirmRef = ref;
  open = () => this.confirmRef.open();
  
  _onContinue = () => {
    const {
      id,
      onSubmit,
    } = this.props;
    this.setState({ loading: true });
    setTimeout(() => {
      onSubmit({ id, status: SCHEDULE_OPEN });
    }, 0);
    this.setState({ loading: false });
  };

  render() {
    // const {
    //   stores
    // } = this.props;

    return (
      <Confirm
        title={I18n.get("DIALOG_openSchedule")}
        onConfirm={this._onContinue}
        confirmText="Unarchive"
        ref={this._confirmRef}
      />
    );
  }
}

export default inject("stores")(observer(OpenSchedule));