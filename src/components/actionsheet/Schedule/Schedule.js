import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import { handleShareSchedule } from 'helpers/share';

class ScheduleAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };

  _handleShare = () => {
    const { id, title } = this.props;
    handleShareSchedule({
      id,
      title,
    });
  };
  
  _toggleMute = () => this.props.onMute(this.props.id);

  _unfollowSchedule = () => console.log('Unfollow', this.props.title);

  _handleActionSheet = (index) => {
    switch (index) {
      case 0:
        this._handleShare();
        break;
      case 1:
        this._toggleMute();
        break;
      case 2: {
        if (this.props.isFollowing) {
          this._unfollowSchedule();
        }
        break;
      }
    }
  };

  render() {
    const {
      title,
      isMuted,
      isFollowing,
      stores
    } = this.props;

    const options = [];
    options.unshift(
      I18n.get('BUTTON_shareInviteLink'),
      I18n.get(`BUTTON_${isMuted ? 'unmuteEvents' : 'muteEvents'}`)
    );
    if (isFollowing) {
      options.push(I18n.get('BUTTON_unfollow'));
    }
    options.push(I18n.get('BUTTON_back'));

    const cancelButtonIndex = options.length - 1;
    const destructiveButtonIndex = cancelButtonIndex - 1;

    return (
      <ActionSheet
        ref={ref => this.actionSheet = ref}
        title={title}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={this._handleActionSheet}
        styles={stores.appStyles.actionsheet}
      />
    )
  }

}

export default inject("stores")(observer(ScheduleAction));