import React from 'react';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import Picker from 'components/common/Picker';
import Alert from 'components/dialogs/Alert';

const MAX_LENGTH = 30;
const MIN_LENGTH = 2

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      visible: false,
      showDeleteAlert: false,
      text: props.selectedValue,
      selectedValue: props.selectedValue
    }
  }

  _onConfirmAlert = () => {
    this.props.stores.appState.removeCustomType(this.state.id);
    this._hideAlertModal();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        selectedValue: props.selectedValue,
        text: props.value
      };
    }
    return null;
  }

  _onValueChange = (value) => {
    this.props.onValueChange(value);
  };

  render() {
    const {
      value,
      stores,
      disabled
    } = this.props;
    const items = stores.appState.categories.map(value => ({ value, label: value}));


    return (
      <>
      <Picker
        value={value}
        items={items}
        prompt={value || I18n.get('Event')}
        disabled={disabled}
        onValueChange={this._onValueChange}
      />
      <Alert
        visible={this.state.showDeleteAlert}
        title={I18n.get("ALERT_deleteType")}
        handleDismiss={this._hideAlertModal}
        onConfirm={this._onConfirmAlert}
      />
      </>
    )
  }
}

export default inject("stores")(observer(Input));