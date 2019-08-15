import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default ({goBack, title, uploadPhoto, uri }) => (
  <View>
    <Appbar.Header>
      <Appbar.Action
        icon={({color, size}) => <Icon
          name="arrow-left"
          onPress={goBack}
          color={color}
          size={size}
        />}
      />
      <Appbar.Content
        title={title}
      />
      <Appbar.Action
        icon={({ color, size }) => <Icon
          name="image"
          onPress={uploadPhoto}
          size={size}
          color={color}
        />}
      />
    </Appbar.Header>
    <PhotoView
      source={{uri}}
      androidScaleType="center"
    />
  </View>
);