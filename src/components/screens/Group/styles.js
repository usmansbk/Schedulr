import { StyleSheet } from 'react-native';
import theme from '../../theme';

const color = '#404040';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    color: '#fff',
    fontSize: 24
  },
  icon: {
    color: theme.black,
    fontSize: 24
  },
  authorText: {
    fontWeight: 'bold',
    paddingLeft: 12,
    color
  },
  bold: {
    fontWeight: '400',
    color: '#808080'
  },
  title: {
    fontWeight: 'bold',
    color
  },
  about: {
    color: theme.bgLight,
    marginBottom: 4,
    fontWeight: '400'
  },
  more: {
    color: '#fff',
  }
});

export default styles;