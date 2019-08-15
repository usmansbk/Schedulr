import React from 'react';
import Viewer from 'components/common/ImageViewer';

export default class AvatarViewer extends React.Component {
  render() {
    const { user: { name, me, pictureUrl } } = this.props;
    return (
      <Viewer
        title={name}
        uri={pictureUrl}
        goBack={this._goBack}
      />
    );
  }
}