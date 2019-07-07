import React from 'react';
import { View } from 'react-native';
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
  };

  _placeholder = {
    width: this.props.size - 1,
    height: this.props.size - 1,
    borderRadius: (this.props.size - 1) / 2,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.light_gray
  };

  _renderPlaceholder = () => <View style={this._placeholder} />;

  render() {
    const { uri } = this.props;

    return (
      <Image
        source={{ uri }}
        indicator={this._renderPlaceholder}
        imageStyle={this._imageStyle}
        style={this._style}
        indicatorProps={{indeterminate: false}}
      />
    );
  }
}