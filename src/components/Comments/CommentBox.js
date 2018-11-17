import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Input,
  Button,
  Item,
  Text
} from 'native-base';

export default class CommentBox extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.loading !== this.props.loading ||
      nextProps.message !== this.props.message;
  }

  _onTextChange = (value) => this.props.onValueChange(value)

  _ref = elm => this.textInput = elm

  _handleSubmit = () => {
    this.props.handleSubmit && this.props.handleSubmit();
  }

  render() {
    const {
      loading,
      message,
    } = this.props;

    return (
      <View style={styles.container}>
        <Item rounded>
          <Input
            ref={this._ref}
            underlineColorAndroid="transparent"
            placeholder="Write a comment..."
            value={message}
            onChangeText={this._onTextChange}
            onSubmitEditing={this._handleSubmit}
          />
        </Item>
        {
          Boolean(message) && (
            <Button
              icon
              onPress={this._handleSubmit}
              rounded
              bordered
              disabled={loading}
              style={styles.button}
            >
              <Text uppercase={false}>Post</Text>
            </Button>
          )
        }
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  button: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    margin: 4
  }
})