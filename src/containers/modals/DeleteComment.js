import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ToastAndroid } from 'react-native';
import Modal from '../../components/common/Modal';
import DELETE_COMMENT from '../../graphql/mutation/DeleteComment';
import EVENT from '../../graphql/localState/query/Event';
import COMMENTS from '../../graphql/query/Comments';
import { GENERIC_ERROR } from '../../lib/errorMessages';
import i18n from '../../config/i18n';

export default class DeleteCommentModal extends Component {
  shouldComponentUpdate = (nextProps) => {
    return nextProps.isVisible !== this.props.isVisible;
  }
  
  update = (cache, { data: { deletePost }}) => {
    const { id } = deletePost;
    const prev = cache.readQuery({
      query: COMMENTS,
      variables: {
        id: this.props.eventId,
      }
    });
    const { comments } = prev;
    const targetIndex = comments.edges.findIndex(elem => elem.node.id === id );

    if (targetIndex !== -1) {
      cache.writeQuery({
        query: COMMENTS,
        variables: {
          id: this.props.eventId,
        },
        data: Object.assign({}, prev, {
          comments: Object.assign({}, comments, {
            edges: comments.edges.slice(0, targetIndex).concat(
              comments.edges.slice(targetIndex + 1)
            )
          })
        })
      });
  
      const prevEvent = cache.readQuery({
        query: EVENT,
        variables: {
          id: this.props.eventId
        }
      });
  
      cache.writeQuery({
        query: EVENT,
        variables: {
          id: this.props.eventId
        },
        data: Object.assign({}, prevEvent, {
          event: Object.assign({}, prevEvent.event, {
            commentsCount: prevEvent.event.commentsCount - 1,
          })
        })
      })
    }
  }

  _handleClose = () => this.props.handleClose();

  _onCompleted = () => {
    const { handleClose } = this.props;
    ToastAndroid.show(i18n.t('toast.comment_deleted'), ToastAndroid.SHORT);
    handleClose();
  }

  _handleError = () => ToastAndroid.show(GENERIC_ERROR, ToastAndroid.SHORT);

  render() {
    const { id, isVisible } = this.props;
    return (
      <Mutation
        mutation={DELETE_COMMENT}
        onCompleted={this._onCompleted}
        update={this.update}
        onError={this._handleError}
      >
        {(deleteComment, { loading }) => {
          return (
            <Modal
              title={i18n.t('comment.delete_comment')}
              isVisible={isVisible}
              loading={loading}
              handleClose={this._handleClose}
              handleAccept={() => {
                deleteComment({
                  variables: {
                    input: {
                      id
                    }
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
