import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Form from './Form';

export default class Container extends React.Component {

  _onSubmit = async (message, attachment) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      content: message,
      commentEventId: this.props.commentEventId,
      commentScheduleId: this.props.commentScheduleId,
    };
    if (attachment) {
      input.attachment = attachment;
    }
    this.props.onSubmit && await this.props.onSubmit(input);
  };

  render() {
    const {
      isOwner,
      disabled
    } = this.props;
    return (
      <Form
        isOwner={isOwner}
        disabled={disabled}
        handleSubmit={this._onSubmit}
      />
    );
  }
}