import React from 'react';
import PhotoView from 'react-native-photo-view';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import Loading from '../Loading';

class ImageViewer extends React.Component {
  _downloadImage = () => {
    const { s3Object: { key } } = this.props;
    console.log('this', key);
  };

  render() {
    const {
      s3Object,
      goBack,
      title,
      subtitle,
      uploadPhoto,
      deletePhoto,
      uri,
      stores,
      me,
      loading
    } = this.props;

    return (
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
        subtitle={subtitle}
        titleStyle={stores.appStyles.styles.headerColor}
      />
      <Appbar.Action
        onPress={this._downloadImage}
        color={stores.themeStore.colors.primary}
        icon={({ color,size }) => <Icon
          name="download"
          size={size}
          color={color}
        />}
      />
      {
        me && (
          <>
          {
            Boolean(s3Object) && (
              <Appbar.Action
                onPress={deletePhoto}
                color={stores.themeStore.colors.primary}
                icon={({ color, size }) => <Icon
                  name="trash-2"
                  size={size}
                  color={color}
                />}
              />
            )
          }
          <Appbar.Action
            onPress={uploadPhoto}
            color={stores.themeStore.colors.primary}
            icon={({ color, size }) => <Icon
              name="camera"
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

  }
}

export default inject("stores")(observer(ImageViewer));