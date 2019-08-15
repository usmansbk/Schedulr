import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';

export default inject("stores")(observer(
  ({goBack, title, uploadPhoto, uri, stores, me }) => (
    <View style={{ flex: 1, backgroundColor: stores.themeStore.colors.bg }}>
      <Appbar.Header style={stores.appStyles.styles.header}>
        <Appbar.Action
          color={stores.themeStore.colors.gray}
          icon={({color, size}) => <Icon
            name="arrow-left"
            onPress={goBack}
            color={color}
            size={size}
          />}
        />
        <Appbar.Content
          title={title}
          titleStyle={stores.appStyles.styles.headerColor}
        />
        {
          me && (
            <Appbar.Action
              color={stores.themeStore.colors.gray}
              icon={({ color, size }) => <Icon
                name="image"
                onPress={uploadPhoto}
                size={size}
                color={color}
              />}
            />
          )
        }
      </Appbar.Header>
      <PhotoView
        source={{uri}}
        androidScaleType="fitCenter"
        style={{flex: 1}}
      />
    </View>
  )
));