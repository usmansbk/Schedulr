import { StyleSheet } from 'react-native';
import theme from '../../theme';

const backgroundColor = '#3f51b5';

const styles = StyleSheet.create({
  spacing: {
    paddingVertical: 8,
  },
  fab: {
    backgroundColor,
  },
  marginRight: {
    marginRight: 8,
  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 4
  },
  buttonText: {
    color: '#333'
  },
  item: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  itemText: {
    flexGrow: 1,
    height: 40,
    justifyContent:'center'
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: theme.red,
    marginVertical: 4,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#404040'
  },
  title: {
    color: theme.black,
    borderColor: theme.black
  }
});

export default styles;