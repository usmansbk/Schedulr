import { StyleSheet } from 'react-native';

export const ITEM_HEIGHT = 86;
export const SEPERATOR_HEIGHT = 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
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
    fontWeight: 'bold',
    color: '#404040'
  },
  footer: {
    fontWeight: 'bold'
  },
  reaction: {
    fontSize: 16,
    color: '#757575'
  },
  red: {
    color: '#d32f2f'
  },
  space: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  spaceAround: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  textStyle: {
    fontWeight: '400',
    color: '#606060', 
    fontSize: 16
  }
});

export default styles;