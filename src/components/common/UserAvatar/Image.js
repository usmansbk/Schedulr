import React from 'react';
import { Image } from 'react-native';
import colors from 'config/colors';

export default class CustomImage extends React.Component {

  _size = {
    width: this.props.size - 1,
    height: this.props.size - 1,  
  };

  _imageStyle = {
    borderRadius: (this.props.size - 1) / 2,
    borderWidth: 1,
    borderColor: colors.light_gray_3,
    ...this._size
  };

  _style = {
    borderRadius: (this.props.size - 1) / 2,
    ...this._size
  };

  shouldComponentUpdate = (nextProps) => (this.props.uri !== nextProps.uri);

  render() {
    const { uri } = this.props;
    
    return (
      <Image
        source={{ uri }}
        imageStyle={this._imageStyle}
        style={this._style}
        defaultSource={require('./img/placeholder.png')}
      />
    );
  }
}