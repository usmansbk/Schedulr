import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 100;

export default StyleSheet.create({
  container: { flex: 1, margin: 16 },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    margin: 16
  },
  name: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  followers: {
    alignItems: 'center',
    margin: 16
  },
  followersCount: {
    fontSize: 16,
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
    color: colors.light_gray_3
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
    fontWeight: 'bold',
    marginVertical: 2
  },
  value: {
    fontSize: 16,
    fontFamily: 'sans-serif-bold',
    fontWeight: 'bold',
    color: colors.gray
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
  },
  menuText: {
    margin: 8,
    fontSize: 16
  },
  linkStyle: { color: '#2980b9' } 
});
