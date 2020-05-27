import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';

class Screen extends React.Component {

  _inputRef = ref => this.inputRef = ref ;
  _listRef = ref => this.listRef = ref; 

  focusCommentInput = () => this.inputRef && this.inputRef.focusInput();

  blurCommentInput = () => this.inputRef && this.inputRef.blurInput();

  scrollDown = () => this.listRef && this.listRef.scrollDown();

  scrollTop = () => this.listRef && this.listRef.scrollTop();

  render() {
    const {
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
      isOwner,
      eventId,
      scheduleId
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
          ref={this._listRef}
          error={error}
          id={eventId}
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
          commentEventId={eventId}
          commentScheduleId={scheduleId}
          isOwner={isOwner}
          ref={this._inputRef}
          disabled={!comments.length && (loading || error)}
          onSubmit={this.scrollDown}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Screen));