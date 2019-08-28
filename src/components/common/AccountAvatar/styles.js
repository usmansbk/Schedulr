import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8
  },
  name: {
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
    maxWidth: 250,
  }
});