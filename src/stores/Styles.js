import { computed } from 'mobx';
import { StyleSheet } from 'react-native';
import { dark, light } from 'config/colors';

export default class AppStyles {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @computed get moreList () {
    const colors = this.settings.dark ? dark : light;
    const SEPARATOR_HEIGHT = 1;
    const HEADER_HEIGHT = 100;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      header: {
        height: HEADER_HEIGHT,
        backgroundColor: colors.white,
        marginVertical: 8,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      footer: {
        backgroundColor: colors.white,
        marginVertical: 8,
      },
      item: {
        backgroundColor: colors.white,
      }
    });
  }

  @computed get styles () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 48,
        maxWidth: 48
      },
      iconButton: {
        marginRight: 0
      },
      badge: {
        color: colors.gray
      },
      header: {
        elevation: 0,
        backgroundColor: colors.bg,
      },
      elevatedHeader: {
        elevation: 4,
        backgroundColor: colors.bg,
      },
      headerColor: {
        color: colors.gray
      },
      bg: {
        backgroundColor: colors.bg
      }
    });    
  }
}