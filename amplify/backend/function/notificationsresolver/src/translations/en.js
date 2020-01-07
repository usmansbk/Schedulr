module.exports = {
  EVENT_cancelled: `cancelled`,
  EVENT_scheduled: 'was scheduled for',
  EVENT_rescheduled:  'was rescheduled for',
  EVENT_venueChanged:  'venue changed to',
  EVENT_renamed: 'was renamed as',
  EVENT_newPhoto: count => {
    let message;
    if (count === 1) {
      message = `added a new photo to`;
    } else {
      message = `added ${count} new photos to`;
    }
    return message;
  },
  EVENT_cancelledDate: category => {
    return `cancelled ${category} scheduled for`;
  },
  EVENT_categoryChanged: 'changed to',
  EVENT_bookmarked: (count) => {
    const others = count - 1;
    let message = 'bookmarked';
    if (others > 0) {
      message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
    }
    return message;
  },
  COMMENT_reply: (others) => {
    let message = 'replied to your comment on';
    if (others > 0) {
      message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
    }
    return message;
  },
  COMMENT_new: (others) => {
    let message = 'commented on';
    if (others > 0) {
      message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
    }
    return message;
  },
  FOLLOW_new: (count) => {
    const others = count - 1;
    let message = 'started following';
    if (others > 0) {
      message = `and ${others} other${others > 1 ? 's' : ''} ${message}`;
    }
    return message;
  },
  SCHEDULE_renamed:  'was renamed as',
  SCHEDULE_archived: 'archived',
  SCHEDULE_unarchived: 'unarchived',
};