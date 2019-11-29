

const en = [
  {
    key: 'p1',
    title: 'Schdlr',
    text: 'Schdlr is a social event scheduler',
    image: require('../assets/student.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 'p2',
    title: 'Create schedules easily!',
    text: 'Enter a schedule name and your schedule is ready to be used and shared.',
    image: require('../assets/list-app.png'),
    backgroundColor: '#63a4ff',
  },
  {
    key: 'p3',
    title: 'Add events to your schedules!',
    text: 'Organize your events by grouping them in specific schedules.',
    image: require('../assets/calendar.png'),
    backgroundColor: '#00897b',
  },
  {
    key: 'p4',
    title: 'Keep everyone Up-to-date!',
    text: 'Create schedules for events in your life and invite people to follow and share them.',
    image: require('../assets/handshake.png'),
    backgroundColor: '#ab47bc',
  },
  {
    key: 'p5',
    title: "Follow schedules of interest!",
    text: 'Follow schedules and get their events offline reminders and real-time updates.',
    image: require('../assets/app-user.png'),
    backgroundColor: '#673ab7',
  },
  {
    key: 'p6',
    title: "Welcome to Schdlr!",
    text: 'Schdlr helps you to organize your events, by creating schedules to keep everyone up-to-date.',
    image: require('../assets/schoolbooks.png'),
    backgroundColor: '#22bcb5',
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