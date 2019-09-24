const en = [
  {
    key: 'k1',
    title: 'Create schedules easily!',
    text: 'Enter a name, upload a picture and your schedule is ready to use and be shared.',
    image: {
      uri: ''
    },
  },
  {
    key: 'k2',
    title: 'Add events to your schedules!',
    text: 'Organize your related events in each one of your schedules',
    image: {
      uri: ''
    },
  },
  {
    key: 'k3',
    title: 'Keep everyone Up-to-date!',
    text: 'Create schedules for events in your life and invite people to follow and share them.',
    image: {
      uri: ''
    },
  },
  {
    key: 'k4',
    title: "Don't want to create a schedule?!",
    text: 'You can find and follow schedules of your interest and get their events reminders.',
    image: {
      uri: ''
    },
  },
  {
    key: 'k5',
    title: "Welcome to Schdlr!",
    text: 'Schdlr helps you to organize your events, by creating schedules to keep everyone up-to-date',
    image: {
      uri: ''
    },
  },
];

const translations = {
  en
};

export default (lang) => {
  const translation = translations[lang];
  if (translation) return translation;
  return en;
};