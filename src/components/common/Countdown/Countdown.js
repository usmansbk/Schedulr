import React from 'react';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { capitalize } from 'lib/utils';
import { countdown } from 'lib/constants';
import snackbar from 'helpers/snackbar';

const { SIZE } = countdown;
class DateCountdown extends React.Component {

  _timeAgo = () => {
    const start = this.props.startAt;
    const end = this.props.endAt;
    let timeAgo;
    if (moment().isBefore(moment(start))) {
      timeAgo = moment(start).fromNow(); 
    } else if (moment().isAfter(moment(end))) {
      timeAgo = moment(end).fromNow();
    } else {
      timeAgo = I18n.get('MOMENT_left')(moment(end).fromNow(true));
    }
    return capitalize(timeAgo);
  };
  _onPress = () => snackbar(this._timeAgo());

  render() {
    const { startAt, endAt, status, stores } = this.props;
    const start = moment(startAt).valueOf();
    const end = moment(endAt).valueOf();
    const now = moment().valueOf();
    const digitStyle = {
      backgroundColor: stores.themeStore.colors.bg
    };
    const timeLabelStyle = {
      color: stores.themeStore.colors.gray,
    };

    let color = stores.themeStore.colors.gray;

    let until = Math.floor((start - now) / 1000);
    if (status === 'ongoing') {
      until = Math.floor((end - now) / 1000);
      color = stores.themeStore.colors.green;
    } else if (status === 'upcoming') {
      color = stores.themeStore.colors.yellow;
    } else if (status === 'cancelled') {
      color = stores.themeStore.colors.light_red;
      until = 0;
    }

    const digitTxtStyle = {
      color 
    };

    return (
      <CountDown
        until={until}
        onPress={this._onPress}
        digitStyle={digitStyle}
        digitTxtStyle={digitTxtStyle}
        timeLabelStyle={timeLabelStyle}
        timeLabels={I18n.get('timeLabels')}
        size={SIZE}
        key={status}
      />
    );
  }

}

export default inject("stores")(observer(DateCountdown));