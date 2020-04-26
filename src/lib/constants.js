import { Dimensions, PixelRatio } from 'react-native';

/**
 * Make sure every component is scaled to
 * to match the font when user changes the
 * device font size
 * @param { number } val 
 */
export const dp = (val) => {
  const fontScale = PixelRatio.getFontScale();
  return val * fontScale;
};

export const ALL_FILTER = '';

export const WIDTH = Dimensions.get('window').width;
export const MEDIUM_RECTANGLE = 260;
export const BANNER = 50;

export const ONE_TIME_EVENT = 'NEVER';
export const BULLET = '•';
export const CIRCLE = '●';

export const SINGLE_EVENT = 'SINGLE';
export const ALL_EVENTS = 'ALL';

export const SCHEDULE_CLOSED = 'CLOSED';
export const SCHEDULE_OPEN = 'OPEN';

export const PAGINATION_LIMIT = 20;
export const SEARCH_LIMIT = 50;

// Operations
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

// GraphQL types
export const EVENT_TYPE = 'Event';
export const SCHEDULE_TYPE = 'Schedule';
export const BOOKMARK_TYPE = 'Bookmark';
export const COMMENT_TYPE = 'Comment';
export const FOLLOW_TYPE = 'Follow';
export const USER_TYPE = 'User';

//list/album
export const album = {
  ITEM_WIDTH:  dp(175)
};

//list/chips
export const chips = {
  ITEM_HEIGHT: dp(48)
}

// list/events
export const events = {
  AVATAR_SIZE : dp(54),
  ITEM_HEIGHT : dp(100),
  ITEM_HEIGHT_SMALL : dp(100),
  SEPARATOR_HEIGHT : dp(1),
  SECTION_HEADER_HEIGHT : dp(70),
  SECTION_FOOTER_HEIGHT : dp(40),
  HEADER_HEIGHT : dp(32),
  FOOTER_HEIGHT : dp(80)
};

// list/schedules
export const schedules = {
  ITEM_HEIGHT : dp(80),
  SEPARATOR_HEIGHT : dp(1),
  AVATAR_SIZE : dp(50),
  FOOTER_HEIGHT : dp(80),
  SUB_AVATAR_SIZE: dp(22)
};

export const discover = {
  ITEM_HEIGHT: dp(250),
  SEPARATOR_HEIGHT: dp(1),
  OFFSET: dp(80)
};

// list/bookmarkedEvents
export const bookmarkedEvents = {
  AVATAR_SIZE : dp(54),
  ITEM_HEIGHT : dp(136),
  ITEM_HEIGHT_SMALL : dp(102),
  SEPARATOR_HEIGHT : dp(1),
  FOOTER_HEIGHT : dp(80),
};

// list/bookmarkedEvents
export const searchEvents = {
  AVATAR_SIZE : dp(54),
  ITEM_HEIGHT : dp(148),
  ITEM_HEIGHT_SMALL : dp(102),
  SEPARATOR_HEIGHT : dp(1),
  FOOTER_HEIGHT : dp(80),
};


// list/followers
export const people_list = {
  SEPARATOR_HEIGHT : dp(1),
  ITEM_HEIGHT : dp(64),
  AVATAR_SIZE : dp(40),
  FOOTER_HEIGHT : dp(80),
};

// screen/scheduleInfo
export const schedule_info = {
  AVATAR_SIZE : dp(64)
};

// list/notifications_list
export const notifications_list = {
  ITEM_HEIGHT: dp(80),
  SEPARATOR_HEIGHT: dp(1), 
  AVATAR_SIZE: dp(32)
};

// list/scheduleEvents
export const schedule_events = {
  AVATAR_SIZE : dp(54),
  ITEM_HEIGHT : dp(122),
  ITEM_HEIGHT_SMALL : dp(102),
  SEPARATOR_HEIGHT : dp(1),
  FOOTER_HEIGHT : dp(80),
};

// list/commentsList
export const comments_list = {
  AVATAR_SIZE : dp(32),
  SEPARATOR_HEIGHT : dp(2)
};

// form/comment
export const comment_input = {
  AVATAR_SIZE : dp(32),
  INPUT_WIDTH : dp(278)
};

export const event_search = {
  ITEM_HEIGHT : dp(148),
  SEPARATOR_HEIGHT : dp(1),
  AVATAR_SIZE : dp(48),
};

export const schedule_search = {
  ITEM_HEIGHT : dp(80),
  SEPARATOR_HEIGHT : dp(1),
  AVATAR_SIZE : dp(50),
  FOOTER_HEIGHT : dp(80),
};

export const badge = {
  HEIGHT: dp(10),
  WIDTH: dp(10),
  BORDER_RADIUS: dp(5)
};

export const banner = {
  HEIGHT: dp(100)
};

export const countdown = {
  SIZE: dp(20)
};