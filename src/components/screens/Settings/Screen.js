import React from 'react';
import Settings from './Settings';
import RemindMeDialog from 'components/dialogs/RemindMe';
import ThemeDialog from 'components/dialogs/Theme';

export default class Screen extends React.Component {
  state = {
    visible: false,
    themePickerVisible: false
  };
  _showDialog = () => this.setState({ visible: true });
  _showThemeDialog = () => this.setState({ themePickerVisible: true });
  _hideDialog = () => this.setState({ visible: false, themePickerVisible: false });
  _goBack = () => this.props.navigation.goBack();
  render() {
    return (
      <>
        <Settings
          goBack={this._goBack}
          openRemindMeDialog={this._showDialog}
          openThemeDialog={this._showThemeDialog}
        />
        <RemindMeDialog
          visible={this.state.visible}
          hideDialog={this._hideDialog}
        />
        <ThemeDialog
          visible={this.state.themePickerVisible}
          hideDialog={this._hideDialog}
        />
      </>
    );
  }
}