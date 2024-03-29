import React from 'react';
import {View, TextInput} from 'react-native';
import {IconButton, ProgressBar, ActivityIndicator} from 'react-native-paper';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import DocumentPicker from 'react-native-document-picker';
import {inject, observer} from 'mobx-react';
import {I18n, Storage} from 'aws-amplify';
import FileSelect from 'components/lists/FileSelect';
import logger from 'config/logger';
import config from 'aws_config';
import snackbar from 'helpers/snackbar';
import {getFileName} from 'lib/utils';
import {file} from 'lib/constants';
const {MAX_FILE_SIZE} = file;

const MAX_LENGTH = 240;

const {
  aws_user_files_s3_bucket: bucket,
  aws_user_files_s3_bucket_region: region,
} = config;

class CommentInput extends React.Component {
  state = {
    isSubmitting: false,
    message: '',
    uploads: [],
    total: 0,
    loaded: 0,
  };

  _textInputRef = (ref) => (this.textInputRef = ref);

  focusInput = () => this.textInputRef && this.textInputRef.focus();

  blurInput = () => this.textInputRef && this.textInputRef.blur();

  _openPicker = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      let total = response.reduce(
        (accumulator, currentVal) => accumulator + Number(currentVal.size),
        0,
      );
      this.setState({uploads: response, total, loaded: 0});
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Do nothing
      } else {
        logger.logError(error);
      }
    }
  };

  _processDocs = async () => {
    const {uploads} = this.state;
    let docs = [];
    let failed = [];
    if (uploads.length) {
      this.setState({isSubmitting: true});
      for (let doc of uploads) {
        const {type, uri, name, size} = doc;
        const fileName = getFileName(type, true);
        const key = `uploads/${fileName}`;
        const fileForUpload = {
          key,
          bucket,
          region,
          type,
          size,
          name: fileName,
        };
        try {
          if (uri && size <= MAX_FILE_SIZE) {
            const fetchResponse = await fetch(uri);
            const blob = await fetchResponse.blob();
            await Storage.put(key, blob, {
              contentType: type,
              level: 'public',
              progressCallback: (progress) => {
                this.setState((prev) => ({
                  loaded: prev.loaded + progress.loaded,
                }));
              },
            });
            docs.push(fileForUpload);
          } else {
            snackbar(I18n.get('TOAST_fileTooLarge')(name));
          }
        } catch (error) {
          failed.push(doc);
          logger.logError(error);
        }
      }
    }
    return [docs, failed];
  };

  _onSubmit = async () => {
    const message = this.state.message.trim();
    const [docs, failed] = await this._processDocs();
    if (message || docs.length) {
      await this.props.handleSubmit(message, docs);
    }
    this.setState({
      isSubmitting: false,
      message: '',
      uploads: failed,
    });
    if (failed.length) {
      snackbar(I18n.get('ERROR_failedToSendFiles')(failed.length), true);
    }
  };

  _onChangeText = (message) => {
    if (message.length < MAX_LENGTH || this.props.isOwner) {
      this.setState({message});
    } else {
      this.setState({message: message.slice(0, MAX_LENGTH)});
      snackbar(I18n.get('COMMENT_tooLong'));
    }
  };

  _cancelUpload = () => this.setState({uploads: []});

  _onPressItem = (id) => {
    const uploads = this.state.uploads.filter((item) => item.uri !== id);
    this.setState({
      uploads,
    });
  };

  render() {
    const {addressee, stores, disabled, isOwner, clear} = this.props;

    const {isSubmitting, message, uploads, total, loaded} = this.state;

    const styles = stores.styles.commentInput;
    const colors = stores.theme.colors;
    const invalid =
      isSubmitting || !(message.trim() || uploads.length) || disabled;

    return (
      <View style={{backgroundColor: colors.bg}}>
        {Boolean(addressee) && (
          <View style={{alignSelf: 'flex-start'}}>
            <Button onPress={clear} danger>
              {I18n.get('BUTTON_cancel')}
            </Button>
          </View>
        )}
        {Boolean(this.state.uploads.length) && (
          <>
            <FileSelect
              data={this.state.uploads}
              onCancel={this._cancelUpload}
              onPressItem={this._onPressItem}
              disabled={isSubmitting}
            />
            {Boolean(isSubmitting) && <ProgressBar progress={loaded / total} />}
          </>
        )}
        <View style={styles.container}>
          <IconButton
            size={24}
            color={colors.primary}
            icon={({size, color}) => (
              <Icon name="paperclip" size={size} color={color} />
            )}
            disabled={isSubmitting || disabled}
            onPress={this._openPicker}
            style={styles.right}
          />
          <View style={styles.input}>
            <TextInput
              ref={this._textInputRef}
              placeholder={I18n.get('PLACEHOLDER_comment')(addressee)}
              value={message}
              multiline
              maxHeight={120}
              maxLength={isOwner ? undefined : MAX_LENGTH}
              onChangeText={this._onChangeText}
              onBlur={() => this._onChangeText(message)}
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
              editable={!disabled}
            />
          </View>
          {isSubmitting ? (
            <ActivityIndicator animating />
          ) : (
            <IconButton
              size={24}
              color={colors.primary}
              icon={({size, color}) => (
                <Icon name="send" size={size} color={color} />
              )}
              disabled={invalid}
              onPress={this._onSubmit}
              style={styles.right}
            />
          )}
        </View>
      </View>
    );
  }
}

export default inject('stores')(observer(CommentInput));
