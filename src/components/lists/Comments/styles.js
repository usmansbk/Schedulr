import { StyleSheet } from 'react-native';

export const AVATAR_SIZE = 32;

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row'
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 250
  }
});
