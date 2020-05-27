import React from 'react';
import { inject, observer } from 'mobx-react';
import Confirm from 'components/common/Confirm';

class Alert extends React.Component {
  _confirmRef = ref => this.confirmRef = ref;

  open = () => this.confirmRef.open();

  _dismiss = () => this.confirmRef.close();

  render() {
    const {
      title,
      message,
    } = this.props;
    return (
      <Confirm
        title={title}
        message={message}
        ref={this._confirmRef}
        onConfirm={this._dismiss}
        alert
      />
    );
  }
}

export default inject('stores')(observer(Alert));
