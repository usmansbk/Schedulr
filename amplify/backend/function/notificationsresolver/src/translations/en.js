module.exports = {
  EVENT_cancelled: `annulé`,
  EVENT_scheduled: 'était prévu pour',
  EVENT_rescheduled:  'a été reprogrammé pour',
  EVENT_venueChanged:  'lieu changé pour',
  EVENT_renamed: 'a été renommé en',
  EVENT_newPhoto: count => {
    let message;
    if (count === 1) {
      message = `a ajouté une nouvelle photo à`;
    } else {
      message = `a ajouté ${count} nouvelles photos à`;
    }
    return message;
  },
  EVENT_cancelledDate: category => {
    return `${category} annulé prévu pour`;
  },
  EVENT_categoryChanged: 'changé en',
  EVENT_bookmarked: (count) => {
    const others = count - 1;
    let message = 'mis en signet';
    if (others > 0) {
      message = `et ${others} autres favoris`;
    }
    return message;
  },
  COMMENT_reply: (others) => {
    let message = 'répondu à votre commentaire';
    if (others > 0) {
      message = `et ${others} autres ont répondu à votre commentaire`;
    }
    return message;
  },
  COMMENT_new: (others) => {
    let message = `commenté sur`;
    if (others > 0) {
      message = `et ${others} autres personnes ont commenté`;
    }
    return message;
  },
  FOLLOW_new: (count) => {
    const others = count - 1;
    let message = `commencé à suivre`;
    if (others > 0) {
      message = `et ${others} autres ont commencé à suivre`;
    }
    return message;
  },
  SCHEDULE_renamed:  'a été renommé en',
  SCHEDULE_archived: 'archivé',
  SCHEDULE_unarchived: 'désarchivé',
};