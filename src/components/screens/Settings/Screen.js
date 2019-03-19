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
      <>
        <Settings
          goBack={this._goBack}
          openRemindMeDialog={this._showDialog}
        />
        <RemindMeDialog
          visible={this.state.visible}
          hideDialog={this._hideDialog}
          handleValueChange={this._handleValueChange}
        />
      </>
    );
  }
}