import React from 'react';
import GallerySwiper from 'react-native-image-zoom-viewer';
import { Appbar } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/Feather';
import { I18n } from 'aws-amplify';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getAlbum } from 'graphql/queries';
import getImageUrl from 'helpers/getImageUrl';

class AlbumViewer extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  
  render() {
    const { album, s3Key, stores } = this.props;
    const index = album.findIndex(img => img.key === s3Key);
    const images = album.map(img => ({ url: getImageUrl(img, 1040, 'contain') }));
    const appStyles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    
    return (
      <>
      <Appbar.Header collapsable style={appStyles.header}>
        <Appbar.Action
          onPress={this._goBack}
          color={colors.primary}
          size={24}
          icon={({ size, color }) => <Icon
            name="arrow-left"
            size={size}
            color={color}
          />}
        />
        <Appbar.Content
          titleStyle={appStyles.headerColor}
          title={I18n.get('TEXT_album')}
        />
      </Appbar.Header>
      <GallerySwiper
        imageUrls={images}
        index={index}
        backgroundColor={colors.bg}
        useNativeDriver
        saveToLocalByLongPress={false}
      />
      </>
    );
  }
}

export default inject('stores')(observer(graphql(gql(getAlbum), {
  options: props => ({
    variables: {
      id: props.navigation.getParam('id')
    }
  }),
  props: ({ data, ownProps }) => ({
    album: (data && data.getAlbum && data.getAlbum.album) || [],
    s3Key: ownProps.navigation.getParam('key'),
    ...ownProps
  })
})(AlbumViewer)));