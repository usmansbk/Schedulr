import { StyleSheet } from 'react-native';
import theme from '../theme';

export const bgLight = theme.bgLight;
export const black = theme.black;

export const ITEM_HEIGHT = 162;
export const SEPERATOR_HEIGHT = 1;
export const SECTION_HEADER_HEIGHT = 64;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  sectionHeader: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    paddingLeft: 16,
    height: SECTION_HEADER_HEIGHT
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: bgLight
  },
  headerSubtitle: {
    color: '#888888'
  },
  left: {
    marginRight: 4,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  body: {
    marginLeft: 4,
    paddingBottom: 0
  },
  bold: {
    color: '#404040'
  },
  footer: {
    fontWeight: 'bold'
  },
  note: {
    fontSize: 14,
    color: '#757575'
  },
  space: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  spaceAround: {
    marginLeft: 0,
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  textStyle: {
    color: '#545454', 
    fontSize: 16
  },
  description: {
    color: '#404040', 
    fontSize: 16
  },
  listFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  footerText: {
    color: '#989898'
  },
  seperator: {
    height: SEPERATOR_HEIGHT
  },  
  item_container: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: ITEM_HEIGHT
  },
  item_content: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    color: black,
  },
  time: {
    alignSelf: 'flex-end'
  },
  stated: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: bgLight
  },
  item_body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  item_space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blue: {
    color: bgLight,
  },
  danger: {
    color: theme.red
  }
});

export default styles;