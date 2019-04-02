import { StyleSheet } from 'react-native';
import colors from 'config/colors';

export const AVATAR_SIZE = 54;
export const ITEM_HEIGHT = 122;
export const ITEM_HEIGHT_SMALL = 102;
export const SEPARATOR_HEIGHT = 1;
export const SECTION_HEADER_HEIGHT = 64;
export const SECTION_FOOTER_HEIGHT = 20;
export const HEADER_HEIGHT = 28;
export const FOOTER_HEIGHT = 80;
export const primary_light = colors.primary_light;
export const primary = colors.primary;
export const primary_dark = colors.primary_dark;
export const gray = colors.gray;
export const black = colors.black;

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.light_gray,
    flexGrow: 1
  },
  list: {
    backgroundColor: colors.light_gray,
  },
  sectionHeader: {
    backgroundColor: colors.light_gray_2,
    padding: 5,
    paddingLeft: 16,
    elevation: 2,
    height: SECTION_HEADER_HEIGHT
  },
  sectionHeading: {
    fontSize: 24,
    color: primary_light
  },
  sectionSubheadingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionSubheading: {
    fontFamily: 'sans-serif-bold',
    color: gray
  },
  sectionFooter: {
    height: SECTION_FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText:{
    fontSize: 24,
    color: primary_light,
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
  offlineTitle: {
    fontSize: 20,
    fontFamily: 'sans-serif-bold',
    color: gray,
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
  separator: {
    height: SEPARATOR_HEIGHT,
  },
  itemContainer: {
    backgroundColor: colors.white,
  },
  itemContentSmall: {
    paddingTop: 4,
    height: ITEM_HEIGHT_SMALL,
    flexDirection: 'row',
    paddingHorizontal: 8,
    // backgroundColor: 'green',
  },
  itemContent: {
    paddingTop: 4,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
    // backgroundColor: 'green',
  },
  itemBody: {
    paddingTop: 4,
    marginLeft: 8,
    flex: 1,
    // backgroundColor: 'red',
  },
  itemHeadline: {
    fontSize: 20,
    fontFamily: 'sans-serif-bold',
  },
  itemNote: {
    fontSize: 16,
    color: gray,
    width: 200
  },
  left: {
    paddingTop: 16
  },
  right: {
    justifyContent: 'space-between',
    flex: 1
  },
  cancelled: {
    fontSize: 16,
    color: colors.light_red
  },
  time: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: gray
  },
  status: {
    color: gray,
    fontFamily: 'sans-serif-bold'
  },
  duration: {
    fontFamily: 'sans-serif-bold',
    color: gray,
  },
  durationRow: {
    flexDirection: 'row'
  },
  paragraph: {
    textAlign: 'center'
  },
});