import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { I18n } from 'aws-amplify';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { inject, observer } from 'mobx-react';
import { getComment } from 'api/queries';
import Item from './Item';

class ThreadTopic extends React.Component {
  render() {
    const { threadId, loading, comment } = this.props;
    if (!threadId) return null;
    
    let Loading = <ActivityIndicator />;
    let Unavailable = <Text>{I18n.get("COMMENT_unavailable")}</Text>;
    let Topic;

    if (comment) {
      const {
        id,
        content,
        attachment,
        author,
        event,
        to,
        isOwner,
        createdAt,
      } = comment;
      Topic = (
        <Item
          id={id}
          authorId={author.id}
          authorName={author.name}
          authorPictureUrl={author.avatar ? getImageUrl(author.avatar) : author.pictureUrl}
          isOwner={isOwner}
          content={content}
          attachment={attachment}
          createdAt={createdAt}
          commentEventId={event.id}
          toCommentId={to && to.id}
          toCommentAuthorName={to && to.author.name}
          toCommentContent={to && to.content}
          toAttachment={to && to.attachment}
          navigateToProfile={this.props.navigateToProfile}
          navigateToThread={this.props.navigateToThread}
          navigateToViewEmbed={this.props.navigateToViewEmbed}
          onDelete={this.props.onDelete}
          handleReplyComment={this.props.handleReply}
        />
      );
    }

    return (
      <View style={{paddingBottom: 8}}>
        {
          loading ? Loading : (
            comment ? Topic : Unavailable
          ) 
        }
      </View>
    );
  }
}

const withGraphql = graphql(gql(getComment), {
  options: props => ({
    variables: {
      id: props.threadId,
    },
    fetchPolicy: 'cache-first'
  }),
  skip: props => !props.threadId,
  props: ({ data, ownProps }) => ({
    loading: data && data.loading,
    comment: data && data.getComment,
    ...ownProps
  })
})(ThreadTopic)

export default inject("stores")(observer(withGraphql));