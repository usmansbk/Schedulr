import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const SEPARATOR_HEIGHT = 1;
export const ITEM_HEIGHT = 64;
export const AVATAR_SIZE = 48;
export const FOOTER_HEIGHT = 80;
export const primaryColor = colors.primary

export default StyleSheet.create({
  list: {
    // flex: 1,
    backgroundColor: colors.light_gray
  },
  contentContainer: {
    flexGrow: 1
  },
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  itemContainer: {
    backgroundColor: '#fff',
    height: ITEM_HEIGHT
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8
  },
  itemRight: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  itemText: {
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
    fontSize: 16,
    width: 250
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: FOOTER_HEIGHT
  },
  footerText: {
    color: colors.light_gray_3,
    fontWeight: 'bold',
    fontSize: 16
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
});
