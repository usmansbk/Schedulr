import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../Loading';

export default inject("stores")(observer(
  ({s3Object, goBack, title, uploadPhoto, deletePhoto, uri, stores, me, loading }) => (
    <>
    <Appbar.Header style={stores.appStyles.styles.header}>
      <Appbar.Action
        color={stores.themeStore.colors.primary}
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
            Boolean(s3Object) && (
              <Appbar.Action
                color={stores.themeStore.colors.primary}
                icon={({ color, size }) => <Icon
                  name="trash-2"
                  onPress={deletePhoto}
                  size={size}
                  color={color}
                />}
              />
            )
          }
          <Appbar.Action
            color={stores.themeStore.colors.primary}
            icon={({ color, size }) => <Icon
              name="camera"
              onPress={uploadPhoto}
              size={size}
              color={color}
            />}
          />
          </>
        )
      }
    </Appbar.Header>
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: stores.themeStore.colors.bg }}>
      {
        loading ? <Loading loading /> : (
          <PhotoView
            source={uri ? {uri} : require('../../../assets/photographer.png')}
            loadingIndicatorSource={require('./img/loading.png')}
            androidScaleType="fitCenter"
            style={ uri ? {flex: 1} : { alignSelf: 'center', width: 400, height: 400 }}
          />
        )
      }
    </View>
    </>
  )
));