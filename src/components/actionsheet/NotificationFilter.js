import React from 'react';
import ActionSheet from 'components/common/ActionSheet';
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
    this.actionSheet.open();
  };

  _actionSheetRef = ref => this.actionSheet = ref
  
  _handleActionSheet = (index) => {
    let filter;
    switch (index) {
      case "all":
        filter = 'all';
        break;
      case EVENT_TYPE:
        filter = EVENT_TYPE;
        break;
      case SCHEDULE_TYPE:
        filter = SCHEDULE_TYPE;
        break;
      case FOLLOW_TYPE:
        filter = FOLLOW_TYPE;
        break;
      case BOOKMARK_TYPE:
        filter = BOOKMARK_TYPE;
        break;
      case COMMENT_TYPE:
        filter = COMMENT_TYPE;
        break;
      case "clear":
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
      { label: I18n.get('ACTION_all'), value: "all", icon: "bells" },
      { label: I18n.get('ACTION_events'), value: EVENT_TYPE, icon: "calendar" },
      { label: I18n.get('ACTION_schedules'), value: SCHEDULE_TYPE, icon: "pin" },
      { label: I18n.get('ACTION_followers'), value: FOLLOW_TYPE, icon: "addusergroup" },
      { label: I18n.get('ACTION_bookmarks'), value: BOOKMARK_TYPE, icon: "star" },
      { label: I18n.get('ACTION_comments'), value: COMMENT_TYPE, icon: "comment" },
      { label: I18n.get('ACTION_clearAll'), value: "clear", icon: "check" }
    ];
   
    return (
      <ActionSheet
        ref={this._actionSheetRef}
        title={I18n.get('ACTION_filterByType')(stores.notificationsStore.filter)}
        options={options}
        onPress={this._handleActionSheet}
      />
    )
  }

}

export default inject("stores")(observer(FilterAction));