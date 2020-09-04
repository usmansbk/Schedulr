import {capitalize} from 'lib/utils';

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';
const NEXT_LAST_FORMAT = 'dddd, Do';
const CAL_TIME_FORMAT = 'DD MMM YYYY hh:mm';

export default {
  APP_welcome: 'Welcome to Schedulr',
  APP_footerCaption: 'By signing in, you agree to our',
  APP_TERMS: 'Terms of Service',
  APP_AND: ' and ',
  APP_PRIVACY: 'Privacy Policy',

  ACTION_filterByType: (filter) => 'Filter By Type: ' + capitalize(filter),
  ACTION_all: 'All',
  ACTION_events: 'Events',
  ACTION_schedules: 'Groups',
  ACTION_bookmarks: 'Bookmarks',
  ACTION_followers: 'Members',
  ACTION_comments: 'Comments',
  ACTION_clearAll: 'Clear all',

  COMMENTS: 'Comments',
  COMMENTS_emptyList: 'No comments',
  COMMENTS_loadMore: (count) =>
    `View ${count} more comment${count > 1 ? 's' : ''}`,
  COMMENT_tooLong: 'Comment too long',
  FOLLOWERS_emptyList: 'No members',
  FOLLOWERS_loadMore: 'Load more',
  FOLLOWERS: 'Members',
  BUTTON_leave: 'Leave',
  BUTTON_join: 'Join',

  EVENTS_emptyList: 'No upcoming events',
  EVENT_noLocationSet: 'No location set',
  EVENT_noDescription: 'No description',
  EVENTS_SECTIONLIST_noMoreEvents: 'No more events',
  EVENTS_SECTIONLIST_noPrevEvents: 'No previous events',
  EVENTS_SECTION_FOOTER: 'No upcoming events',
  EVENTS_SECTION_ITEM_COUNT: (count) => (count ? `${count} events` : ''),
  EVENT_interested: 'Interested',
  EVENT_share: 'Share this event...',
  EVENT_bookmark: "I'm interested",
  EVENT_unbookmark: "I'm not interested",
  EVENT_mute: 'Mute this event',
  EVENT_unmute: 'Unmute this event',

  BOARD_emptyList: "You don't belong to any group",
  BOARD_emptyListCaption: 'Join or create a group',

  PROFILE_boardEmptyList: 'Nothing here yet...',
  PROFILE_followingLabel: 'Joined',
  PROFILE_createdLabel: 'Created',

  BOOKMARKS_emptyList: "You haven't saved any events yet",
  BOOKMARKS_BY_emptyList: 'No bookmarks yet',
  BOOKMARKED_BY: 'Interested',

  MORE_settings: 'Settings',
  MORE_inviteAFriend: 'Tell A Friend',
  MORE_help: 'Help',
  MORE_signOut: 'Sign out',
  MORE_sync: 'Sync',
  MORE_importCalendar: 'Import Calendar',

  DISCOVER_emptyList: 'Discover',
  DISCOVER_turnOnLocation: 'Use your location',
  DISCOVER_locationUsage:
    'Schedulr requires your location to find nearby events.',
  DISCOVER_emptyListCaption: 'Events happening around you!',

  SEARCH_inputPlaceholder: (city) => `Search${city ? ' ' + city : ' Schedulr'}`,
  SEARCH_schedulesTabLabel: 'Groups',
  SEARCH_eventsTabLabel: 'Events',
  SEARCH_peopleTabLabel: 'People',
  SEARCH_emptyList: 'No results',
  SEARCH_loadMore: 'Load more',
  SEARCH_noMoreResults: 'No more results',

  NOTIFICATIONS_emptyUpdatesList: 'Stay tuned!',
  NOTIFICATIONS_emptyUpdatesListCaption:
    'Important updates and announcements will appear here',
  NOTIFICATIONS_allCaughtUp: 'You are all caught up!',
  NOTIFICATIONS_title: (filter) => {
    if (filter === 'all') return 'Notifications';
    return `Notifications - ${capitalize(filter)}s`;
  },

  MENU_edit: 'Edit',
  MENU_archive: 'Archive',
  MENU_unarchive: 'Unarchive',
  MENU_duplicate: 'Duplicate',
  MENU_cancel: 'Cancel',
  MENU_delete: 'Delete',

  SETTINGS_screenTitle: 'Settings',
  SETTINGS_generalSectionTitle: 'General',
  SETTINGS_commentSectionTitle: 'Comments',
  SETTINGS_sound: 'Sound',
  SETTINGS_vibrate: 'Vibrate',
  SETTINGS_dark: 'Dark Theme',
  SETTINGS_location: 'Location',
  SETTINGS_reminderSectionTitle: 'Reminder',
  SETTINGS_disableReminders: 'Mute all events',
  SETTINGS_remindMe: 'Remind me',
  SETTINGS_pushSectionTitle: 'Push notification',
  SETTINGS_disablePush: 'Disable',
  SETTINGS_disableComments: 'Disable comments',
  SETTINGS_disableAdminComment: 'Disable admin comments',
  SETTINGS_enableMembersComment: 'Enable members comments',
  SETTINGS_disableReplies: 'Disable replies',

  REMIND_ME_title: 'Remind me',
  REMIND_ME_five: '5 minutes before',
  REMIND_ME_ten: '10 minutes before',
  REMIND_ME_fifteen: '15 minutes before',
  REMIND_ME_thirty: '30 minutes before',
  REMIND_ME_oneHour: '1 hour before',
  REMIND_ME_oneDay: '1 day before',

  SIGN_OUT_title: 'Sign out?',

  HELP_title: 'Help',
  HELP_contactUs: 'Contact Developer',
  HELP_contactUsSubtitle: 'Questions? Need help',
  HELP_copyRight: 'Copyright Information',
  HELP_terms: 'Terms of Service',
  HELP_appVersion: 'App version',
  HELP_build: 'Build version',
  HELP_privacy: 'Privacy Policy',

  BUTTON_import: 'Import',
  BUTTON_cancel: 'Cancel',
  BUTTON_create: 'create',
  BUTTON_save: 'save',
  BUTTON_signout: 'Sign out',
  BUTTON_ok: 'Ok',
  BUTTON_askMeLater: 'Ask me later',
  BUTTON_dismiss: 'Dismiss',
  BUTTON_continue: 'Continue',
  BUTTON_done: 'Done',
  BUTTON_next: 'Next',
  BUTTON_skip: 'Skip',
  BUTTON_loading: 'Loading...',
  BUTTON_tryAgain: 'Try again',
  BUTTON_addMyCalendar: 'Add My Calendar',
  BUTTON_continueWithEmail: 'Continue with email',
  BUTTON_continueWithGoogle: 'Sign in with Google',
  BUTTON_continueWithFacebook: 'Continue with Facebook',
  BUTTON_loggingIn: 'Logging in...',
  BUTTON_signingIn: 'Signing in...',
  BUTTON_editProfile: 'Edit Profile',
  BUTTON_shareInviteLink: 'Share invite link',
  BUTTON_unfollow: 'Leave',
  BUTTON_turnOnLocation: 'Turn on',
  BUTTON_confirm: 'Confirm',
  BUTTON_delete: 'DELETE',

  BUTTON_logout: 'SIGN OUT',

  ALERT_whatIsASchedule: 'What is a group?',
  ALERT_whatIsAScheduleA:
    'A group is where you add events, so your team mates can join and receive updates',
  ALERT_privateSchedule: 'Private group',
  ALERT_privateScheduleA: 'This group can only be joined via group link',
  ALERT_publicScheduleA: 'This group is visible to everyone.',
  ALERT_deleteImage: 'Delete image?',
  ALERT_unfollow: (name) => `Leave ${name}?`,
  ALERT_unfollowMessage: "You'll no longer receive updates about their events.",

  SHARE_SCHEDULE_inviteTitle: 'Share group link via...',
  SHARE_SCHEDULE_subject: 'You have been invited to join a group on Schedulr.',
  SHARE_SCHEDULE_message: (name) =>
    `Hello, I'm inviting you to join "${name}" to see their latest events, receive updates and reminders.\n`,
  SHARE_EVENT_inviteTitle: 'Share event via...',
  SHARE_appMessage: `Hi! I'm inviting you to use Schedulr!\n\nWith Schedulr you can easily share events with communities, be it family, work or school.\n\nDownload Schedulr here:`,
  SHARE_appTitle: 'Invite a friend',
  SHARE_appSubject: 'See events happening near you',

  TOAST_enableReminder: 'Unmute all events to continue!',
  TOAST_fetchingUpdates: 'Fetching updates...',
  TOAST_newNotifications: (count) =>
    `${count} new notification${count > 1 ? 's' : ''}`,
  TOAST_downloading: 'Downloading...',
  TOAST_downloadFailed: 'Download failed',
  TOAST_fileTooLarge: (name) => `"${name.slice(0, 20)}..." is larger than 8mb`,

  PROFILE_FORM_name: 'NAME',
  PROFILE_FORM_website: 'WEBSITE',
  PROFILE_FORM_bio: 'ABOUT',
  PROFILE_joined: (date) => `Joined ${date}`,

  VENUE: 'VENUE',
  REPEAT: 'REPEAT',
  CREATED: 'CREATED',
  UNTIL: 'UNTIL',
  AUTHOR: 'AUTHOR',
  EDITED: 'EDITED',

  EVENT_FORM_normal: 'Event',
  EVENT_FORM_title: 'TITLE',
  EVENT_FORM_description: 'DESCRIPTION',
  EVENT_FORM_venue: 'LOCATION',
  EVENT_FORM_category: 'TYPE',
  EVENT_FORM_from: 'FROM',
  EVENT_FORM_to: 'TO',
  EVENT_FORM_allDay: 'ALL DAY',
  EVENT_FORM_repetition: 'REPEAT',
  EVENT_FORM_schedule: 'GROUP',
  EVENT_FORM_repeat: 'REPEAT',
  EVENT_FORM_repeatForever: 'REPEAT FOREVER',
  EVENT_FORM_repeatUntil: 'REPEAT UNTIL',
  EVENT_FORM_selectASchedule: 'Select a group',

  EVENT_ITEM_allDay: 'All day',
  EVENT_CAPTION_allDay: ({type, recurrence}) => {
    return `${recurrence} ${type}`;
  },
  EVENT_CAPTION_xDurationRecurrenceType: ({duration, recurrence, type}) => {
    return `${duration}${recurrence ? ` ${recurrence}` : ''}${
      type ? ` ${type}` : ''
    }`;
  },

  HELPER_TEXT_shortUntil: 'Event should happen at least once',
  HELPER_TEXT_invalidDatesAndRecur: 'Event should end before repeating',

  SCHEDULE: 'GROUP',
  SCHEDULE_public: 'Public group',
  SCHEDULE_private: 'Private group',
  SCHEDULE_FORM_name: 'GROUP NAME',
  SCHEDULE_FORM_description: 'DESCRIPTION',
  SCHEDULE_FORM_private: 'Private',
  SCHEDULE_FORM_public: 'PUBLIC GROUP',
  SCHEDULE_FORM_topic: 'TOPIC',
  SCHEDULE_FORM_location: 'LOCATION',
  SCHEDULE_FORM_selectTopic: 'Select Topic',
  SCHEDULE_FORM_locationHelperText:
    'Tagging location will enable nearby users discover your group and events',

  SCHEDULE_followerCount: 'Member',
  SCHEDULE_followerCounts: 'Members',
  SCHEDULE_eventsCount: 'Event',
  SCHEDULE_eventsCounts: 'Events',
  SCHEDULE_thisScheduleIsClosed: 'This group is archived',
  SCHEDULE_whatIsASchedule: 'What is a group?',
  SCHEDULE_share: 'Share this group via...',
  SCHEDULE_unfollow: 'Leave this group',
  SCHEDULE_mute: 'Mute events',
  SCHEDULE_unmute: 'Unmute events',

  SCHEDULES_noUpcomingEvents: 'No upcoming events',
  SCHEDULES_loadPastEvents: (count) =>
    `Load (${count}) past event${count > 1 ? 's' : ''}`,
  SCHEDULES_noMoreEvents: 'No more events',

  RECUR_never: 'Never',
  RECUR_daily: 'Every day',
  RECUR_weekly: (day) => `Every week ( ${day} )`,
  RECUR_weekdays: 'Every weekday ( Mon - Fri )',
  RECUR_monthly: 'Every month',
  RECUR_yearly: (date) => `Every year ( ${date} )`,

  STATUS_concluded: 'Concluded',
  STATUS_ongoing: 'Ongoing',
  STATUS_done: 'Done',
  STATUS_cancelled: 'Cancelled',
  STATUS_upcoming: 'Upcoming',
  STATUS_closed: 'Archived',

  ERROR_serverError: (message) =>
    'Server Error' + (message ? ': ' + message : ''),
  ERROR_noConnection: 'No connection',
  ERROR_404: 'Not found',
  ERROR_404_caption: 'Item may have been deleted',
  ERROR_offline: "You're currently offline!",
  ERROR_somethingWentWrong: 'Something went wrong! Try Again',
  ERROR_failedToGetLocation:
    'Failed to access your location. Check your mobile network and GPS',
  ERROR_failedToRemoveImage: 'Failed to delete image',
  ERROR_failedToUploadImage: 'Failed to upload image',
  ERROR_failedToApplyTheme: 'Failed to apply theme',
  ERROR_failedToSendFiles: (len) => 'Failed to send ' + len + ' files',
  ERROR_navigationError: 'Navigation error',
  ERROR_signInFailure: 'Failed to Sign In',

  PLACEHOLDER_comment: (addressee) => {
    if (addressee) {
      return 'Replying ' + addressee;
    }
    return 'About this event...';
  },
  PLACEHOLDER_normal: 'Event',
  PLACEHOLDER_addYourWebsite: 'Add your website',
  PLACEHOLDER_bio: 'About me',
  PLACEHOLDER_venue: (city) => (city ? `In ${city}` : 'Venue'),
  PLACEHOLDER_customType: 'Custom type...',
  PLACEHOLDER_searchCities: 'Search cities',
  PLACEHOLDER_description: 'Tap to add description',
  PLACEHOLDER_title: 'Event Title',
  PLACEHOLDER_untitledEvent: 'No title',
  PLACEHOLDER_name: 'Name',

  WARNING_dontMissOut: "Don't miss out!",
  WARNING_fileTooLarge: 'File is too large',
  WARNING_deleteCalendarEvent: 'Event will be removed from the source calendar',

  DIALOG_cancelEvent: 'Cancel event?',
  DIALOG_onlyThisEvent: 'Only this date',
  DIALOG_allOfThisEvent: 'All events',
  DIALOG_openSchedule: 'Unarchive this group?',
  DIALOG_closeSchedule: 'Archive this group?',
  DIALOG_closeScheduleWarning:
    "If you archive this group, you won't be able to add new events ot it. If you change your mind, you can unarchive it.",
  DIALOG_deleteEvent: 'Delete this event?',
  DIALOG_deleteSchedule: 'Delete this group?',
  DIALOG_deleteScheduleWarning:
    "Delete this group and all of its events. You can't undo this.",
  DIALOG_cancelWarning:
    'This will permanently delete event. People interested in this event will be notified.',

  REQUEST_LOCATION_TITLE: 'Schedulr Location Permission',
  REQUEST_LOCATION_MESSAGE:
    'Schedulr App needs access to your location so events are easier to find.',

  PICKER_location: 'Location',
  SYNC_message: 'Will refresh all your data',
  SYNC_importingEvents: 'Importing events... Please wait.',
  SYNC_importingComplete: 'Events imported',
  SYNC_complete: 'Synchronized',

  TEXT_noAlbum: 'Photo Album',
  TEXT_noBanner: 'Event Banner',
  TEXT_album: 'Album',

  THEME_title: 'Theme',
  THEME_auto: 'Use my System Theme',
  THEME_light: 'Light',
  THEME_dark: 'Dark',

  MOMENT_left: (from) => `${from} left`,
  Today: 'Today',

  calendarFormats: {
    sameDay: '[Today], ddd Do',
    nextDay: '[Tomorrow], ddd Do',
    nextWeek: 'dddd, Do',
    lastDay: '[Yesterday], ddd Do',
    lastWeek: '[Last] dddd, Do',
    sameElse: 'ddd, Do MMM YYYY',
  },

  headingCalendarFormats: {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: DAY_FORMAT,
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: DATE_FORMAT,
  },
  calendarTimeFormats: {
    sameDay: '[Today] [at] HH:mm',
    nextDay: '[Tomorrow]',
    nextWeek: DAY_FORMAT,
    lastDay: '[Yesterday] [at] hh:mm',
    lastWeek: CAL_TIME_FORMAT,
    sameElse: CAL_TIME_FORMAT,
  },
  subheadingCalendarFormats: {
    sameDay: NEXT_LAST_FORMAT,
    nextDay: NEXT_LAST_FORMAT,
    nextWeek: DATE_FORMAT,
    lastDay: NEXT_LAST_FORMAT,
    lastWeek: DATE_FORMAT,
    sameElse: DAY_FORMAT,
  },
  SELECT_customType: 'Custom type...',
  categories: [
    'Event',
    'Meetup',
    'Workshop',
    'Conference',
    'Festival',
    'Performance',
    'Funfare',
    'Meeting',
    'Competition',
    'Party',
    'Lecture',
    'Tour',
    'Tournament',
    'Training',
    'Rally',
  ],
  topics: [
    'Events',
    'Personal Appointments',
    'Business & Professional',
    'Charity & Causes',
    'Community & Culture',
    'Education',
    'Fashion & Beauty',
    'Film, Media & Entertainment',
    'Food & Drink',
    'Government & Politics',
    'Health and Wellness',
    'Hobbies & Special Interest',
    'Family Lifestyle',
    'Music',
    'Religion & Spirituality',
    'School Activities',
    'Science & Technology',
    'Seasonal & Holiday',
    'Sports & Fitness',
    'Travel & Outdoor',
  ],
  personalSchedule: {
    name: 'Personal List 📝',
    description: 'My appointments.',
    isPublic: false,
  },
  timeLabels: {
    d: 'D',
    h: 'H',
    m: 'M',
    s: 'S',
  },
  daily: 'daily',
  weekly: 'weekly',
  weekdays: 'weekdays',
  monthly: 'monthly',
  yearly: 'yearly',
};
