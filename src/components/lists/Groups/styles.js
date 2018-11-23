import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 80;
export const SEPARATOR_HEIGHT = 1;
export const AVATAR_SIZE = 64;
export const FOOTER_HEIGHT = 80;

export default StyleSheet.create({
  list: {
    backgroundColor: colors.light_gray
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
    paddingTop: 48,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 27,
    color: colors.gray,
    fontWeight: 'bold'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16
  },
  emptyIcon: {
    fontSize: 20,
  },
  footer: {
    height: FOOTER_HEIGHT
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
  },
  itemAvatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    marginRight: 8
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18
  },
  itemContent: {
    marginTop: 4,
    paddingHorizontal: 4,
    marginHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,

  },
  danger: {
    color: colors.light_red
  }
});