import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import FileSelect from 'components/lists/FileSelect';
import logger from 'config/logger';

class CommentInput extends React.Component {
  state = {
    isSubmitting: false,
    message: '',
    uploads: []
  };
  
  _openPicker = async () => {
    try {
      const response = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText]
      });
      this.setState({ uploads: response });
      // console.log(JSON.stringify(response));
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Do nothing
      } else {
        logger.logError(error);
      }
    }
  };

  _onSubmit = () => {
    if (this.state.message.trim()) {
      this.setState({ isSubmitting: true });
      this.props.handleSubmit(this.state.message.trim());
      this.setState({
        isSubmitting: false,
        message: '',
        uploads: []
      });
    }
  };

  _onChangeText = (message) => this.setState({ message });

  focusInput = () => this._textInputRef && this._textInputRef.focus();

  blurInput = () => this._textInputRef && this._textInputRef.blur();
  
  _cancelUpload = () => this.setState({ uploads: [] });

  _onPressItem = (id) => {
    const uploads = this.state.uploads.filter(item => item.uri !== id);
    this.setState({
      uploads
    });
  }

  render() {
    const {
      targetName,
      cancelReply,
      stores,
      disabled
    } = this.props;
    
    const {
      isSubmitting,
      message
    } = this.state; 

    const styles = stores.appStyles.commentInput;
    const colors = stores.themeStore.colors;
    const invalid = isSubmitting || !message.trim() || disabled;

    return (
      <>
        {
          Boolean(targetName) && (
            <View style={styles.alert}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.alertTitle}
              >Replying <Text style={styles.targetName}>{targetName}</Text>
              </Text>
              <Button compact mode="text" onPress={cancelReply}>{I18n.get("BUTTON_cancel")}</Button>
            </View>
          )
        }
        { Boolean(this.state.uploads.length) && (
          <FileSelect
            data={this.state.uploads}
            onCancel={this._cancelUpload}
            onPressItem={this._onPressItem}
          />
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
            disabled={invalid}
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
          <IconButton
            size={24}
            color={colors.primary}
            icon={({ size, color }) => <Icon
               name="feather"
               size={size}
               color={color}
             />}
            disabled={invalid}
            onPress={this._onSubmit}
            style={styles.right}
          />
        </View>
      </>
    );
  }
}

export default inject("stores")(observer(CommentInput));