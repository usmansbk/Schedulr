import React from 'react';
import {Appbar} from 'react-native-paper';
import Icon from 'components/common/Icon';
import {inject, observer} from 'mobx-react';
import {I18n} from 'aws-amplify';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';
import Suspense from 'components/common/Suspense';

class Screen extends React.Component {
  state = {
    display: false,
    commentAtId: null,
    commentToId: null,
    addressee: null,
  };

  _inputRef = (ref) => (this.inputRef = ref);
  _listRef = (ref) => (this.listRef = ref);

  focusCommentInput = () => {
    this.blurCommentInput();
    this.inputRef && this.inputRef.getWrappedInstance().focusInput();
  };

  blurCommentInput = () =>
    this.inputRef && this.inputRef.getWrappedInstance().blurInput();

  scrollDown = () => this.listRef && this.listRef.scrollDown();

  scrollTop = () => this.listRef && this.listRef.scrollTop();

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          display: true,
        }),
      0,
    );
  };

  _goBack = () => this.props.navigation.goBack();
  _navigateToProfile = (id) =>
    this.props.navigation.navigate('UserProfile', {id});
  _navigateToViewEmbed = ({subtitle, uri, s3Object}) =>
    this.props.navigation.navigate('ViewEmbed', {
      subtitle,
      uri,
      s3Object,
    });

  _handleReply = ([commentToId, commentAtId, addressee]) => {
    this.setState(
      {
        commentAtId,
        commentToId,
        addressee,
      },
      this.focusCommentInput,
    );
  };
  _clear = () => {
    this.setState({
      commentAtId: null,
      commentToId: null,
      addressee: null,
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.state.display !== nextState.display ||
      this.state.addressee !== nextState.addressee ||
      this.props.comments.length !== nextProps.comments.length ||
      this.props.loading !== nextProps.loading
    );
  };

  render() {
    const {display, addressee, commentAtId, commentToId} = this.state;

    if (!display) return <Suspense />;

    const {
      notFound,
      loading,
      comments,
      commentsCount,
      nextToken,
      error,
      onRefresh,
      title,
      stores,
      fetchMore,
      isOwner,
      commentEventId,
      commentScheduleId,
    } = this.props;

    const styles = stores.styles.appStyles;
    const colors = stores.theme.colors;

    return (
      <>
        <Appbar.Header style={styles.header}>
          <Appbar.Action
            animated={false}
            size={24}
            color={colors.primary}
            icon={({size, color}) => (
              <Icon color={color} size={size} name="arrow-left" />
            )}
            onPress={this._goBack}
          />
          <Appbar.Content
            title={title || I18n.get('COMMENTS')}
            titleStyle={styles.headerColor}
          />
        </Appbar.Header>
        <List
          ref={this._listRef}
          error={error}
          notFound={notFound}
          id={commentEventId}
          loading={loading}
          comments={comments.sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
          )}
          commentsCount={commentsCount}
          nextToken={nextToken}
          onRefresh={onRefresh}
          fetchMoreComments={fetchMore}
          navigateToProfile={this._navigateToProfile}
          navigateToViewEmbed={this._navigateToViewEmbed}
          onReply={this._handleReply}
        />
        <CommentForm
          addressee={addressee}
          commentAtId={commentAtId}
          commentToId={commentToId}
          commentEventId={commentEventId}
          commentScheduleId={commentScheduleId}
          isOwner={isOwner}
          ref={this._inputRef}
          disabled={notFound || (!comments.length && (loading || error))}
          scrollDown={this.scrollDown}
          clear={this._clear}
        />
      </>
    );
  }
}

export default Screen;
