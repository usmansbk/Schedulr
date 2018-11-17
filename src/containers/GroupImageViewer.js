import React, { PureComponent } from 'react';
import { Mutation, Query } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import ImageViewer from '../components/screens/ImageViewer/ImageViewer';
import RemoveLogo from './modals/RemoveGroupLogo';
import UPLOAD_LOGO from '../graphql/mutation/UploadClassLogo';
import GROUP from '../graphql/localState/query/Group';
import { GENERIC_ERROR } from '../lib/errorMessages';

export default class GroupImageViewer extends PureComponent {
  state = {
    isVisible: false,
  }

  _handleMutationError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT)

  _onRemoveImage = () => this.setState({ isVisible: true })

  _handleClose = () => this.setState({ isVisible: false })

  render() {
    const {
      id,
      title,
      navigation
    } = this.props;
    return (
      <Query
        query={GROUP}
        variables={{
          id
        }}
      >
        {({ data }) => {
          let isAuthor, uri;
          if (data) {
            const { group } = data;
            if (group) {
              const {
                logo
              } = group;
              isAuthor = group.isAuthor;
              if (logo) {
                const { path } = logo;
                uri = path;
              }
            }
          }
          return (
            <Mutation
              mutation={UPLOAD_LOGO}
              onError={this._handleMutationError}
            >
              {(mutate, { loading }) => {
                return (
                  <React.Fragment>
                    <ImageViewer
                      title={title}
                      uri={uri}
                      loading={loading}
                      isAuthor={isAuthor}
                      navigation={navigation}

                      handleRemoveImage={this._onRemoveImage}
                      handleUpload={(file) => {
                        mutate({
                          variables: {
                            input: {
                              id,
                              file
                            }
                          }
                        })
                      }}
                    />
                    <RemoveLogo
                      id={id}
                      isVisible={this.state.isVisible}
                      handleClose={this._handleClose}
                    />
                  </React.Fragment>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}