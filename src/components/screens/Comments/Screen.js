import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';

class Screen extends React.Component {

  focusCommentInput = () => this._inputRef && this._inputRef.focusInput();

  blurCommentInput = () => this._inputRef && this._inputRef.blurInput();

  scrollDown = () => this._commentsListRef && this._commentsListRef.scrollDown();

  scrollTop = () => this._commentsListRef && this._commentsListRef.scrollTop();

  _handleSubmit = async (message, uploads) => {
    await this.props.onSubmit(message, uploads);
    this.scrollDown();
  };

  render() {
    const {
      id,
      loading,
      comments,
      commentsCount,
      nextToken,
      error,
      onRefresh,
      goBack,
      title,
      navigateToProfile,
      navigateToViewEmbed,
      stores,
      fetchMoreComments,
      isOwner
    } = this.props;

    const styles = stores.appStyles.styles;
    const colors = stores.themeStore.colors;

    return (
      <>
        <Appbar.Header style={styles.header}>
          <Appbar.Action
            size={24}
            color={colors.primary}
            icon={({ size, color }) => <Icon
              color={color}
              size={size}
              name="arrow-left"
            />}
            onPress={goBack}
          />
          <Appbar.Content
            title={title || I18n.get('COMMENTS')}
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
        <List
          ref={commentsRef => this._commentsListRef = commentsRef}
          error={error}
          id={id}
          loading={loading}
          comments={comments}
          commentsCount={commentsCount}
          nextToken={nextToken}
          onRefresh={onRefresh}
          navigateToProfile={navigateToProfile}
          navigateToViewEmbed={navigateToViewEmbed}
          fetchMoreComments={fetchMoreComments}
        />
        <CommentForm
          id={id}
          isOwner={isOwner}
          ref={inputRef => this._inputRef = inputRef}
          handleSubmit={this._handleSubmit}
          disabled={!comments.length && (loading || error)}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Screen));