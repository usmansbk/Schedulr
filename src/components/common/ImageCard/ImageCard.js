import React, { PureComponent } from 'react';
import {
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class ImageCard extends PureComponent {

  render() {
    const { uri } = this.props;
    return (
      <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('ImageViewer', { uri })}>
        <Image
          style={{ height: 200}}
          source={{uri}}
        />
      </TouchableNativeFeedback>
    )
  }
}

export default withNavigation(ImageCard);