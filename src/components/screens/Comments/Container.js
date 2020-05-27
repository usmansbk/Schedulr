import React from 'react';
import Screen from './Screen';
import Suspense from 'components/common/Suspense';

export default class Container extends React.Component {
  state = {
    display: false
  };

  componentDidMount = () => {
    setTimeout(() => this.setState({
      display: true
    }), 0);
  };

  _goBack = () => this.props.navigation.goBack();
  _navigateToViewEmbed = ({ subtitle, uri, s3Object }) => this.props.navigation.navigate(
    'ViewEmbed', {
      subtitle,
      uri,
      s3Object
    }
  );
  _navigateToProfile = (id) => this.props.navigation.navigate('UserProfile', { id });

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
      onRefresh,
      error,
      fetchMore,
      nextToken,
      comments,
      commentsCount,
      isOwner,
      commentEventId,
      commentScheduleId,
      notFound
    } = this.props;

    return (
      <Screen
        notFound={notFound}
        eventId={commentEventId}
        scheduleId={commentScheduleId}
        isOwner={isOwner}
        loading={loading}
        title={this.props.navigation.getParam('title')}
        error={Boolean(error)}
        commentsCount={commentsCount}
        comments={comments.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))}
        goBack={this._goBack}
        onRefresh={onRefresh}
        navigateToProfile={this._navigateToProfile}
        navigateToViewEmbed={this._navigateToViewEmbed}
        fetchMoreComments={fetchMore}
        nextToken={nextToken}
      />
    );
  }
}
