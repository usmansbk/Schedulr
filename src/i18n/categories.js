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
  'Festivity',
  'Ceremony',
  'Competition',
  'Party',
  'Holiday',
  'Hackathon'
];

const translations = {
  en
};

export default (lang) => {
  const translation = translations[lang];
  if (translation) return translation;
  return en;
};