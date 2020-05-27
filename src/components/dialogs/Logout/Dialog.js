import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Confirm from 'components/common/Confirm';

class Logout extends React.Component {
  _confirmRef = ref => this.confirmRef = ref;
  open = () => this.confirmRef.open();

  render() {
    return (
      <Confirm
        title={I18n.get("SIGN_OUT_title")}
        message={I18n.get("SIGN_OUT_message")}
        onConfirm={this.props.handleLogout}
        confirmText={I18n.get("BUTTON_logout")}
        ref={this._confirmRef}
      />
    );
  }
}

export default inject("stores")(observer(Logout));