import React from 'react';
import Comments from '../../routes/Comments';
import DeleteCommentDialog from '../../dialogs/DeleteComment';

export default class Screen extends React.Component {
  state = {
    visibleDialog: null,
    id: null
  }
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => this._openDialog(id, 'delete');
  _onReply = (id) => alert('Reply ' + id);
  _onEdit = (id) => alert('Edit ' + id);
  _openDialog = (id, visibleDialog) => this.setState({ visibleDialog, id });
  _hideDialog = () => this.setState({ visibleDialog: null, id: null })

  render() {
    return (
      <React.Fragment>
      <Comments
        goBack={this._goBack}
        handleDelete={this._onDelete}
        handleReply={this._onReply}
        handleEdit={this._onEdit}
      />
      <DeleteCommentDialog
        visible={this.state.visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      </React.Fragment>
    )
  }
}