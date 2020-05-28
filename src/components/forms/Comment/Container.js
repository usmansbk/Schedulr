import React from 'react';
import uuidv5 from 'uuid/v5';
import shortid from 'shortid';
import Form from './Form';

export default class Container extends React.Component {

  _formRef = ref => this.formRef = ref;

  focusInput = () => this.formRef && this.formRef.focusInput();
  blurInput = () => this.formRef && this.formRef.blurInput();

  _onSubmit = (message, attachment) => {
    const hash = uuidv5(this.props.stores.appState.userId, uuidv5.DNS);
    const sort = shortid.generate();
    const id = `${hash}-${sort}`;
    const input = {
      id,
      content: message,
      commentEventId: this.props.commentEventId,
      commentScheduleId: this.props.commentScheduleId,
    };
    if (this.props.commentAtId) {
      input.commentAtId = this.props.commentAtId;
    }
    if (this.props.commentToId) {
      input.commentToId = this.props.commentToId;
    }
    if (attachment) {
      input.attachment = attachment;
    }
    this.props.onSubmit && this.props.onSubmit(input);
    this.props.scrollDown && this.props.scrollDown();
    this.props.clear && this.props.clear();
  };

  render() {
    const {
      addressee,
      isOwner,
      disabled,
      clear
    } = this.props;
    return (
      <Form
        addressee={addressee}
        isOwner={isOwner}
        disabled={disabled}
        handleSubmit={this._onSubmit}
        clear={clear}
        ref={this._formRef}
      />
    );
  }
}