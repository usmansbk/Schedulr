import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class FilterAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };
  
  _handleActionSheet = (index) => {
    let filter;
    switch (index) {
      case 0:
        filter = 'all';
        break;
      case 1:
        filter = 'Event';
        break;
      case 2:
        filter = 'Schedule';
        break;
      case 3:
        filter = 'Follower';
        break;
      case 4:
        filter = 'Bookmark';
        break;
      case 5:
        filter = 'Comment';
      case 6:
        filter = 'clear';
        break;
    }
    if (filter) {
      this.props.stores.notificationsStore.handleFilterAction(filter);
    }
  }

  render() {
    const {
      stores
    } = this.props;

    const options = [
      I18n.get('ACTION_all'),
      I18n.get('ACTION_events'),
      I18n.get('ACTION_schedules'),
      I18n.get('ACTION_followers'),
      I18n.get('ACTION_bookmarks'),
      I18n.get('ACTION_comments'),
      I18n.get('ACTION_clearAll'),
      I18n.get('BUTTON_back')
    ];
   
    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = cancelButtonIndex - 1;

    return (
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={I18n.get('ACTION_filterByType')}
        options={options}
        destructiveButtonIndex={destructiveButtonIndex}
        cancelButtonIndex={cancelButtonIndex}
        onPress={this._handleActionSheet}
        styles={stores.appStyles.actionsheet}
      />
    )
  }

}

export default inject("stores")(observer(FilterAction));