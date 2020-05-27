import React from 'react';
import { Appbar } from 'react-native-paper';
import Icon from 'components/common/Icon';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import List from 'components/lists/Comments';
import CommentForm from 'components/forms/Comment';
import Suspense from 'components/common/Suspense';

class Screen extends React.Component {
  state = {
    display: false
  };

  _inputRef = ref => this.inputRef = ref ;
  _listRef = ref => this.listRef = ref; 

  focusCommentInput = () => this.inputRef && this.inputRef.getWrappedInstance().focusInput();

  blurCommentInput = () => this.inputRef && this.inputRef.getWrappedInstance().blurInput();

  scrollDown = () => this.listRef && this.listRef.scrollDown();

  scrollTop = () => this.listRef && this.listRef.scrollTop();

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _goBack = () => this.props.navigation.goBack();
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });
  _navigateToViewEmbed = ({ subtitle, uri, s3Object }) => this.props.navigation.navigate(
    'ViewEmbed', {
      subtitle,
      uri,
      s3Object
    }
  );

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      this.state.display !== nextState.display ||
      this.props.comments.length !== nextProps.comments.length ||
      this.props.loading !== nextProps.loading
    );
  };

  render() {
    const {
      display
    } = this.state;
    
    if (!display) return <Suspense />;

    const {
      loading,
      comments,
      commentsCount,
      nextToken,
      error,
      onRefresh,
      title,
      stores,
      fetchMoreComments,
      isOwner,
      commentEventId,
      commentScheduleId
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
          id={commentEventId}
          loading={loading}
          comments={comments}
          commentsCount={commentsCount}
          nextToken={nextToken}
          onRefresh={onRefresh}
          fetchMoreComments={fetchMoreComments}
          navigateToProfile={this._navigateToProfile}
          navigateToViewEmbed={this._navigateToViewEmbed}
          focusInput={this.focusCommentInput}
          blurInput={this.blurCommentInput}
        />
        <CommentForm
          commentEventId={commentEventId}
          commentScheduleId={commentScheduleId}
          isOwner={isOwner}
          ref={this._inputRef}
          disabled={!comments.length && (loading || error)}
          scrollDown={this.scrollDown}
        />
      </>
    );
  }
}

export default inject("stores")(observer(Screen));