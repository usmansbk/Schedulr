import React from 'react';
import { Formik } from 'formik';
import { View, TextInput } from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';
import UserAvatar from 'react-native-user-avatar';
import { CachedImage } from 'react-native-cached-image';
import styles, { AVATAR_SIZE } from './styles';
import colors from '../../../config/colors';

export default class CommentInput extends React.Component {
  state = {
    isSubmitting: false,
    message: ''
  };

  static defaultProps = {
    name: 'Schdlr',
    pictureUrl: null
  }

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
      pictureUrl,
      name,
      targetName,
      cancelReply
    } = this.props;
    const {
      isSubmitting,
      message
    } = this.state;

    return (
      <React.Fragment>
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
            rounded
            size={AVATAR_SIZE}
            src={pictureUrl}
            name={name}
            component={CachedImage}
            style={styles.avatar}
          />
          <View style={styles.input}>
            <TextInput
              ref={textInputRef => this._textInputRef = textInputRef}
              placeholder="About this event..."
              value={message}
              onChangeText={this._onChangeText}
              onBlur={() => this._onChangeText(message)}
              placeholderTextColor={colors.black}
              style={styles.textInput}
            />
          </View>
          <IconButton
            icon="send"
            color={colors.primary}
            disabled={isSubmitting || !message}
            onPress={this._onSubmit}
            style={styles.right}
          />
        </View>
      </React.Fragment>
    );
  }
}