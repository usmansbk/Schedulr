const en = [
  'Event',
  'Lecture',
  'Examination',
  'Test',
  'Task',
  'Meetup',
  'Hobby',
  'Studies',
  'Work',
  'Sport',
  'Meeting',
  'Festival',
  'Ceremony',
  'Competition',
  'Party',
  'Holiday',
];

const translations = {
  en
};

export default (lang) => {
  const translation = translations[lang];
  if (translation) return translation;
  return en;
};