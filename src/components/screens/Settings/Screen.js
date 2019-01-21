import React from 'react';
import Settings from './Settings';
import RemindMeDialog from '../../dialogs/RemindMe';

export default class Screen extends React.Component {
  static defaultProps = {
    settings: {
      playSound: true,
      vibrate: true,
      headsUp: false,
      starredAlarm: true,
      muteReminder: false,
    }
  }
  state = {
    visible: false,
  };
  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });
  _goBack = () => this.props.navigation.goBack();
  _handleValueChange = async (key) => {
    await this.props.toggleSettings(key);
  };
  render() {
    const {
      settings: {
        playSound,
        vibrate,
        headsUp,
        starredAlarm,
        muteReminder
      }
    } = this.props;
    return (
      <React.Fragment>
        <Settings
          vibrate={vibrate}
          playSound={playSound}
          headsUp={headsUp}
          starredAlarm={starredAlarm}
          muteReminder={muteReminder}
          goBack={this._goBack}
          handleValueChange={this._handleValueChange}
          openRemindMeDialog={this._showDialog}
        />
        <RemindMeDialog
          visible={this.state.visible}
          hideDialog={this._hideDialog}
          handleValueChange={this._handleValueChange}
        />
      </React.Fragment>
    );
  }
}