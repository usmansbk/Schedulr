import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Text, ActionSheet } from 'native-base';
import CommentItem from './CommentItem';
import DeleteCommentModal from '../../containers/modals/DeleteComment';
import styles from './styles';
import i18n from '../../config/i18n';

class Comments extends Component {
  state = {
    visibleModal: null,
    id: null
  }

  _handleCloseModal = () => this.setState({ visibleModal: null, id: null })

  _onPressComment = ({ name, id, authorId, isAdmin, isAuthor }) => {
    const BUTTONS = [];
    if (isAdmin || isAuthor) BUTTONS.push({ text: i18n.t('comment.delete'), icon: "trash" });
    if (!isAuthor) BUTTONS.push({ text: `${i18n.t('menu.reply')}  "${name}"`, icon: "ios-chatboxes" })
//    if (isAdmin && !isAuthor) BUTTONS.push({ text: `Block "${name}"`, icon: 'ios-close-circle'});
    BUTTONS.push({ text: i18n.t('menu.cancel'), icon: "close" });

    const REPLY_INDEX = BUTTONS.findIndex(elem => elem.icon === 'ios-chatboxes')
    const DELETE_INDEX = BUTTONS.findIndex(elem => elem.icon === 'trash');
    const CANCEL_INDEX = BUTTONS.length - 1;

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DELETE_INDEX,
      },
      (buttonIndex) => {
        switch(buttonIndex) {
          case REPLY_INDEX:
            this.props.navigation.navigate('Comment', {
              id: this.props.id,
              receiver: name,
            })
            break;
          case DELETE_INDEX:
            this.setState({ visibleModal: 'delete', id });
            break;
          default:
            this.setState({ visibleModal: null, id: null });
            break;
        }
      }
    )
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if ((this.props.loading !== nextProps.loading) ||
      (this.props.hasPreviousPage !== nextProps.hasPreviousPage) ||
      (this.props.error !== nextProps.error) ||
      (this.state.visibleModal !== nextState.visibleModal) ||
      (this.props.comments.length !== nextProps.comments.length))
      return true;
      
    return false;
  }

  scrollToEnd = () => {
    if (this.flatList) {
      this.flatList.scrollToEnd();
    }
  }

  _keyExtractor = item => item.node.id

  _renderHeader = () => {
    const {
      hasPreviousPage,
      error,
      fetchPreviousComments,
      loading
    } = this.props;
    return (
      <React.Fragment>
        {  
          error && (<Text style={styles.text} uppercase={false}>{i18n.t("comment.reload")}</Text>)
        }
        { 
          (hasPreviousPage && !Boolean(error)) && (
            <Button
              transparent
              block
              disabled={loading}
              onPress={fetchPreviousComments}
            >
              <Text uppercase={false}>{
                loading ? 'Loading' :
                i18n.t("comment.prev")
              }</Text>
            </Button>)
        }
      </React.Fragment>
    )
  }

  _renderItem = ({ item: { node }}) => {
    const {
      id,
      message,
      isAdmin,
      isAuthor,
      author,
      createdAt
    } = node;
    const { name, photo } = author;
    return (
      <CommentItem
        id={id}
        message={message}
        createdAt={createdAt}
        isAdmin={isAdmin}
        isAuthor={isAuthor}
        name={name}
        authorId={author.id}
        photo={photo}
        onPress={this._onPressComment}
      />
    )
  }

  _ref = elm => this.flatList = elm;

  _renderSeparator = () => <View style={styles.seperator} />
  
  render() {
    const {
      id,
      comments,
      loading,
      onRefresh
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ref={this._ref}
          refreshing={loading}
          onRefresh={onRefresh}
          ListHeaderComponent={this._renderHeader}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={this._renderItem}
          data={comments}
          keyExtractor={this._keyExtractor}
        />
        <DeleteCommentModal
          id={this.state.id}
          eventId={id}
          isVisible={this.state.visibleModal === 'delete'}
          handleClose={this._handleCloseModal}
        />
      </View>
    )
  }
}

export default withNavigation(Comments);