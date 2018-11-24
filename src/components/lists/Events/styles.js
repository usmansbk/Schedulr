import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 150;
export const SEPARATOR_HEIGHT = 2;
export const SECTION_HEADER_HEIGHT = 64;
export const HEADER_HEIGHT = 28;
export const primary_light = colors.primary;
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
    color: colors.primary
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
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    color: gray
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 27,
    color: gray,
    fontWeight: 'bold'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16
  },
  emptyIcon: {
    fontSize: 48,
  },
  separator: {
    height: SEPARATOR_HEIGHT
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  itemContent: {
    flexGrow: 1,
    paddingTop: 4,
    paddingLeft: 8,
    justifyContent: 'space-between',
  },
  itemBody: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSubheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemSubheadingText: {
    width: 200
  },
  itemHeadline: {
    fontSize: 18,
    fontFamily: 'sans-serif-bold',
    width: 200
  },
  itemNote: {
    fontWeight: 'bold',
    fontSize: 16,
    color: gray
  },
  avatar: { paddingTop: 8 },
  cancelled: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.light_red
  },
  startTime: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16
  },
  endTime: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16,
    color: gray,
  }
});