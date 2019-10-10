import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';

class FilterAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };
  
  _handleActionSheet = (index) => {
    let filter = 'all';
    switch (index) {
      case 0:
        filter = 'all';
        break;
      case 1:
        filter = 'events';
        break;
      case 2:
        filter = 'schedules';
        break;
      case 3:
        filter = 'followers';
        break;
      case 4:
        filter = 'bookmarks';
        break;
      case 5:
        filter = 'comments';
        break;
    }
    alert(filter);
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
      I18n.get('BUTTON_back')
    ];
   
    const cancelButtonIndex = options.length - 1;

    return (
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={I18n.get('ACTION_filterByType')}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        onPress={this._handleActionSheet}
        styles={stores.appStyles.actionsheet}
      />
    )
  }

}

export default inject("stores")(observer(FilterAction));