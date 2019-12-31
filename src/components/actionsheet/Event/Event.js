import React from 'react';
import { InteractionManager } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { I18n } from 'aws-amplify';
import { inject, observer } from 'mobx-react';
import handleShareEvent from 'helpers/share';
import logger from 'config/logger';

class EventAction extends React.Component {
  showActionSheet = () => {
    this.actionSheet.show();
  };

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

  _handleBookmark = async () => {
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
          await removeBookmark(input, id);
        } else {
          input.bookmarkEventId = id,
          input.bookmarkScheduleId = bookmarkScheduleId;
          await bookmarkEvent(input);
        }
        if (!isBookmarked) {
          stores.snackbar.show(I18n.get(`TOAST_${isBookmarked ? "removed" : "saved"}`));
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
        InteractionManager.runAfterInteractions(this._handleShare);
        break;
      case 1:
        InteractionManager.runAfterInteractions(this._handleBookmark);
        break;
      case 2:
        InteractionManager.runAfterInteractions(this._toggleMute);
        break;
    }
  };

  render() {
    const { 
      title,
      isBookmarked,
      isMuted,
      stores
    } = this.props;

    const options = [I18n.get('BUTTON_back')];
    options.unshift(
      I18n.get('BUTTON_shareVia'),
      isBookmarked ? I18n.get('BUTTON_removeBookmark') : I18n.get('BUTTON_bookmark'),
      isMuted ? I18n.get('BUTTON_unmute') : I18n.get('BUTTON_mute')
    );
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

export default inject("stores")(observer(EventAction));