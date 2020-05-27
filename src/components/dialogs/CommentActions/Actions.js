import React from 'react';
import { I18n } from 'aws-amplify';
import ActionSheet from 'components/common/ActionSheet';

export default class CommentActions extends React.Component {
  _actionsheetRef = ref => this.actionsheet = ref;
  open = () => this.actionsheet.open();
  cancel = () => this.actionsheet.close();
  _onConfirm = value =>  {
    console.log(value);
  };

  render() {
    const options = [
      {
        value: "reply",
        label: "Reply this comment",
        icon: "comments"
      },
      {
        value: "delete",
        label: "Delete this comment",
        icon: "trash"
      },
    ];
    return (
      <ActionSheet
        title={I18n.get("Options")}
        options={options}
        onPress={this._onConfirm}
        ref={this._actionsheetRef}
      />
    );
  }
}