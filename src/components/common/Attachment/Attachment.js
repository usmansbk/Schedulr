import React from 'react';
import { View } from 'react-native';
import Media from './Media';

export default class Attachment extends React.Component {
  render() {
    const { attachment, navigateToViewEmbed} = this.props;

    return (
      <View>
        {
          Boolean(attachment) &&
            attachment.map(file => (
            <Media navigateToViewEmbed={navigateToViewEmbed} file={file} />))
        }
      </View>
    )
  }
}