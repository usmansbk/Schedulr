import React, { Component } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage as Image } from 'react-native-cached-image';

const DEFAULT_IMAGE_PATH = '../../../assets/no_image.jpg';

export default class Avatar extends Component {
  shouldComponentUpdate = (nextProps) => {
    return this.props.src !== nextProps.src ||
      this.props.name !== nextProps.name;
  }
  
  render() {
    const {
      src,
      name,
      size,
      onPress,
      rounded
    } = this.props;

    let defaultSource = require(DEFAULT_IMAGE_PATH);

    let uri;
    if (src) {
      uri = {uri: src};
    }

    const imageStyle = {
      width: size,
      height: size,
    }

    if (rounded) imageStyle.borderRadius = size /2;
    
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <View>
          {
            !Boolean(src) ?
              <UserAvatar
                size={size}
                name={name}
                rounded={rounded}
                component={Image}
              />
            : (
              <Image
                resizeMode="cover"
                defaultSource={defaultSource}
                fallbackSource={defaultSource}
                source={uri}
                style={imageStyle}
              />
            )
          }
        </View>
      </TouchableNativeFeedback>
    );
  }
}