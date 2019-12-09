import { capitalize } from 'lib/utils';
export default {
  ACTION_filterByType: filter => "Filter By Type: " + capitalize(filter),
  ACTION_all: "All",
  ACTION_events: "Events",
  ACTION_schedules: "Schedules",
  ACTION_bookmarks: "Bookmarks",
  ACTION_followers: "Followers",
  ACTION_comments: "Comments",
  ACTION_clearAll: "Clear all",

  COMMENTS: 'Comments',
  COMMENTS_emptyList: "No comments",
  COMMENTS_loadMore: "Load more comments",
  COMMENTS_noMoreComments: "No more comments",
  COMMENT_tooLong: "Comment too long",

  FOLLOWERS_emptyList: "No followers",
  FOLLOWERS_loadMore: "Load more",

  EVENTS_emptyList: "No upcoming events",
  EVENTS_SECTIONLIST_after: date => `After ${date}`,
  EVENTS_SECTIONLIST_noMoreEvents: () => "No more events",
  EVENTS_SECTIONLIST_before: date => `Before ${date}`,
  EVENTS_SECTIONLIST_noPrevEvents: () => "No previous events",
  EVENTS_SECTION_FOOTER: "No upcoming events",
  EVENTS_SECTION_ITEM_COUNT: count => count ? `${count} events` : '',
  
  BOARD_emptyList: "Your board is empty",
  BOARD_emptyListCaption: "Follow or create a schedule",

  PROFILE_boardEmptyList: "No schedules",
  PROFILE_followingLabel: "Following",
  PROFILE_createdLabel: "Created",
  PROFILE_notVisibleToPublic: "Events not visible to public",

  BOOKMARKS_emptyList: "You haven't saved any events yet",
  BOOKMARKS_COUNT: count => `bookmark${count > 1 ? 's' : ''}`,
  BOOKMARKS_BY_emptyList: "No bookmarks yet",
  BOOKMARKED_BY: "Bookmarked by",

  MORE_settings: "Settings",
  MORE_inviteAFriend: "Tell A Friend",
  MORE_help: "Help",
  MORE_signOut: "Sign out",
  MORE_sync: "Sync",

  DISCOVER_emptyList: "Discover",
  DISCOVER_turnOnLocation: "Use your location",
  DISCOVER_locationUsage: "Schdlr requires your location to find nearby events.",
  DISCOVER_emptyListCaption: "Events happening around you!",

  SEARCH_inputPlaceholder: city => `Search${city ? (' ' + city) : ' Schdlr'}`,
  SEARCH_schedulesTabLabel: "Schedules",
  SEARCH_eventsTabLabel: "My Events",
  SEARCH_peopleTabLabel: "People",
  SEARCH_emptyList: "No results",
  SEARCH_loadMore: "Load more",
  SEARCH_noMoreResults: "No more results",
  SEARCH_search: "Search Schdlr",

  NOTIFICATIONS_updatesTabLabel: "UPDATES",
  NOTIFICATIONS_messagesTabLabel: "COMMENTS",
  NOTIFICATIONS_emptyUpdatesList: "Stay tuned!",
  NOTIFICATIONS_emptyUpdatesListCaption: "Important updates and announcements will appear here",
  NOTIFICATIONS_emptyMessagesList: "No comments",
  NOTIFICATIONS_allCaughtUp: "You are all caught up!",
  NOTIFICATIONS_title: filter => {
    if (filter === 'all') return 'Notifications';
    return `Notifications - ${capitalize(filter)}s`;
  },

  SETTINGS_screenTitle: "Settings",
  SETTINGS_generalSectionTitle: "General",
  SETTINGS_commentSectionTitle: "Comments",
  SETTINGS_sound: "Sound",
  SETTINGS_vibrate: "Vibrate",
  SETTINGS_darkTheme: "Dark theme",
  SETTINGS_location: "Location",
  SETTINGS_reminderSectionTitle: "Reminder",
  SETTINGS_reminderDisable: "Mute all events",
  SETTINGS_remindMe: "Remind me",
  SETTINGS_pushSectionTitle: "Push notification",
  SETTINGS_pushDisable: "Disable",
  SETTINGS_disableComment: "Disable comments",
  SETTINGS_disableAdminComment: "Disable admin comments",
  SETTINGS_enableMembersComment: "Enable members comments",
  SETTINGS_disableReplies: "Disable replies",

  REMIND_ME_title: "Remind me",
  REMIND_ME_five: "5 minutes before",
  REMIND_ME_ten: "10 minutes before",
  REMIND_ME_fifteen: "15 minutes before",
  REMIND_ME_thirty: "30 minutes before",
  REMIND_ME_oneHour: "1 hour before",
  REMIND_ME_oneDay: "1 day before",

  MODAL_done: "Done",
  MODAL_continue: "CONTINUE",
  MODAL_dismiss: "DISMISS",

  SIGN_OUT_title: "Sign out?",
  SIGN_OUT_message: "Will clear data",

  HELP_title: "Help",
  HELP_contactUs: "Contact Developer",
  HELP_contactUsSubtitle: "Questions? Need help",
  HELP_copyRight: "Copyright Information",
  HELP_terms: "Terms of Service",
  HELP_appVersion: "App version",
  HELP_build: "Build version",
  HELP_privacy: "Privacy Policy",

  BUTTON_cancel: "Cancel",
  BUTTON_create: "create",
  BUTTON_save: "save",
  BUTTON_signout: "Sign out",
  BUTTON_ok: "Ok",
  BUTTON_help: "Help",
  BUTTON_dontShowAgain: "Don't show again",
  BUTTON_askMeLater: "Ask me later",
  BUTTON_yes: "Yes",
  BUTTON_no: "No",
  BUTTON_dismiss: "Dismiss",
  BUTTON_continue: "Continue",
  BUTTON_done: "Done",
  BUTTON_next: "Next",
  BUTTON_skip: "Skip",
  BUTTON_back: "Back",
  BUTTON_loading: "Loading...",
  BUTTON_tryAgain: "Try again",
  BUTTON_continueWithEmail: "Continue with email",
  BUTTON_continueWithGoogle: "Continue with Google",
  BUTTON_continueWithFacebook: "Continue with Facebook",
  BUTTON_loggingIn: "Logging in...",
  BUTTON_signingIn: "Signing in...",
  BUTTON_editProfile: "Edit details",
  BUTTON_shareVia: "Share via",
  BUTTON_shareInviteLink: "Share invite link",
  BUTTON_removeBookmark: "Remove bookmark",
  BUTTON_bookmark: "Bookmark",
  BUTTON_mute: "Mute Reminder",
  BUTTON_muteEvents: "Mute Reminder",
  BUTTON_unmute: "Unmute",
  BUTTON_unmuteEvents: "Unmute Reminder",
  BUTTON_unfollow: "Unfollow",
  BUTTON_turnOnLocation: "Turn on",

  ALERT_repeat: "Repeat",
  ALERT_duration: "Duration",
  ALERT_tooShort: "Too short",
  ALERT_until: "Until date",
  ALERT_cantRepeat: "Event should end in a future date",
  ALERT_invalidStart: "End date should be greater than start date",
  ALERT_durationTooShort: "Event should be at least five minutes long",
  ALERT_shortUntil: "Event should happen at least twice before final date",
  ALERT_whatIsASchedule: "What is a schedule?",
  ALERT_whatIsAScheduleA: "Like a timetable. Add events in here so people with similar interests can find them easily.",
  ALERT_privateSchedule: "Private schedule",
  ALERT_privateScheduleA: "Events created after setting schedule to 'Private' are not visible to everyone.",
  ALERT_privateScheduleWarn: "This schedule's future events will not be visible to the public.",
  ALERT_publicScheduleA: "Events created after setting schedule to 'Public' are visible to everyone.",
  ALERT_permissionLocationTitle: "Location Permission",
  ALERT_permissionLocationMessage: "Schdlr needs access to your location for better experience.",
  ALERT_deleteType: "Delete type?",
  ALERT_deleteImage: "Delete image?",
  ALERT_unfollow: name => `Unfollow ${name}?`,
  ALERT_unfollowMessage: 'Their events will no longer show up in your calendar.',
  ALERT_clearNotifications: 'Clear notifications?',
  ALERT_clearNotificationsMessage: 'Will clear all notifications.',

  SHARE_inviteAFriendTitle: "Invite via...",
  SHARE_SCHEDULE_inviteTitle: "Share invite link via...",
  SHARE_SCHEDULE_subject: "You have been invited to follow a schedule on Schdlr.",
  SHARE_SCHEDULE_message: name => `Hello, I'm inviting you to follow "${name}" to see their latest events, receive updates and reminders.\n`,
  SHARE_EVENT_inviteTitle: "Share event via...",
  SHARE_appMessage: `Hi! I'm inviting you to use Schdlr!\n\nWith Schdlr you can easily share events with communities, be it family, work or school.\n\nDownload Schdlr here:`,
  SHARE_appTitle: 'Invite a friend',
  SHARE_appSubject: "See events happening near you",

  TOAST_eventAdded: "Event posted",
  TOAST_enableReminder: "Unmute all events to continue!",
  TOAST_updatesAvailable: "Updates available. Refresh calendar",
  TOAST_locationError: "Failed to get location. Turn off airplane mode.",
  TOAST_noImageFound: "No image found",
  TOAST_removed: "Bookmark removed",
  TOAST_saved: "Event bookmarked",
  TOAST_fetchingUpdates: "Fetching updates...",
  TOAST_newNotifications: count => `${count} new notification${count > 1 ? 's' : ''}`,
  TOAST_justAmoment: "Applying theme... Just a moment",

  PROFILE_FORM_name: "Name",
  PROFILE_FORM_website: "Website",
  PROFILE_FORM_bio: "Bio",
  PROFILE_joined: date => `Joined ${date}`,

  EVENT_FORM_title: "Title",
  EVENT_FORM_description: "Description",
  EVENT_FORM_venue: "Venue",
  EVENT_FORM_category: "Type",
  EVENT_FORM_from: "From",
  EVENT_FORM_to: "To",
  EVENT_FORM_allDay: "All-day",
  EVENT_FORM_repetition: "Repetition",
  EVENT_FORM_public: "Public",
  EVENT_FORM_schedule: "Schedule",
  EVENT_FORM_repeat: "Repeat",
  EVENT_FORM_repeatForever: "Repeat forever",
  EVENT_FORM_repeatUntil: "Repeat until",
  EVENT_FORM_selectASchedule: "Select a schedule",
  EVENT_FORM_noSchedule: "No schedule",
  EVENT_FORM_addToASchedule: "Add to a schedule",

  EVENT_ITEM_allDay: "All day",

  SCHEDULE: "SCHEDULE",
  SCHEDULE_public: "Public schedule",
  SCHEDULE_private: "Private schedule",
  SCHEDULE_FORM_name: "Name",
  SCHEDULE_FORM_description: "Description",
  SCHEDULE_FORM_private: "Private",
  SCHEDULE_FORM_public: "Public",

  SCHEDULE_followerCount: "Follower",
  SCHEDULE_followerCounts: "Followers",
  SCHEDULE_eventsCount: "Event",
  SCHEDULE_eventsCounts: "Events",
  SCHEDULE_thisScheduleIsClosed: "This schedule is archived",
  SCHEDULE_createdOn: "Created on",
  SCHEDULE_by: "by",
  SCHEDULE_whatIsASchedule: "What is a schedule?",
  
  SCHEDULES_noUpcomingEvents: "No upcoming events",
  SCHEDULES_loadPastEvents: count => `Load (${count}) past event${count > 1 ? 's' : ''}`,
  SCHEDULES_noMoreEvents: "No more events",

  HELPER_TEXT_titleIsRequired: "Title is required",
  HELPER_TEXT_nameIsRequired: "Name is required",
  HELPER_TEXT_tooShort: "Too short",
  HELPER_TEXT_tooLong: "Too long",
  HELPER_TEXT_recommended: "Recommended",
  HELPER_TEXT_required: "Required",
  HELPER_TEXT_invalidDatesAndRecur: "Event's duration should be shorter than repeat frequency",
  HELPER_TEXT_description: "Too long",
  HELPER_TEXT_nameIsRequired: "Name is required",
  HELPER_TEXT_website: "Invalid string",
  HELPER_TEXT_location: "Your location helps us improve your experience with better search results.",

  MENU_edit: "Edit",
  MENU_close: "Close",
  MENU_open: "Open",
  MENU_delete: "Delete",

  RECUR_never: "One-time event",
  RECUR_daily: "Daily",
  RECUR_weekly: day => `Weekly (every ${day})`,
  RECUR_weekdays: "Weekdays (Mon - Fri)",
  RECUR_monthly: "Monthly (on the same day)",
  RECUR_yearly: date => `Yearly ( every ${date})`,

  STATUS_concluded: "Concluded",
  STATUS_ongoing: "Ongoing",
  STATUS_done: "Done",
  STATUS_cancelled: "Cancelled",
  STATUS_upcoming: "Upcoming",
  STATUS_closed: "Archived",

  ERROR_serverError: message => "Server Error" + (message ? ': ' + message : ''),
  ERROR_noConnection: "No connection",
  ERROR_404: "Not found",
  ERROR_404_caption: "Item may have been deleted",
  ERROR_offline: "You're offline!",
  ERROR_somethingWentWrong: "Something went wrong! Try Again",
  ERROR_failedToGetLocation: "Failed to access your location. Check your mobile network and GPS",
  ERROR_failedToRemoveImage: "Failed to delete image",
  ERROR_failedToUploadImage: "Failed to upload image",
  ERROR_failedToApplyTheme: "Failed to apply theme",
  ERROR_navigationError: "Navigation error",
  ERROR_failedToCreateEvent: title => `Failed to publish event: ${title}.`,
  ERROR_failedToCreateSchedule: name => `Failed to save schedule: ${name}.`,
  ERROR_failedToCreateComment: content => `Failed to deliver comment: ${content}.`,
  ERROR_failedToSendFiles: count => `Failed to send ${count} file${count > 1 ? 's' : ''}`,
  ERROR_failedToCreateBookmark: 'Failed to bookmark event.',
  ERROR_failedToCreateFollow: 'Failed to follow schedule.',
  ERROR_failedToDeleteEvent: 'Failed to delete event.',
  ERROR_failedToDeleteSchedule: 'Failed to delete schedule.',
  ERROR_failedToDeleteComment: 'Failed to delete comment.',
  ERROR_failedToDeleteBookmark: 'Failed to remove bookmark.',
  ERROR_failedToDeleteFollow: 'Failed to unfollow schedule.',
  ERROR_fatal: 'Fatal error occured.',
  ERROR_configHint: ' Sync now and try again.',

  PLACEHOLDER_aboutThisEvent: "About this event...",
  PLACEHOLDER_normal: "Normal",
  PLACEHOLDER_addYourWebsite: "Add your website",
  PLACEHOLDER_bio: "About me",
  PLACEHOLDER_venue: city => city ? `In ${city}` : "Venue",
  PLACEHOLDER_customType: "Add a custom type",
  PLACEHOLDER_searchCities: "Search cities",

  WARNING_dontMissOut: "Don't miss out!",
  WARNING_fileTooLarge: "File is too large",

  DIALOG_cancelEvent: "Cancel event?",
  DIALOG_onlyThisEvent: "Only this event?",
  DIALOG_allOfThisEvent: "All of this event",
  DIALOG_closeSchedule: "Archive this schedule?",
  DIALOG_closeScheduleWarning: "You won't be adding future events.",
  DIALOG_deleteComment: "Delete this comment?",
  DIALOG_deleteEvent: "Delete this event?",
  DIALOG_deleteEventWarning: "Always cancel events before deleting them to notify your followers.",
  DIALOG_deleteSchedule: "Delete this schedule?",
  DIALOG_deleteScheduleWarning: "Action will delete all related events!",
  DIALOG_openSchedule: "Unarchive this schedule?",

  SNACKBAR_sync: "Sync",
  SNACKBAR_seeUpdates: "See updates", 

  REQUEST_LOCATION_TITLE: 'Schdlr Location Permission',
  REQUEST_LOCATION_MESSAGE: "Schdlr App needs access to your location so events are easier to find.",

  PICKER_location: "Location",
  SYNC_message: "Will remove all deleted and expired events and fix missing events and schedules.",
  SYNC_complete: "Synchronized"
};