import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 80;
export const SEPARATOR_HEIGHT = 1;
export const AVATAR_SIZE = 50;
export const FOOTER_HEIGHT = 80;
export const PRIMARY = colors.primary;

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
    marginTop: 200,
    marginHorizontal: 20,
    height: '100%',
  },
  emptyTitle: {
    fontSize: 25,
    color: colors.light_gray_3,
    textAlign: 'center'
  },
  footer: {
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    color: colors.light_gray_3
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 1,
    borderRadius: 2,
    marginHorizontal: 4,
    marginVertical: 2
  },
  itemAvatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    marginRight: 8
  },
  itemName: {
    fontFamily: 'sans-serif-bold',
    fontSize: 16
  },
  offlineName: {
    fontFamily: 'sans-serif-bold',
    color: colors.gray,
  },
  itemContent: {
    paddingHorizontal: 4,
    marginHorizontal: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemBody: {
    width: 250,
    alignItems: 'flex-start'
  },
  danger: {
    color: colors.light_red,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paragraph: {
    textAlign: 'center'
  },
});