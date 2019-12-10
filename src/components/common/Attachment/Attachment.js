import React from 'react';
import { Image, View } from 'react-native';
import { inject, observer } from 'mobx-react';

class Attachment extends React.Component {
  render() {
    return (
      <View>
        <Image />
      </View>
    )
  }
}

export default inject('stores')(observer(Attachment));