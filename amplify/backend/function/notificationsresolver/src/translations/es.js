module.exports = { 
  EVENT_cancelled: `cancelado`,
  EVENT_scheduled: 'estaba programado para el',
  EVENT_rescheduled:  'fue reprogramado para el',
  EVENT_venueChanged:  'el lugar cambió a',
  EVENT_renamed: 'fue renombrado como',
  EVENT_newPhoto: count => {
    let message;
    if (count === 1) {
      message = `agregó una nueva foto a`;
    } else {
      message = `agregó ${count} fotos nuevas a`;
    }
    return message;
  },
  EVENT_cancelledDate: category => {
    return `${category} cancelado programado para`;
  },
  EVENT_categoryChanged: 'cambiado a',
  EVENT_bookmarked: (count) => {
    const others = count - 1;
    let message = 'marcada';
    if (others > 0) {
      message = `y ${others} personas más marcadas`;
    }
    return message;
  },
  COMMENT_reply: (others) => {
    let message = `respondió a tu comentario en`;
    if (others > 0) {
      message = `y ${others} personas más respondieron a su comentario en`;
    }
    return message;
  },
  COMMENT_new: (others) => {
    let message = 'comentado';
    if (others > 0) {
      message = `y ${others} personas más comentaron`;
    }
    return message;
  },
  FOLLOW_new: (count) => {
    const others = count - 1;
    let message = `comenzó a seguir`;
    if (others > 0) {
      message = `y ${others} más comenzaron a seguir`;
    }
    return message;
  },
  SCHEDULE_renamed:  'fue renombrado como',
  SCHEDULE_archived: 'archivada',
  SCHEDULE_unarchived: 'sin archivar',
};