import React from 'react';
import Settings from './Settings';
import RemindMeDialog from '../../dialogs/RemindMe';

export default class Screen extends React.Component {
  state = {
    visible: false,
  };
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <React.Fragment>
        <Settings
          state={this.props.stores.settingsStore}
          goBack={this._goBack}
          openRemindMeDialog={this._showDialog}
        />
        <RemindMeDialog
          state={this.props.stores.remindMeStore}
          visible={this.state.visible}
          hideDialog={this._hideDialog}
          handleValueChange={this._handleValueChange}
        />
      </React.Fragment>
    );
  }
}