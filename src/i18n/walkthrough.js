const en = [
  {
    key: 'p1',
    title: 'Create schedules easily!',
    text: 'Enter a schedule name and your schedule is ready to use and be shared.',
    image: require('../assets/list-app.png')
  },
  {
    key: 'p2',
    title: 'Add events to your schedules!',
    text: 'Organize your events by grouping them in specific schedules.',
    image: require('../assets/calendar.png')
  },
  {
    key: 'p3',
    title: 'Keep everyone Up-to-date!',
    text: 'Create schedules for events in your life and invite people to follow and share them.',
    image: require('../assets/handshake.png')
  },
  {
    key: 'p4',
    title: "Follow schedules of interest!",
    text: 'Follow schedules and get their events offline reminders and real-time updates.',
    image: require('../assets/app-user.png')
  },
  {
    key: 'p5',
    title: "Welcome to Schdlr!",
    text: 'Schdlr helps you to organize your events, by creating schedules to keep everyone up-to-date.',
    image: require('../assets/schoolbooks.png')
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