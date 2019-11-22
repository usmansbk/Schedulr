const en = [
  'Event',
  'Lecture',
  'Examination',
  'Test',
  'Meetup',
  'Studies',
  'Work',
  'Sport',
  'Meeting',
  'Festivity',
  'Competition',
  'Hackathon'
];

const en_blacklist = [
  'Test',
  'Lecture',
  'Studies',
  'Examination',
  'Event',
  'Meeting'
];

const blacklist = {
  en: en_blacklist
};

const translations = {
  en
};

export const getBlacklist = (lang) => {
  const bl = blacklist[lang];
  if (bl) return bl;
  return en_blacklist;
};

export default (lang) => {
  const translation = translations[lang];
  if (translation) return translation;
  return en;
};