import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const primary = colors.primary;
export const ITEM_HEIGHT = 148;
export const SEPARATOR_HEIGHT = 1;
export const AVATAR_SIZE = 48;

export default StyleSheet.create({
  list: {
    // flex: 1,
    backgroundColor: colors.light_gray
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: colors.light_gray
  },
  footer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    color: colors.light_gray_3
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: colors.white,
  },
  itemContent: {
    marginHorizontal: 8,
    flexDirection: 'row',
    flex: 1
  },
  itemHeadline: {
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  cancelled: {
    fontSize: 16,
    color: colors.light_red
  },
  time: {
    fontFamily: 'sans-serif-bold',
    fontSize: 14,
    color: colors.gray,
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32
  },
  iconBadge: {
    marginLeft: 4,
  },
  paragraph: {
    textAlign: 'center'
  },
  counts: {
    flexDirection: 'row'
  },
  boardName: {
    width: 150
  }
});