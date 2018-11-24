import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 100;

export default StyleSheet.create({
  container: { flex: 1 },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: AVATAR_SIZE + 4,
    height: AVATAR_SIZE + 4,
    borderRadius: (AVATAR_SIZE + 4) / 2,
    borderWidth: 2,
    borderColor: colors.primary_light,
    backgroundColor: colors.primary_light,
    margin: 4
  }
});