export default {
  COMMENTS: 'Comments',
  COMMENTS_emptyList: "No comments",
  COMMENTS_loadMore: "Load more comments",
  COMMENTS_noMoreComments: "No more comments",

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

  PROFILE_boardEmptyList: "No schedule",
  PROFILE_followingLabel: "Following",
  PROFILE_createdLabel: "Created",
  PROFILE_notVisibleToPublic: "Events not visible to public",

  BOOKMARKS_emptyList: "You haven't saved any events yet",

  MORE_settings: "Settings",
  MORE_inviteAFriend: "Invite a friend",
  MORE_help: "Help",
  MORE_signOut: "Sign out",

  EXPLORE_emptyList: "Explore",
  EXPLORE_emptyListCaption: "Nearby, sponsored and suggested events",

  SEARCH_inputPlaceholder: "Search",
  SEARCH_schedulesTabLabel: "Schedules",
  SEARCH_eventsTabLabel: "Events",
  SEARCH_peopleTabLabel: "People",
  SEARCH_emptyList: "No results",
  SEARCH_loadMore: "Load more",
  SEARCH_noMoreResults: "No more results",

  NOTIFICATIONS_updatesTabLabel: "UPDATES",
  NOTIFICATIONS_messagesTabLabel: "MESSAGES",
  NOTIFICATIONS_emptyUpdatesList: "Stay tuned!",
  NOTIFICATIONS_emptyUpdatesListCaption: "Important updates and announcements will appear here",
  NOTIFICATIONS_emptyMessagesList: "No messages",
  NOTIFICATIONS_allCaughtUp: "You are all caught up!",

  SETTINGS_screenTitle: "Settings",
  SETTINGS_generalSectionTitle: "General",
  SETTINGS_sound: "Sound",
  SETTINGS_vibrate: "Vibrate",
  SETTINGS_darkTheme: "Dark theme",
  SETTINGS_location: "Location",
  SETTINGS_reminderSectionTitle: "Reminder",
  SETTINGS_reminderDisable: "Disable",
  SETTINGS_remindMe: "Remind me",
  SETTINGS_pushSectionTitle: "Push notification",
  SETTINGS_pushDisable: "Disable",

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
  HELP_contactUs: "Contact developer",
  HELP_contactUsSubtitle: "Questions? Need help",
  HELP_copyRight: "Copyright information",
  HELP_terms: "Terms and Privacy Policy",
  HELP_appVersion: "App version",

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
  BUTTON_mute: "Mute",
  BUTTON_muteEvents: "Mute events",
  BUTTON_unmute: "Unmute",
  BUTTON_unmuteEvents: "Unmute events",
  BUTTON_back: "Back",
  BUTTON_unfollow: "Unfollow",

  ALERT_repeat: "Repeat",
  ALERT_duration: "Duration",
  ALERT_tooShort: "Too short",
  ALERT_until: "Until date",
  ALERT_cantRepeat: "Event should end in a future date",
  ALERT_invalidStart: "End date should be greater than start date",
  ALERT_durationTooShort: "Event should be at least five minutes long",
  ALERT_shortUntil: "Event should happen at least twice before final date",
  ALERT_whatIsASchedule: "What is a schedule?",
  ALERT_whatIsAScheduleA: "A schedule is a group of related events. It helps people find their interested events.",
  ALERT_privateSchedule: "Private schedule",
  ALERT_privateScheduleA: "This schedule's events are not visible to the public.",
  ALERT_publicScheduleA: "This schedule's content, including its followers and event details, are visible to the public.",
  ALERT_permissionLocationTitle: "Location Permission",
  ALERT_permissionLocationMessage: "Schdlr needs access to your location for better experience.",
  ALERT_deleteType: "Delete type?",
  ALERT_deleteImage: "Delete image?",
  ALERT_unfollow: name => `Unfollow ${name}?`,
  ALERT_unfollowMessage: 'Their events will no long show up on your calendar.',

  SHARE_inviteAFriendTitle: "Invite via...",
  SHARE_SCHEDULE_inviteTitle: "Share invite link via...",
  SHARE_SCHEDULE_subject: "Follow schedule to get latest events",
  SHARE_SCHEDULE_message: name => `Follow "${name}" to see their latest events, receive updates and get reminders.\n`,
  SHARE_EVENT_inviteTitle: "Share event via...",

  TOAST_enableReminder: "Enable reminder!",
  TOAST_locationError: "Failed to get location. Turn off airplane mode.",
  TOAST_noImageFound: "No image found",
  TOAST_removed: "Removed",
  TOAST_saved: "Saved",

  PROFILE_FORM_name: "Name",
  PROFILE_FORM_website: "Website",
  PROFILE_FORM_location: "Location",
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
  SCHEDULE_thisScheduleIsClosed: "This schedule is closed",
  SCHEDULE_createdOn: "Created on",
  SCHEDULE_by: "by",
  SCHEDULE_whatIsASchedule: "What is a schedule?",
  
  SCHEDULES_noUpcomingEvents: "No upcoming events",
  SCHEDULES_loadPastEvents: count => `Load (${count}) past events`,
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
  STATUS_closed: "Closed",

  ERROR_noInternetConnection: "Check your internet connection. Pull to refresh",
  ERROR_somethingWentWrong: "Something went wrong. Please try again",
  ERROR_networkError: "Network error",
  ERROR_serverError: "Oop! My fault",
  ERROR_noConnection: "No connection",
  ERROR_404: "Not found",
  ERROR_404_caption: "Item may have been deleted",

  PLACEHOLDER_aboutThisEvent: "About this event...",
  PLACEHOLDER_normal: "Normal",
  PLACEHOLDER_addYourWebsite: "Add your website",

  WARNING_dontMissOut: "Don't miss out!",
  WARNING_fileTooLarge: "File is too large",

  DIALOG_cancelEvent: "Cancel event?",
  DIALOG_onlyThisEvent: "Only this event?",
  DIALOG_allOfThisEvent: "All of this event",
  DIALOG_closeSchedule: "Close schedule?",
  DIALOG_deleteComment: "Delete comment?",
  DIALOG_deleteEvent: "Delete event?",
  DIALOG_deleteSchedule: "Delete schedule?",
  DIALOG_openSchedule: "Open schedule?",
};