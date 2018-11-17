import React, { PureComponent } from 'react';
import { ToastAndroid } from 'react-native';
import { Mutation } from 'react-apollo';
import CommentBox from '../components/Comments/CommentBox';
import CREATE_POST from '../graphql/mutation/CreatePost';
import COMMENTS from '../graphql/query/Comments';
import EVENT from '../graphql/localState/query/Event';
import { FAILED_TO_POST_COMMENT } from '../lib/errorMessages';
import i18n from '../config/i18n';

export default class CommentBoxContainer extends PureComponent {
  constructor(props) {
    const at = props.receiver ? `@${props.receiver} ` : '';
    super(props);
    this.state = {
      message: `${at}`
    }
  }

  update = (cache, { data: { createPost }}) => {
    const { post } = createPost;
    const { event } = post;
    const { id } = event;
    const prev = cache.readQuery({
      query: COMMENTS,
      variables: {
        id: event.id,
      }
    });
    cache.writeQuery({
      query: COMMENTS,
      variables: {
        id,
      },
      data: Object.assign({}, prev, {
        comments: Object.assign({}, prev.comments, {
          edges: [...prev.comments.edges, {
            node: post,
            __typename: 'PostEdge',
          }],
        })
      })
    });

    const prevEvent = cache.readQuery({
      query: EVENT,
      variables: {
        id
      }
    });

    cache.writeQuery({
      query: EVENT,
      variables: {
        id,
      },
      data: Object.assign({}, prevEvent, {
        event: Object.assign({}, prevEvent.event, {
          commentsCount: prevEvent.event.commentsCount + 1,
        })
      })
    })
  }

  _handleError = () => ToastAndroid.show(FAILED_TO_POST_COMMENT, ToastAndroid.SHORT)

  _onValueChange = (val) => {
    if (val.length < 225) {
      this.setState({ message: val })
    } else {
      ToastAndroid.show(i18n.t('input.warn'), ToastAndroid.SHORT);
    }
  }

  _onCompleted = () => {
    const { scrollToEnd } = this.props;
    if (scrollToEnd) {
      scrollToEnd();
      if (this.commentBox) {
        this.commentBox.clear();
        this.setState({ message: '' })
      }
    }
    ToastAndroid.show(i18n.t('comment.message_sent'), ToastAndroid.SHORT);
  }

  render() {
    const { id, shouldComment } = this.props;
    return (
      <Mutation
        mutation={CREATE_POST}
        update={this.update}
        onCompleted={this._onCompleted}
        onError={this._handleError}
      >
        {(mutate, { loading }) => {
          return (
            <CommentBox
              message={this.state.message}
              ref={el => this.commentBox = el}
              shouldComment={shouldComment}
              loading={loading}
              onValueChange={this._onValueChange}
              handleSubmit={() => {
                mutate({
                  variables: {
                    input: {
                      eventId: id,
                      post :{
                        message: this.state.message,
                      },
                    },
                  },
                })
              }}
            />
          )
        }}
      </Mutation>
    )
  }
}