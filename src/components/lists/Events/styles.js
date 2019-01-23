import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 48;
export const ITEM_HEIGHT = 154;
export const SEPARATOR_HEIGHT = 2;
export const SECTION_HEADER_HEIGHT = 64;
export const HEADER_HEIGHT = 28;
export const FOOTER_HEIGHT = 80;
export const primary_light = colors.primary_light;
export const primary = colors.primary;
export const gray = colors.gray;
export const black = colors.black;

export default StyleSheet.create({
  list: {
    backgroundColor: colors.light_gray
  },
  sectionHeader: {
    backgroundColor: colors.light_gray_2,
    padding: 5,
    paddingLeft: 16,
    height: SECTION_HEADER_HEIGHT
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary_light
  },
  sectionSubheadingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionSubheading: {
    fontWeight: 'bold',
    color: gray
  },
  header:{
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText:{
    fontSize: 24,
    color: colors.primary_dark,
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
    fontSize: 22,
    fontFamily: 'sans-serif-bold',
    color: gray
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
  separator: {
    height: SEPARATOR_HEIGHT
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    paddingTop: 4,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  itemBody: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  itemSubheadingText: {
    width: 200
  },
  itemHeadline: {
    fontSize: 22,
    fontFamily: 'sans-serif-bold',
    width: 200
  },
  itemNote: {
    fontSize: 16,
    color: gray,
    width: 200
  },
  left: {
    paddingTop: 4
  },
  right: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  body: {
    flexGrow: 1,
    marginLeft: 8,
  },
  cancelled: {
    fontSize: 16,
    color: colors.light_red
  },
  time: {
    fontFamily: 'sans-serif-bold',
    alignSelf: 'flex-end',
    fontSize: 16,
    color: gray,
  },
  status: {
    color: colors.light_gray_3,
    fontWeight: 'bold'
  },
  duration: {
    fontWeight: 'bold',
    color: colors.light_gray_3,
  },
  red: {
    fontFamily: 'sans-serif-bold',
    color: colors.light_red,
    fontWeight: 'bold'
  },
  started: {
    fontFamily: 'sans-serif-bold',
    color: colors.green,
    fontWeight: 'bold'
  },
  ended: {
    fontFamily: 'sans-serif-bold',
    color: colors.soft_blue,
    fontWeight: 'bold'
  },
  pending: {
    fontFamily: 'sans-serif-bold',
    color: colors.yellow,
    fontWeight: 'bold'
  },
  
});