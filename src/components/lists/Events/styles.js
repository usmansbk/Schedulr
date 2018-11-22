import { StyleSheet, PixelRatio } from 'react-native';
import colors from '../../../config/colors';

export const ITEM_HEIGHT = 150;
export const SEPERATOR_HEIGHT = 1 / PixelRatio.get();
export const SECTION_HEADER_HEIGHT = 64;

export default StyleSheet.create({
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
  sectionSubheading: {
    fontWeight: 'bold',
    color: colors.gray
  },
  header:{
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText:{
    fontSize: 24,
    color: colors.primary_dark,
  },
  footer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    color: colors.gray
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
    color: colors.gray,
    fontWeight: 'bold'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16
  },
  emptyIcon: {
    fontSize: 48,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
  }
});