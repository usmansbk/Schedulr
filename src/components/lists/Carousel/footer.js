import React from 'react';
import { Surface, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getAlbum } from 'api/queries';
import Cover from 'components/common/AlbumCover';

class Footer extends React.Component {
  _navigateToAlbum = () => this.props.navigation.navigate('Album', { id: this.props.id });

  render() {
    const { stores, images, isOwner } = this.props;
    if (!(isOwner || images.length)) return null;

    const styles = stores.appStyles.carousel;
    return (
      <TouchableRipple onPress={this._navigateToAlbum}>
        <Surface style={styles.container}>
          {
            Boolean(images.length) ? (
              <Cover images={images} />
            ) : (
              <>
                <Text style={styles.text}>{I18n.get(`TEXT_noAlbum`)}</Text>
                <Icon name="camera" size={24} color={stores.themeStore.colors.gray}/>
              </>
            )
          }
        </Surface>
      </TouchableRipple>
    );
  }
}

const withApi = graphql(gql(getAlbum), {
  options: props => ({
    fetchPolicy: 'cache-first',
    variables: {
      id: props.navigation.getParam('id')
    }
  }),
  props: ({ data, ownProps }) => ({
    images: (data && data.getAlbum && data.getAlbum.album) || [],
    loading: data && data.loading,
    id: ownProps.navigation.getParam('id'),
    ...ownProps
  })
})(Footer);

export default inject("stores")(observer(withNavigation(withApi)));