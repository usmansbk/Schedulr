import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import DeleteDialog from 'components/dialogs/DeleteEvent';
import CancelDialog from 'components/dialogs/CancelEvent';
import { ONE_TIME_EVENT } from 'lib/constants';

export default class EventAction extends React.Component {
  state = {
    visibleDialog: null
  };

  showActionSheet = () => {
    this.actionSheet.show();
  };

  _hideDialog = () => this.setState({ visibleDialog: null });

  _handleActionSheet = (index) => {
    const { isAuthor } = this.props;
    if (isAuthor) {
      switch (index) {
        case 1:
          this.setState({ visibleDialog: 'cancel' });
          break;
        case 2:
          this.setState({ visibleDialog: 'delete' });
          break;
      }
    }
  }

  render() {
    const { 
      id,
      title,
      isStarred,
      isAuthor,
      startAt,
      isRecurring
    } = this.props;
    const { visibleDialog } = this.state;

    const options = ['Back'];
    if (isAuthor) options.unshift('Cancel event', 'Delete event');
    options.unshift(isStarred ? 'Unstar event' : 'Star event');
    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = isAuthor ? cancelButtonIndex - 1 : undefined;

    return (
      <>
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={title}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleActionSheet}
      />
      <DeleteDialog
        id={id}
        visible={visibleDialog === 'delete'}
        handleDismiss={this._hideDialog}
      />
      <CancelDialog
        id={id}
        date={isRecurring ? startAt : null}
        visible={visibleDialog === 'cancel'}
        handleDismiss={this._hideDialog}
      />
      </>
    )
  }

}