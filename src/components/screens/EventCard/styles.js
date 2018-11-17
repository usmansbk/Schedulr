import { StyleSheet, PixelRatio } from 'react-native';
import theme from '../../theme';

const black = theme.black;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: theme.gray
  },
  icon: {
    color: '#fff',
    fontSize: 24
  },
  title: {
    color: black,
    marginBottom: 4
  },
  gray: {
    color: '#808080'
  },
  badges: {flexDirection: 'row', marginVertical: 4 },
  textColor: {
    color: black
  },
  description: {
    color: black,
    marginVertical: 4,
    fontFamily: 'sans-serif-light'
  },
  text: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 6,
    marginVertical: 14
  },
  nav: {
    color: theme.bgLight,
  },
  error: {
    color: theme.bgLight
  }
});

export default styles;