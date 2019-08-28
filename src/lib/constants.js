import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;

export const ONE_TIME_EVENT = 'NEVER';
export const BULLET = '•';
export const CIRCLE = '●';

export const SINGLE_EVENT = 'SINGLE';
export const ALL_EVENTS = 'ALL';

export const SCHEDULE_CLOSED = 'CLOSED';
export const SCHEDULE_OPEN = 'OPEN';

export const COMMENTS_LIMIT = 15;
export const FOLLOWERS_LIMIT = 15;

export const SEARCH_PAGE_SIZE = 10;
export const SEARCH_DISTANCE = '150km';

// Operations
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

// list/events
export const events = {
  AVATAR_SIZE : 54,
  ITEM_HEIGHT : 122,
  ITEM_HEIGHT_SMALL : 102,
  SEPARATOR_HEIGHT : 1,
  SECTION_HEADER_HEIGHT : 64,
  SECTION_FOOTER_HEIGHT : 40,
  HEADER_HEIGHT : 32,
  FOOTER_HEIGHT : 80
};

// list/schedules
export const schedules = {
  ITEM_HEIGHT : 80,
  SEPARATOR_HEIGHT : 1,
  AVATAR_SIZE : 50,
  FOOTER_HEIGHT : 80,
};

// list/bookmarkedEvents
export const bookmarkedEvents = {
  AVATAR_SIZE : 54,
  ITEM_HEIGHT : 136,
  ITEM_HEIGHT_SMALL : 102,
  SEPARATOR_HEIGHT : 1,
  FOOTER_HEIGHT : 80,
}

// list/bookmarkedEvents
export const searchEvents = {
  AVATAR_SIZE : 54,
  ITEM_HEIGHT : 148,
  ITEM_HEIGHT_SMALL : 102,
  SEPARATOR_HEIGHT : 1,
  FOOTER_HEIGHT : 80,
}


// list/followers
export const followers_list = {
  SEPARATOR_HEIGHT : 1,
  ITEM_HEIGHT : 64,
  AVATAR_SIZE : 40,
  FOOTER_HEIGHT : 80,
}

// screen/scheduleInfo
export const schedule_info = {
  AVATAR_SIZE : 80
};

// list/notifications_list
export const notifications_list = {
  ITEM_HEIGHT: 80,
  SEPARATOR_HEIGHT: 1
};

// list/scheduleEvents
export const schedule_events = {
  AVATAR_SIZE : 54,
  ITEM_HEIGHT : 122,
  ITEM_HEIGHT_SMALL : 102,
  SEPARATOR_HEIGHT : 1,
  FOOTER_HEIGHT : 80,
};

// list/commentsList
export const comments_list = {
  AVATAR_SIZE : 32,
  SEPARATOR_HEIGHT : 4
};

// form/comment
export const comment_input = {
  AVATAR_SIZE : 32,
  INPUT_WIDTH : 278
};

export const event_search = {
  ITEM_HEIGHT : 148,
  SEPARATOR_HEIGHT : 1,
  AVATAR_SIZE : 48,
};

export const schedule_search = {
  ITEM_HEIGHT : 80,
  SEPARATOR_HEIGHT : 1,
  AVATAR_SIZE : 50,
  FOOTER_HEIGHT : 80,
};