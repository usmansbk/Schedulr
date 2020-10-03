import React from 'react';
import {I18n} from 'aws-amplify';
import ActionSheet from 'components/common/ActionSheet';

export default class CommentActions extends React.Component {
  _actionsheetRef = (ref) => (this.actionsheet = ref);
  open = () => this.actionsheet.open();
  close = () => this.actionsheet.close();
  _onPress = (value) => {
    switch (value) {
      case 'delete':
        this.props.onSubmit();
        if (this.props.attachment) {
          const keys = this.props.attachment.map((file) => file.key);
          this.props.stores.appState.removeKeysFromStorage(keys);
        }
        break;
      case 'reply':
        this.timer = setTimeout(this.props.onReply, 500); // prevent actionsheet from distracting keyboard
        break;
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  render() {
    const {title, isOwner} = this.props;
    const options = [
      {
        value: 'reply',
        label: 'Reply ' + title,
        icon: 'comments',
      },
    ];
    if (isOwner) {
      options.push({
        value: 'delete',
        label: 'Delete this comment',
        icon: 'trash',
      });
    }
    return (
      <ActionSheet
        title={I18n.get('Options')}
        options={options}
        onPress={this._onPress}
        ref={this._actionsheetRef}
      />
    );
  }
}
