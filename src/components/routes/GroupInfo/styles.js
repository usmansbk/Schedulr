import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 100;

export default StyleSheet.create({
  container: { flex: 1, margin: 16 },
  header: {
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
    margin: 4
  },
  followers: {
    alignItems: 'center',
    margin: 16
  },
  followersCount: {
    fontSize: 16,
    fontFamily: 'sans-serif-bold',
    color: colors.gray
  },
  followersLabel: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: 'sans-serif-bold',
  },
  followButton: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    marginVertical: 2
  },
  value: {
    fontSize: 16,
    fontFamily: 'sans-serif-bold',
  },
  space: {
    marginVertical: 8
  },
  admin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminName: {
    marginLeft: 8,
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
    color: colors.gray
  }
});
