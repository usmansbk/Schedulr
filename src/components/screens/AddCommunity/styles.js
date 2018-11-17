import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centered: {
    width: 300,
    justifyContent: 'space-between'
  },
  textInput: {
    textDecorationLine: 'none',
    flexGrow: 1,
  },
  margin: {
    marginVertical: 16
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#404040',
    textAlign: 'center'
  },
})