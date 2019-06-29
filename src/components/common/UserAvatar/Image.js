import React from 'react';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';

const Image = createImageProgress(FastImage);

export default class CustomImage extends React.PureComponent {

  _getStyle = {
    width: this.props.size,
    height: this.props.size,
    borderRadius: this.props.size / 2
  };

  _renderIndicator = () => <FastImage
    source={require('./img/placeholder.jpg')}
    style={this._getStyle}
    resizeMode={FastImage.resizeMode.contain}
  />;

  render() {
    const { uri, size } = this.props;

    return (
      <Image
        source={{ uri }}
        indicator={this._renderIndicator}
        imageStyle={this._getStyle}
        style={this._getStyle}
        indicatorProps={{indeterminate: false}}
      />
    );
  }
}