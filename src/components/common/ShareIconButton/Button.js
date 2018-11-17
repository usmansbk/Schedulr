import React from 'react';
import Config from 'react-native-config';
import Share from 'react-native-share';
import Button from '../SButton';
import eventMessageTemplate from '../../../lib/messageTemplate';
import i18n from '../../../config/i18n';
import theme from '../../theme';

export default class ShareButton extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    return (nextProps.id !== this.props.id) ||
      (nextProps.name !== this.props.name) ||
      (nextProps.location !== this.props.location) ||
      (nextProps.eventType !== this.props.eventType) ||
      (nextProps.start !== this.props.start) ||
      (nextProps.end !== this.props.end);
  }

  _handleShare = (event) => {
    const {
      name,
      id,
      eventType,
    } = event;
    
    const message = eventMessageTemplate(event);
    const url = `${Config.APP_URL}event/${id}`;
    const options = {
      title: i18n.t('share.event'),
      subject: `${name} ${eventType}`,
      message,
      url
    }
    Share.open(options);
  }
  

  _onShare = () => {
    const {
      id,
      name,
      location,
      eventType,
      start,
      end,
    } = this.props;
    this._handleShare({
      id,
      name,
      location,
      eventType,
      start,
      end,
    });
  }

  render() {
    return (
      <Button
        onPress={this._onShare}
        color={theme.bgLight}
        isClicked={true}
        name="share-2"
        type="Feather"
        normal
      />
    );
  }
}