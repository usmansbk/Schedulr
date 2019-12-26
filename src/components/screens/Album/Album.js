import React from 'react';
import { ProgressBar } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { inject, observer } from 'mobx-react';
import { I18n, Storage } from 'aws-amplify';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import shortid from 'shortid';
import Fab from 'components/common/Fab';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import logger from 'config/logger';
import config from 'aws_config';
import { updateAlbum } from 'graphql/mutations';
import { getAlbum } from 'graphql/queries';

const MAX_FILE_SIZE = 8000 * 1024;
const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

class Album extends React.Component {
  state = {
    total: 0,
    loaded: 0,
    isSubmitting: false
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

  _onSubmit = async (uploads) => {
    if (uploads.length) {
      const { id, noAlbum } = this.props;
      let docs = [];
      let failed = [];

      for (let doc of uploads) {
        const { type, uri, name, size} = doc;
        const fileName = `${id}_${shortid.generate()}_${name}`;
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
            this.props.stores.snackbar.show(I18n.get('TOAST_fileTooLarge')(name));
          }
        } catch(error) {
          failed.push(doc);
          logger.logError(error);
        }
      }
      if (docs.length) {
        await this.props.updateAlbum(id, docs);
      }
      this.setState({ isSubmitting: false });
      if (failed.length) {
        this.props.stores.snackbar.show(I18n.get('ERROR_failedToSendFiles')(failed.length), true);
      }
    }
  };

  render() {
    const { isSubmitting, loaded, total } = this.state;
    const {
      stores,
      images,
      loading,
      onRefresh,
      error,
      isOwner
    } = this.props;

    if (loading && !images.length) return <Loading loading={loading} />;
    if (error && !images.length) return <Error onRefresh={onRefresh} loading={loading} />;
    console.log(images);
    const appStyles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;
    return (
      <>
        {
          Boolean(isSubmitting) && (
            <ProgressBar progress={loaded / total} />
          )
        }
        {
          isOwner && (
            <Fab
              icon="image"
              onPress={this._openDocumentPicker}
            />
          )
        }
      </>
    )
  }
}

// const withGraphql = compose(
//   graphql(gql(getAlbum), {
//     alias: 'withGetAlbum',
//     options: props => ({
//       notifyOnNetworkStatusChange: true,
//       fetchPolicy: 'cache-and-network',
//       variables: {
//         id: props.id
//       }
//     }),
//     props: ({ data, ownProps }) => ({
//       images: (data && data.getAlbum && data.getAlbum.images) || [],
//       loading: data.loading,
//       error: data.error,
//       isOwner: data && data.getAlbum && data.getAlbum.isOwner,
//       onRefresh: () => data.refetch(),
//       ...ownProps
//     })
//   }),
//   graphql(gql(updateAlbum), {
//     alias: 'withUpdateAlbum',
//     props: ({ mutate, ownProps }) => ({
//       updateAlbum: (id, images) => mutate({
//         variables: {
//           input: {
//             id,
//             images
//           }
//         }
//       }),
//       ...ownProps
//     })
//   })
// )(Album);

export default inject("stores")(observer(Album));