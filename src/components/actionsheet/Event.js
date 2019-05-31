import React from 'react';
import ActionSheet from 'react-native-actionsheet';

export default class EventAction extends React.Component {

  showActionSheet = () => {
    this.actionSheet.show();
  }

  render() {
    const { 
      id,
      isStarred,
      isAuthor
    } = this.props;
    const options = ['Cancel'];
    if (isAuthor) options.unshift('Delete');
    options.unshift(isStarred ? 'Unstar' : 'Star');
    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = isAuthor ? cancelButtonIndex - 1 : undefined;

    return (
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleActionSheet}
      />
    )
  }

}