import React from 'react';
import Settings from '../../routes/Settings';
import RemindMeDialog from '../../dialogs/RemindMe';

export default class Screen extends React.Component {
  state = {
    visible: false,
  };
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  _goBack = () => this.props.navigation.goBack();
  _handleValueChange = (id) => alert(id);
  render() {
    return (
      <React.Fragment>
        <Settings
          goBack={this._goBack}
          handleValueChange={this._handleValueChange}
          openRemindMeDialog={this._showDialog}
        />
        <RemindMeDialog
          visible={this.state.visible}
          hideDialog={this._hideDialog}
        />
      </React.Fragment>
    );
  }
}