import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton, Text, Button, ProgressBar, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import { inject, observer } from 'mobx-react';
import { I18n, Storage } from 'aws-amplify';
import FileSelect from 'components/lists/FileSelect';
import logger from 'config/logger';
import config from 'aws_config';

const MAX_LENGTH = 240;
const MAX_FILE_SIZE = 8000 * 1024;

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region
} = config;

class CommentInput extends React.Component {
  state = {
    isSubmitting: false,
    message: '',
    uploads: [],
    total: 0,
    loaded: 0
  };
  
  _openPicker = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.allFiles
        ]
      });
      let total = response.reduce((accumulator, currentVal) => accumulator + Number(currentVal.size), 0);
      this.setState({ uploads: response, total, loaded: 0 });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Do nothing
      } else {
        logger.logError(error);
      }
    }
  };

  _onSubmit = async () => {
    const { uploads } = this.state;
    let message = this.state.message.trim();
    if (uploads.length) {
      const { id } = this.props;
      let docs = [];
      let failed = [];

      this.setState({ isSubmitting: true });
      for (let doc of uploads) {
        const { type, uri, name, size} = doc;
        const key = `uploads/${id}${name}`;
        const fileForUpload = {
          key,
          bucket,
          region,
          type,
          size,
          name
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
        this.props.handleSubmit(message || null, docs);
        this.setState({
          isSubmitting: false,
          message: '',
          uploads: failed,
        });
      } else {
        this.setState({
          isSubmitting: false,
          message: '',
        });
      }
      if (failed.length) {
        this.props.stores.snackbar.show(I18n.get('ERROR_failedToSendFiles')(failed.length), true);
      }

    } else if (message) {
      this.props.handleSubmit(message || null);
      this.setState({
        isSubmitting: false,
        message: '',
      });
    }
  };

  _onChangeText = (message) => {
    if (message.length < MAX_LENGTH || this.props.isOwner) {
      this.setState({ message });
    } else {
      this.setState({ message: message.slice(0, MAX_LENGTH)});
      this.props.stores.snackbar.show(I18n.get('COMMENT_tooLong'));
    }
  };

  focusInput = () => this._textInputRef && this._textInputRef.focus();

  blurInput = () => this._textInputRef && this._textInputRef.blur();
  
  _cancelUpload = () => this.setState({ uploads: [] });

  _onPressItem = (id) => {
    const uploads = this.state.uploads.filter(item => item.uri !== id);
    this.setState({
      uploads
    });
  };

  render() {
    const {
      targetName,
      cancelReply,
      stores,
      disabled
    } = this.props;
    
    const {
      isSubmitting,
      message,
      uploads,
      total,
      loaded
    } = this.state; 

    const styles = stores.appStyles.commentInput;
    const colors = stores.themeStore.colors;
    const invalid = isSubmitting || !(message.trim() || uploads.length) || disabled;

    return (
      <>
        {
          Boolean(targetName) && (
            <View style={styles.alert}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.alertTitle}
              >{I18n.get('Replying')} <Text style={styles.targetName}>{targetName}</Text>
              </Text>
              <Button compact mode="text" onPress={cancelReply}>{I18n.get("BUTTON_cancel")}</Button>
            </View>
          )
        }
        { Boolean(this.state.uploads.length) && (
          <>
          <FileSelect
            data={this.state.uploads}
            onCancel={this._cancelUpload}
            onPressItem={this._onPressItem}
            disabled={isSubmitting}
          />
          {
            Boolean(isSubmitting) && (
              <ProgressBar progress={loaded / total} />
            )
          }
          </>
        )}
        <View style={styles.container}>
          <IconButton
            size={24}
            color={colors.primary}
            icon={({ size, color }) => <Icon
               name="paperclip"
               size={size}
               color={color}
             />}
            disabled={isSubmitting || disabled}
            onPress={this._openPicker}
            style={styles.right}
          />
          <View style={styles.input}>
            <TextInput
              ref={textInputRef => this._textInputRef = textInputRef}
              placeholder={I18n.get("PLACEHOLDER_aboutThisEvent")}
              value={message}
              multiline
              maxHeight={120}
              onChangeText={this._onChangeText}
              onBlur={() => this._onChangeText(message)}
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
              disabled={disabled}
            />
          </View>
          {
            isSubmitting ? <ActivityIndicator animating /> : (
              <IconButton
                size={24}
                color={colors.primary}
                icon={({ size, color }) => <Icon
                  name="send"
                  size={size}
                  color={color}
                />}
                disabled={invalid}
                onPress={this._onSubmit}
                style={styles.right}
              />
            )
          }
        </View>
      </>
    );
  }
}

export default inject("stores")(observer(CommentInput));