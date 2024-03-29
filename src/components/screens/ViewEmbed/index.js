import React from 'react';
import ImageViewer from 'components/common/ImageViewer';
import { I18n } from 'aws-amplify';


export default class ViewEmbed extends React.Component {
  _goBack = () => this.props.navigation.goBack();

  render() {
    const { navigation } = this.props;
    const subtitle = navigation.getParam('subtitle');
    const uri = navigation.getParam('uri');
    const s3Object = navigation.getParam('s3Object');

    return <ImageViewer
      title={I18n.get('Picture')}
      subtitle={subtitle}
      uri={uri}
      s3Object={s3Object}
      goBack={this._goBack}
      fit="contain"
    />
  }
}