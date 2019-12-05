import { I18n } from 'aws-amplify';
import stores from 'stores';

export default (error, success) => {
  if (error) {
    const { mutation, variables: { input } } = error;
    let message = '';
    switch(mutation) {
      case 'createEvent':
      case 'updateEvent':
        message = I18n.get(`ERROR_failedToCreateEvent`)(input.title);
        break;
      case 'createSchedule':
      case 'updateSchedule':
        message = I18n.get(`ERROR_failedToCreateSchedule`)(input.name);
        break;
      case 'createComment':
        message = I18n.get(`ERROR_failedToCreateComment`)(input.content);
        break;
      case 'createBookmark':
        message = I18n.get(`ERROR_failedToCreateBookmark`);
        break;
      case 'createFollow':
        message = I18n.get(`ERROR_failedToCreateFollow`);
        break;
      case 'deleteEvent':
        message = I18n.get(`ERROR_failedToDeleteEvent`);
        break;
      case 'deleteSchedule':
        message = I18n.get(`ERROR_failedToDeleteSchedule`);
        break;
      case 'deleteFollow':
        message = I18n.get(`ERROR_failedToDeleteFollow`);
        break;
      case 'deleteBookmark':
        message = I18n.get(`ERROR_failedToDeleteBookmark`);
        break;
      case 'deleteComment':
        message = I18n.get(`ERROR_failedToDeleteComment`);
        break;
      default:
        message = I18n.get(`ERROR_fatal`);
        break;
    }
    message = message + I18n.get('ERROR_configHint');
    stores.snackbar.show(message, true);
  } else {
    const { mutation, data } = success;
    if (mutation === 'createEvent') {
      stores.snackbar.show(I18n.get('TOAST_eventAdded'))
    }
  }
}