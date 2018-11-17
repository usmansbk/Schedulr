import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flex: 1
  },
  seperator: {
    height: 1,
    backgroundColor: '#dcdcdc'
  },
  left: {
    alignSelf: 'flex-start',
    paddingTop: 16
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  body: {
    alignSelf: 'flex-start'
  },
  main: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  refreshButton: {
    alignSelf: 'center'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    fontWeight: '100'
  },
  text: {
    color: '#404040',
    textAlign: 'center',
    fontSize: 14
  }
});

export default styles;