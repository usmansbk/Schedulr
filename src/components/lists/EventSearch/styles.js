import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const primary = colors.primary;
export const ITEM_HEIGHT = 150;
export const SEPARATOR_HEIGHT = 1;

export default StyleSheet.create({
  list: {
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
    marginTop: 200,
    marginHorizontal: 20,
    height: '100%'
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    paddingTop: 8,
  },
  itemContent: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center'
  },
  itemBody: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  itemSubheadingText: {
    width: 200
  },
  itemHeadline: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    width: 350
  },
  itemNote: {
    fontSize: 16,
    color: colors.gray,
    width: 200
  },
  cancelled: {
    fontSize: 16,
    color: colors.light_red
  },
  time: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: colors.gray,
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  itemFooter: {
    flexDirection: 'row',
  },
  footerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32
  },
  iconBadge: {
    marginLeft: 4,
  }
});