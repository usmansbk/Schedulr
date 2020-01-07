const { formatDate } = require('../i18n');

module.exports = {
  EVENT_scheduled: (category, date) => {
    return  `${category} était prévu pour ${formatDate(date, 'fr')}.`.trim();
  },
  EVENT_rescheduled: (category, date) => {
    return `${category} a été reprogrammé pour ${formatDate(date, 'fr')}.`.trim();
  },
  EVENT_cancelled: (category) => {
    return `${category} a été annulé.`.trim();
  }, 
  EVENT_cancelledDate: (category, date) => {
    return `${category ? category : 'événement'} annulée prévue pour ${formatDate(date, 'fr')}.`;
  }, 
  EVENT_venueChanged: (category, venue) => {
    if (category) {
      return `lieu de ${category} a été changé pour ${venue}`;
    }
    return `le lieu a été changé pour ${venue}`;
  }
};