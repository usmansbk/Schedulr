import React from 'react';
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import colors from 'config/colors';

const Image = createImageProgress(FastImage);

export default class CustomImage extends React.PureComponent {

  _imageStyle = {
    width: this.props.size - 1,
    height: this.props.size - 1,
    borderRadius: (this.props.size - 1) / 2,
    borderWidth: 1,
    borderColor: colors.light_gray_3,
  };

  _style = {
    width: this.props.size - 1,
    height: this.props.size - 1,
    borderRadius: (this.props.size - 1) / 2,
  }

  _renderIndicator = () => <FastImage
    source={require('./img/placeholder.jpg')}
    style={this._style}
    resizeMode={FastImage.resizeMode.contain}
  />;

  render() {
    const { uri, size } = this.props;

    return (
      <Image
        source={{ uri }}
        indicator={this._renderIndicator}
        imageStyle={this._imageStyle}
        style={this._style}
        indicatorProps={{indeterminate: false}}
      />
    );
  }
}