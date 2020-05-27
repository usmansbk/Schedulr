import React from 'react';
// import ActionSheet from 'react-native-actionsheet';
import ActionSheet from 'components/common/ActionSheet';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import handleShareEvent from 'helpers/share';
import logger from 'config/logger';
import snackbar from 'helpers/snackbar';

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
        if (!isBookmarked) {
          snackbar(I18n.get(`TOAST_${isBookmarked ? "removed" : "saved"}`));
        }
      } catch (error) {
        logger.logError(error);
      }
    }
  };

  _hideDialog = () => this.setState({ visibleDialog: null });

  _toggleMute = () => this.props.onMute(this.props.id);

  _handleActionSheet = (index) => {
    switch (index) {
      case 0:
        setTimeout(this._handleShare, 0);
        break;
      case 1:
        setTimeout(this._toggleMute, 0);
        break;
      case 2:
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

    const options = [];
    if (!isCalendarEvent) {
      options.unshift(
        isBookmarked ? I18n.get('BUTTON_removeBookmark') : I18n.get('BUTTON_bookmark')
      )
    }
    options.unshift(
      I18n.get('BUTTON_shareVia'),
      isMuted ? I18n.get('BUTTON_unmute') : I18n.get('BUTTON_mute')
    );

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