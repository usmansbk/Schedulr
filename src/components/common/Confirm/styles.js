import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 16 
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  header: {
    padding: 8
  },
  body: {
    padding: 8
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  message: {
    textAlign: 'center',
    fontSize: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24
  }
});