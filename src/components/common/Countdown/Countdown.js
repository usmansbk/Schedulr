import React from 'react';
import CountDown from 'react-native-countdown-component';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

class DateCountdown extends React.Component {
  _onPress = () => SimpleToast.show(this.props.timeAgo, SimpleToast.SHORT);
  _onFinish = () => {
    this.props.onFinish && this.props.onFinish();
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
          backgroundColor: stores.themeStore.colors.soft_blue
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