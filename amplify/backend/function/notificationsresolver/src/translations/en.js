const { formatDate } = require('../utils');

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
  EVENT_categoryChanged: 'changed to'
};