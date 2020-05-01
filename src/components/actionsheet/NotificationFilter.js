import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import {
  EVENT_TYPE,
  SCHEDULE_TYPE,
  FOLLOW_TYPE,
  BOOKMARK_TYPE,
  COMMENT_TYPE
} from 'lib/constants';


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
        filter = EVENT_TYPE;
        break;
      case 2:
        filter = SCHEDULE_TYPE;
        break;
      case 3:
        filter = FOLLOW_TYPE;
        break;
      case 4:
        filter = BOOKMARK_TYPE;
        break;
      case 5:
        filter = COMMENT_TYPE;
        break;
      case 6:
        filter = 'clear';
        break;
    }
    if (filter) {
      setTimeout(() => {
        this.props.stores.notificationsStore.handleFilterAction(filter);
      }, 0);
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
        title={I18n.get('ACTION_filterByType')(stores.notificationsStore.filter)}
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