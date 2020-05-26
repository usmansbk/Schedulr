import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Confirm from 'components/common/Confirm';

class DeleteEvent extends React.Component {
  state = {
    loading: false,
  };
  
  shouldComponentUpdate = (_, nextState) => (
    nextState.checked !== this.state.checked ||
    nextState.loading !== this.state.loading
  );
  _confirmRef = ref => this.confirmRef = ref;

  open = () => this.confirmRef.open();

  _onContinue = async () => {
    const {
      id,
      banner,
      onSubmit,
      stores
    } = this.props;
    this.setState({ loading: true });
    if (banner) {
      stores.appState.removeKeysFromStorage([banner.key])
    }
    setTimeout(() => {
      onSubmit && onSubmit({ id });
    }, 0);
    this.props.navigation.goBack();
  };

  render() {
    // const {
    //   stores
    // } = this.props;

    return (
      <Confirm
        title={I18n.get("DIALOG_deleteEvent")}
        message={I18n.get("DIALOG_deleteEventWarning")}
        onConfirm={this._onContinue}
        confirmText={I18n.get("BUTTON_delete")}
        ref={this._confirmRef}
      />
    );
  }
}

export default inject("stores")(observer(DeleteEvent));