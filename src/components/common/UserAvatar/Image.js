import React from 'react';
import { Image } from 'react-native';

export default class CustomImage extends React.Component {

  _style = {
    borderRadius: (this.props.size) / 2,
    width: this.props.size,
    height: this.props.size,  
  };

  shouldComponentUpdate = (nextProps) => (this.props.uri !== nextProps.uri);

  render() {
    const { uri } = this.props;
    
    return (
      <Image
        source={{ uri }}
        style={this._style}
        defaultSource={require('../../../assets/placeholder.png')}
      />
    );
  }
}