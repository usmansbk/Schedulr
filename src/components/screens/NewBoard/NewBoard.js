import React from 'react';
import Form from '../../forms/Board';

export default class NewBoardScreen extends React.Component {
  _handleBack = () => this.props.navigation.goBack();
  _handleSubmit = async (input) => {
    try {
      const result = await this.props.onSubmit(input);
      console.log(result);
      this.props.navigation.replace('BoardEvents', {
        id: result.data.createBoard.id
      });
    } catch(error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Form
        handleCancel={this._handleBack}
        onSubmit={this._handleSubmit}
      />
    )
  }
}