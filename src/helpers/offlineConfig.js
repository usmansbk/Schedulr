import { I18n } from 'aws-amplify';
import updateApolloCache from 'helpers/updateApolloCache';
import client from 'config/client';
import { ADD, DELETE } from 'lib/constants';
import snackbar from 'helpers/snackbar';

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
    snackbar(message, true);
  } else {
    const { mutation, data } = success;
    if (mutation === 'createEvent') {
      const { createEvent } = data;
      snackbar(I18n.get('TOAST_eventAdded'));
      /**
       * For some reason offline mutation on cold start removes optimistic response
       * without calling the update function and needs to be written back after a moment delay.
       * This is a temporary work around before it is fixed.
       */
      const timeout = setTimeout(() => {
        updateApolloCache(client, createEvent, ADD);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'createSchedule') {
      const { createSchedule } = data;
      console.log('********** BEFORE ***********');
      updateApolloCache(client, createSchedule, ADD);
      console.log('********** AFTER ***********');
      // const timeout = setTimeout(() => {
      //   clearTimeout(timeout);
      // }, 2000);
    } else if (mutation === 'createFollow') {
      const { createFollow } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, createFollow, ADD);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'createBookmark') {
      const { createBookmark } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, createBookmark, ADD);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'deleteEvent') {
      const { deleteEvent } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, deleteEvent, DELETE);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'deleteFollow') {
      const { deleteFollow } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, deleteFollow, DELETE);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'deleteBookmark') {
      const { deleteBookmark } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, deleteBookmark, DELETE);
        clearTimeout(timeout);
      }, 2000);
    } else if (mutation === 'deleteSchedule') {
      const { deleteSchedule } = data;
      const timeout = setTimeout(() => {
        updateApolloCache(client, deleteSchedule, DELETE);
        clearTimeout(timeout);
      }, 2000);
    }
  }
}