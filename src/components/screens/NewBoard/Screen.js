import React from 'react';
import Form from 'components/forms/Board';

export default class NewBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    const result = await this.props.onSubmit(input);
    this.props.navigation.replace('Board', {
      id: result.data.createBoard.id,
      cacheFirst: true
    });
  };

  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}