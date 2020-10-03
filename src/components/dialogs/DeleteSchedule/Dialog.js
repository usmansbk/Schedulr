import React from 'react';
import Confirm from 'components/common/Confirm';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';

class DeleteSchedule extends React.Component {
  state = {
    loading: false,
  };

  shouldComponentUpdate = (_, nextState) =>
    nextState.loading !== this.state.loading;

  _confirmRef = (ref) => (this.confirmRef = ref);

  open = () => this.confirmRef.open();

  _onContinue = () => {
    const {id, onSubmit, pictureKey, stores} = this.props;
    this.setState({loading: true});
    if (pictureKey) {
      stores.appState.removeKeysFromStorage([pictureKey]);
    }
    this.timer = setTimeout(() => {
      onSubmit && onSubmit({id});
    }, 0);
    // this.setState({ loading: false });
    this.props.navigation.popToTop();
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    // const { stores } = this.props;

    return (
      <Confirm
        ref={this._confirmRef}
        title={I18n.get('DIALOG_deleteSchedule')}
        message={I18n.get('DIALOG_deleteScheduleWarning')}
        confirmText={I18n.get('BUTTON_delete')}
        onConfirm={this._onContinue}
        sensitive
      />
    );
  }
}

export default inject('stores')(observer(DeleteSchedule));
