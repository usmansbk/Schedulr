import React from 'react';
import { ProgressBar } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { inject, observer } from 'mobx-react';
import { I18n, Storage } from 'aws-amplify';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MasonryList from 'components/lists/Album';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import logger from 'config/logger';
import config from 'aws_config';
import { updateEventWithAlbum } from 'graphql/mutations';
import { getAlbum } from 'graphql/queries';
import snackbar from 'helpers/snackbar';
import { getFileName } from 'lib/utils';

const MAX_FILE_SIZE = 8000 * 1024;
const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

class Album extends React.Component {
  state = {
    total: 0,
    loaded: 0,
    isSubmitting: false,
    selected: [] 
  };

  _onLongPress = (url) => {
    const { selected } = this.state;
    const isSelected =  selected.includes(url);
    let temp;
    if (isSelected) {
      temp = selected.filter(uri => uri !== url);
    } else {
      temp = [...selected, url];
    }
    this.setState({
      selected: temp 
    });
  };
   
  _onPress = (key) => {
    this.props.navigateToViewer(this.props.id, key);
  };

  _openDocumentPicker = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.images
        ]
      });
      let total = response.reduce((accumulator, currentVal) => accumulator + Number(currentVal.size), 0);
      this.setState({ isSubmitting: true, total, loaded: 0 });
      await this._onSubmit(response);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Do nothing
      } else {
        logger.logError(error);
      }
    }
  };

  _onDelete = async () => {
    const { id, images, stores } = this.props;
    const filtered = images.filter(image => !this.state.selected.includes(image.key));
    this.setState({ isLoading: true });
    const newList = filtered.map(image => {
      const temp = Object.assign({}, image);
      delete temp.__typename;
      return temp;
    });
    stores.appState.removeKeysFromStorage(this.state.selected);
    await this.props.updateAlbum(id, newList);
    this.setState({ isLoading: false, selected: [] });
  };

  _onSubmit = async (uploads) => {
    if (uploads.length) {
      const { id, images } = this.props;
      let docs = [];
      let failed = [];

      for (let doc of uploads) {
        const { type, uri, name, size} = doc;
        const fileName = getFileName(type, true);
        const key = `uploads/${fileName}`;
        const fileForUpload = {
          key,
          bucket,
          region,
          type,
          size,
          name: fileName
        };
        try {
          if (uri && (size <= MAX_FILE_SIZE)) {
            const fetchResponse = await fetch(uri);
            const blob = await fetchResponse.blob();
            await Storage.put(key, blob, {
              contentType: type,
              level: 'public',
              progressCallback: progress => {
                this.setState(prev => ({
                  loaded: prev.loaded + progress.loaded
                }));
              }
            });
            docs.push(fileForUpload);
          } else {
            snackbar(I18n.get('TOAST_fileTooLarge')(name));
          }
        } catch(error) {
          failed.push(doc);
          logger.logError(error);
        }
      }
      if (docs.length) {
        const prev = images.map(image => {
          const temp = Object.assign({}, image);
          delete temp.__typename;
          return temp;
        });
        await this.props.updateAlbum(id, [...docs, ...prev]);
      }
      this.setState({ isSubmitting: false });
      if (failed.length) {
        snackbar(I18n.get('ERROR_failedToSendFiles')(failed.length), true);
      }
    }
  };

  render() {
    const {
      isSubmitting,
      loaded,
      total,
      selected,
      isLoading
    } = this.state;
    const {
      stores,
      images,
      loading,
      onRefresh,
      error,
      isOwner,
    } = this.props;

    if (loading && !images.length) return <Loading loading={loading} />;
    if (error && !images.length) return <Error onRefresh={onRefresh} loading={loading} />;
    const colors = stores.themeStore.colors;
    return (
      <>
        { Boolean(isSubmitting) && <ProgressBar progress={loaded / total} /> }
        { isLoading && <ProgressBar indeterminate />}
        <MasonryList
          images={images}
          selected={this.state.selected}
          backgroundColor={colors.bg}
          color={colors.primary_dark}
          onPress={this._onPress}
          onLongPress={this._onLongPress}
          onRefresh={onRefresh}
          loading={loading}
        />
        {
          isOwner && (
            <Fab
              disabled={loading || isLoading || isSubmitting}
              icon={selected.length ? "trash":"picture"}
              onPress={selected.length ? this._onDelete : this._openDocumentPicker}
            />
          )
        }
      </>
    )
  }
}

const withGraphql = compose(
  graphql(gql(getAlbum), {
    alias: 'withGetAlbum',
    options: props => ({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
      variables: {
        id: props.id
      }
    }),
    props: ({ data, ownProps }) => ({
      images: (data && data.getAlbum && data.getAlbum.album) || [],
      loading: data.loading,
      error: data.error,
      isOwner: data && data.getAlbum && data.getAlbum.isOwner,
      onRefresh: () => data.refetch(),
      ...ownProps
    })
  }),
  graphql(gql(updateEventWithAlbum), {
    alias: 'withUpdateAlbum',
    props: ({ mutate, ownProps }) => ({
      updateAlbum: (id, album) => mutate({
        variables: {
          input: {
            id,
            album
          }
        }
      }),
      ...ownProps
    })
  })
)(Album);

export default inject("stores")(observer(withGraphql));