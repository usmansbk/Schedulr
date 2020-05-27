import React from 'react';
import ActionSheet from 'components/common/ActionSheet';
import { inject, observer } from 'mobx-react';
import { I18n } from 'aws-amplify';
import { handleShareSchedule } from 'helpers/share';

class ScheduleAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.open();
  };

  _actionSheetRef = ref => this.actionSheet = ref;

  _handleShare = () => {
    const { id, title } = this.props;
    handleShareSchedule({
      id,
      title,
    });
  };
  
  _toggleMute = () => this.props.onMute(this.props.id);

  _unfollowSchedule = () => {
    const input = {
      id: `${this.props.stores.appState.userId}-${this.props.id}`
    };
    this.props.unfollow(input, this.props.id);
  };

  _handleActionSheet = (value) => {
    switch (value) {
      case "share":
        setTimeout(this._handleShare, 200);
        break;
      case "mute":
        setTimeout(this._toggleMute, 0);
        break;
      case "follow": {
        if (this.props.isFollowing) {
          setTimeout(this._unfollowSchedule, 0);
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
    } = this.props;

    const options = [
      {
        value: "share",
        label: I18n.get("SCHEDULE_share"),
        icon: "share"
      },
      {
        value: "mute",
        label: I18n.get(`SCHEDULE_${isMuted ? 'unmute' : 'mute'}`),
        icon: "sound"
      }
    ];
    if (isFollowing) {
      options.push({
        value: "follow",
        label: I18n.get('SCHEDULE_unfollow'),
        icon: "pin"
      });
    }

    return (
      <ActionSheet
        ref={this._actionSheetRef}
        title={title}
        options={options}
        onPress={this._handleActionSheet}
      />
    )
  }

}

export default inject("stores")(observer(ScheduleAction));