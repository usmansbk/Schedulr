import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../Loading';

export default inject("stores")(observer(
  ({prevS3Object, goBack, title, uploadPhoto, deletePhoto, uri, stores, me, loading }) => (
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
            <>
            {
              Boolean(prevS3Object) && (
                <Appbar.Action
                  color={stores.themeStore.colors.gray}
                  icon={({ color, size }) => <Icon
                    name="trash"
                    onPress={deletePhoto}
                    size={size}
                    color={color}
                  />}
                />
              )
            }
            <Appbar.Action
              color={stores.themeStore.colors.gray}
              icon={({ color, size }) => <Icon
                name="image"
                onPress={uploadPhoto}
                size={size}
                color={color}
              />}
            />
            </>
          )
        }
      </Appbar.Header>
      {
        loading ? <Loading /> : (
          <PhotoView
            source={{uri}}
            androidScaleType="fitCenter"
            style={{flex: 1}}
            loadingIndicatorSource={Loading}
          />
        )
      }
    </View>
  )
));