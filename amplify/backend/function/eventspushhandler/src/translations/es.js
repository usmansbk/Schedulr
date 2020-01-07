const { formatDate } = require('../utils');

module.exports = {
  EVENT_scheduled: (category, date) => {
    return `${category} estaba programado para el ${formatDate(date, 'es')}`.trim();
  },
  EVENT_rescheduled: (category, date) => {
    return `${category} fue reprogramado para el ${formatDate(date, 'es')}.`.trim();
  },
  EVENT_cancelled: (category) => {
    return `${category} fue cancelado.`.trim();
  }, 
  EVENT_cancelledDate: (category, date) => {
    return `${category ? category : 'evento'} cancelado programado para el ${formatDate(date, 'es')}.`;
  }, 
  EVENT_venueChanged: (category, venue) => {
    if (category) return  `el lugar del ${category} fue cambió a ${venue}.`;
    return `el lugar fue cambiado a ${venue}.`;
  }
};