import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Header,
  Container,
  Content,
  Body,
  Title,
  Left,
  Right,
} from 'native-base';
import Firebase from 'react-native-firebase';
import IconButton from '../../common/IconButton';
import CommentsList from '../../../containers/Comments';
import CommentBox from '../../../containers/CommentBox';

export default class Comments extends Component {
  componentDidMount = () => Firebase.analytics().setCurrentScreen('add_comment');
  
  static navigationOptions = () => {
    return {
      header: null
    };
  };

  _onBack = () => this.props.navigation.goBack()

  render() {
    const id = this.props.navigation.getParam('id');
    const name = this.props.navigation.getParam('name', 'Comments');

    return (
      <Container>
        <Header noRight>
          <Left>
            <IconButton
              name="arrow-left"
              type="Feather"
              onPress={this._onBack}
            />
          </Left>
          <Body>
            <Title>
              {name}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.container}>
          <CommentsList id={id} />
        </Content>
        <CommentBox
          id={id}
          shouldComment
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})