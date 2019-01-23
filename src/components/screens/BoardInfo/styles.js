import { StyleSheet } from 'react-native';
import colors from '../../../config/colors';

export const AVATAR_SIZE = 80;

export default StyleSheet.create({
  container: { flex: 1, paddingVertical: 8 },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    margin: 8,
    fontSize: 16
  },
  linkStyle: { color: '#2980b9' },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  userAvatar: {
    alignSelf: 'flex-start',
    marginVertical: 8
  },
  right: {
    marginLeft: 8,
    width: 250
  },
  name: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  count: {
    color: colors.light_gray_3,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 16
  },
  middot: {
    color: colors.light_gray_3,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 16
  },
  countRow: {
    flexDirection: 'row'
  },
  body: {
    flex: 2,
    padding: 16,
    backgroundColor: colors.light_gray_2
  },
  note: {
    textAlign: 'left',
    fontSize: 16,
    color: colors.gray,
    marginHorizontal: 4,
  },
  noteView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4
  },
  description: {
    fontSize: 18,
    fontFamily: 'sans-serif-bold',
    marginVertical: 8
  },
  byLine: {
    fontFamily: 'sans-serif-light',
    marginHorizontal: 4
  },
  admin: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  adminName: {
    fontFamily: 'sans-serif-bold',
    marginHorizontal: 4
  },
  date: {
    marginTop: 8,
  }
});
