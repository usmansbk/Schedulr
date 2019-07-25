import React from 'react';
import { View, TextInput } from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';
import { inject, observer } from 'mobx-react';
import UserAvatar from 'components/common/UserAvatar';
import { comment_input } from 'lib/constants';

const { AVATAR_SIZE } = comment_input;

class CommentInput extends React.Component {
  state = {
    isSubmitting: false,
    message: ''
  };

  _onSubmit = () => {
    this.setState({ isSubmitting: true });
    this.props.handleSubmit(this.state.message);
    this.setState({
      isSubmitting: false,
      message: ''
    });
  };

  _onChangeText = (message) => this.setState({ message })

  focusInput = () => this._textInputRef && this._textInputRef.focus();

  blurInput = () => this._textInputRef && this._textInputRef.blur();

  render() {
    const {
      targetName,
      pictureUrl,
      name,
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
              <Button compact mode="text" onPress={cancelReply}>Cancel</Button>
            </View>
          )
        }
        <View style={styles.container}>
          <UserAvatar
            size={AVATAR_SIZE}
            src={pictureUrl}
            name={name}
          />
          <View style={styles.input}>
            <TextInput
              ref={textInputRef => this._textInputRef = textInputRef}
              placeholder="About this event..."
              value={message}
              onChangeText={this._onChangeText}
              onBlur={() => this._onChangeText(message)}
              placeholderTextColor={colors.placeholder}
              style={styles.textInput}
              disabled={disabled}
            />
          </View>
          <IconButton
            icon="send"
            color={colors.primary}
            disabled={isSubmitting || !message || disabled}
            onPress={this._onSubmit}
            style={styles.right}
          />
        </View>
      </>
    );
  }
}

export default inject("stores")(observer(CommentInput));