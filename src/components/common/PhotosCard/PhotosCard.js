import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {withNavigation} from 'react-navigation';
import {I18n} from 'aws-amplify';
import {inject, observer} from 'mobx-react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {getAlbum} from 'api/queries';
import Cover from 'components/common/AlbumCover';

class PhotosCard extends React.Component {
  _navigateToAlbum = () =>
    this.props.navigation.navigate('Album', {id: this.props.id});

  render() {
    const {stores, images} = this.props;

    const styles = stores.styles.carousel;
    return (
      <TouchableOpacity
        onPress={this._navigateToAlbum}
        style={styles.container}>
        {Boolean(images.length) ? (
          <Cover images={images} />
        ) : (
          <>
            <Text style={styles.text}>{I18n.get(`TEXT_album`)}</Text>
            <Icon name="picture" size={24} color={stores.theme.colors.gray} />
          </>
        )}
      </TouchableOpacity>
    );
  }
}

const withApi = graphql(gql(getAlbum), {
  options: (props) => ({
    fetchPolicy: 'cache-first',
    variables: {
      id: props.navigation.getParam('id'),
    },
  }),
  props: ({data, ownProps}) => ({
    images: (data && data.getAlbum && data.getAlbum.album) || [],
    loading: data && data.loading,
    id: ownProps.navigation.getParam('id'),
    ...ownProps,
  }),
})(PhotosCard);

export default inject('stores')(observer(withNavigation(withApi)));
