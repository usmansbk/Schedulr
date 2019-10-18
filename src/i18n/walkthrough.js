import { StyleSheet, PixelRatio } from 'react-native';
import colors from 'config/colors';

const ratio =PixelRatio.get();
const color = ratio > 1 ? colors.light_gray : colors.gray;

const textStyles = StyleSheet.create({
  text: {
    color
  }
});

const en = [
  {
    key: 'p1',
    title: 'Schdlr',
    text: 'Schdlr is a social event scheduler',
    image: require('../assets/student.png'),
    backgroundColor: '#22bcb5',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
  },
  {
    key: 'p2',
    title: 'Create schedules easily!',
    text: 'Enter a schedule name and your schedule is ready to use and be shared.',
    image: require('../assets/list-app.png'),
    backgroundColor: '#63a4ff',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
  },
  {
    key: 'p3',
    title: 'Add events to your schedules!',
    text: 'Organize your events by grouping them in specific schedules.',
    image: require('../assets/calendar.png'),
    backgroundColor: '#00897b',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
  },
  {
    key: 'p4',
    title: 'Keep everyone Up-to-date!',
    text: 'Create schedules for events in your life and invite people to follow and share them.',
    image: require('../assets/handshake.png'),
    backgroundColor: '#ab47bc',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
  },
  {
    key: 'p5',
    title: "Follow schedules of interest!",
    text: 'Follow schedules and get their events offline reminders and real-time updates.',
    image: require('../assets/app-user.png'),
    backgroundColor: '#673ab7',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
  },
  {
    key: 'p6',
    title: "Welcome to Schdlr!",
    text: 'Schdlr helps you to organize your events, by creating schedules to keep everyone up-to-date.',
    image: require('../assets/schoolbooks.png'),
    backgroundColor: '#22bcb5',
    textStyle: textStyles.text,
    titleStyle: textStyles.text
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