import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 48,
    maxWidth: 48
  },
  iconButton: {
    marginRight: 0
  },
  badge: {
    color: colors.gray
  },
  header: {
    elevation: 0,
    backgroundColor: colors.bg,
  },
  elevatedHeader: {
    elevation: 4,
    backgroundColor: colors.bg,
  },
  headerColor: {
    color: colors.gray
  },
});
