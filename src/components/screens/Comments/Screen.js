import React from 'react';
import Comments from '../../routes/Comments';

export default class Screen extends React.Component {
  _goBack = () => this.props.navigation.goBack();
  _onDelete = (id) => alert('Delete ' + id);
  _onReply = (id) => alert('Reply ' + id);
  _onEdit = (id) => alert('Edit ' + id);

  render() {
    return (
      <Comments
        goBack={this._goBack}
        handleDelete={this._onDelete}
        handleReply={this._onReply}
        handleEdit={this._onEdit}
      />
    )
  }
}