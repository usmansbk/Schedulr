const { formatDate } = require('../i18n');

module.exports = {
  EVENT_scheduled: (category, date) => {
    return  `${category} scheduled for ${formatDate(date, 'fr')}.`.trim();
  },
  EVENT_rescheduled: (category, date) => {
    return `${category} was rescheduled for ${formatDate(date, 'fr')}.`.trim();
  },
  EVENT_cancelled: (category) => {
    return `${category} was cancelled.`.trim();
  }, 
  EVENT_cancelledDate: (category, date) => {
    return `cancelled ${category ? category : 'event'} scheduled for ${formatDate(date, 'fr')}.`;
  }, 
  EVENT_venueChanged: (category, venue) => {
    return `${category} venue changed to ${venue}.`.trim();
  }
};