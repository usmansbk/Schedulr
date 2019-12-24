import React from 'react';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { capitalize } from 'lib/utils';

class DateCountdown extends React.Component {
  state = {
    finished: false
  };

  _timeAgo = () => {
    const start = this.props.startAt;
    const end = this.props.endAt;
    let timeAgo;
    if (moment().isBefore(moment(start))) {
      timeAgo = moment(start).fromNow(); 
    } else if (moment().isAfter(moment(end))) {
      timeAgo = moment(end).fromNow();
    } else {
      timeAgo = `${moment(end).fromNow(true)} left`;
    }
    return capitalize(timeAgo);
  };
  _onPress = () => this.props.stores.snackbar.show(this._timeAgo());
  _onFinish = () => {
    this.setState({
      finished: true
    }, () => this.props.onFinish && this.props.onFinish());
  };

  render() {
    const { startAt, endAt, stores } = this.props;
    const start = moment(startAt).valueOf();
    const end = moment(endAt).valueOf();
    const now = moment().valueOf();
    let digitStyle;
    let digitTxtStyle;
    let timeLabelStyle = {
      color: stores.themeStore.colors.gray
    };

    let until = Math.floor((start - now) / 1000);
    if (until < 0) {
      if (end > now) {
        until = Math.floor((end - now) / 1000);
        digitStyle = {
          backgroundColor: stores.themeStore.colors.green,
        };
        digitTxtStyle = {
          color: 'white'
        };
      } else {
        until = 0;
        digitStyle = {
          backgroundColor: stores.themeStore.colors.tint
        }
        digitTxtStyle = {
          color: 'white'
        };
      }
    }
    return (
      <CountDown
        until={until}
        onFinish={this._onFinish}
        onPress={this._onPress}
        digitStyle={digitStyle}
        digitTxtStyle={digitTxtStyle}
        timeLabelStyle={timeLabelStyle}
        size={20}
      />
    );
  }

}

export default inject("stores")(observer(DateCountdown));