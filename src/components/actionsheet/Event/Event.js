import React from 'react';
import ActionSheet from 'components/common/ActionSheet';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import handleShareEvent from 'helpers/share';
import logger from 'config/logger';

class EventAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.open();
  };

  _actionSheetRef = ref => this.actionSheet = ref;

  _handleShare = () => {
    const {
      title,
      category,
      date,
      address,
      id
    } = this.props;
    handleShareEvent({
      id,
      title,
      category,
      date,
      address
    });
  };

  _handleBookmark = () => {
    const {
      id,
      stores,
      isBookmarked,
      removeBookmark,
      bookmarkEvent,
      bookmarkScheduleId,
      isCalendarEvent
    } = this.props;
    if (isCalendarEvent) {
    } else {
      const input = {
        id: `${stores.appState.userId}-${id}`,
      };
      try {
        if (isBookmarked) {
          setTimeout(() => {
            removeBookmark(input, id);
          }, 0);
        } else {
          input.bookmarkEventId = id,
          input.bookmarkScheduleId = bookmarkScheduleId;
          setTimeout(() => {
            bookmarkEvent(input);
          }, 0);
        }
      } catch (error) {
        logger.logError(error);
      }
    }
  };

  _hideDialog = () => this.setState({ visibleDialog: null });

  _toggleMute = () => this.props.onMute(this.props.id);

  _handleActionSheet = (value) => {
    switch (value) {
      case "share":
        setTimeout(this._handleShare, 200);
        break;
      case "mute":
        setTimeout(this._toggleMute, 0);
        break;
      case "save":
        setTimeout(this._handleBookmark, 0);
        break;
    }
  };

  render() {
    const { 
      title,
      isBookmarked,
      isCalendarEvent,
      isMuted,
    } = this.props;

    const options = [
      {
        value: "share",
        label: I18n.get("EVENT_share"),
        icon: "share"
      },
      {
        value: "mute",
        label: isMuted ? I18n.get('EVENT_unmute') : I18n.get('EVENT_mute'),
        icon: "sound"
      }
    ];
    if (!isCalendarEvent) {
      options.push(
        {
          value: "save",
          label: isBookmarked ? I18n.get('EVENT_unbookmark') : I18n.get('EVENT_bookmark'),
          icon: `star${isBookmarked ? '' : 'o'}`
        }
      )
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

export default inject("stores")(observer(EventAction));