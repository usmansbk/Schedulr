import { computed } from 'mobx';
import { StyleSheet } from 'react-native';
import { dark, light } from 'config/colors';
import {
  events,
  boards,
  starredEvents,
  followers_list,
  board_events,
  comments_list,
  comment_input,
  event_search,
  board_search
} from 'lib/constants';

export default class AppStyles {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @computed get userBoardsTab () {
    const colors = this.settings.dark ? dark : light;
    
    return StyleSheet.create({
      barStyle: {
        elevation: 4,
        backgroundColor: colors.bg,
        borderTopWidth: 0
      },
      indicatorStyle: {
        backgroundColor: colors.primary_light
      }
    });
  }

  @computed get topTab () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1
      },
      barStyle: {
        elevation: 4,
        backgroundColor: colors.bg,
      },
      indicatorStyle: {
        backgroundColor: colors.primary_light
      }
    });
  }

  @computed get bottomTab () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1
      },
      barStyle: {
        elevation: 0,
        backgroundColor: colors.bg,
      }
    });
  }

  @computed get tag() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      text: {
        fontFamily: 'sans-serif-bold',
        fontWeight: 'bold'
      },
      Cancelled: {
        color: colors.light_red,
      },
      Ongoing: {
        color: colors.green
      },
      Done: {
        color: colors.soft_blue,
      },
      Upcoming: {
        color: colors.yellow,
      },
      Closed: {
        color: colors.light_red,
        fontWeight: 'normal',
        fontSize: 12
      },
      Concluded: {
        color: colors.soft_blue,
      }
    });
  }

  @computed get customTypes () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        justifyContent: 'center'
      },
      content: {
        height: 48,
        justifyContent: 'center'
      },
      text: {
        color: colors.black
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    });    
  }

  @computed get picker () {
    const colors = this.settings.dark ? dark : light;
    const borderWidth = 1 * StyleSheet.hairlineWidth;
    
    return StyleSheet.create({
      button: {
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 8,
        marginTop: 8,
        borderWidth,
        borderRadius: 4,
        borderColor: colors.placeholder
      },
      container: {
        flex: 1,
      },
      content: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: colors.bg,
      },
      placeholder: {
        color: colors.black
      },
    });
  }

  @computed get datePicker () {
    const colors = this.settings.dark ? dark : light;
    const borderWidth = 1 * StyleSheet.hairlineWidth;

    return StyleSheet.create({
      date: {
        flexDirection: 'row',
      },
      button: {
        flexGrow: 1
      },
      text: {
        color: colors.primary,
        marginVertical: 8,
        fontWeight: 'bold'
      },
      dateButton: {
        flex: 1,
        borderWidth,
        borderColor: colors.placeholder,
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderRightWidth: 0,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      timeButton: {
        borderWidth,
        borderColor: colors.placeholder,
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      }
    });    
  }

  @computed get boardForm () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
        elevation: 0
      },
      form: {
        margin: 16
      },
      switchButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8
      },
      checkbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 4
      },
      text: {
        fontSize: 16,
        color: colors.placeholder,
        fontFamily: 'sans-serif-bold'
      },
      primary: {
        color: colors.primary
      },
      info: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 16
      }
    });
  }

  @computed get eventForm () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      form: {
        margin: 16
      },
      text: {
        color: colors.primary,
        marginVertical: 8,
      },
      input: {
        marginVertical: 8,
      },
      radio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
      },
      radioText: {
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 16
      },
      pickerSpacing: {
        marginVertical: 4
      },
      picker: {
        height: 48,
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.gray
      },
      pickerItem: {
        color: colors.black,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
        elevation: 0,
      },
      checkbox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      checkboxLabel: {
        color: colors.primary
      },
      checkboxItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    });    
  }

  @computed get loading () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg
      },
    });
  }

  @computed get error () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: colors.bg
      },
      headline: {
        textAlign: 'center',
      },
      content: {
        margin: 16
      }
    });
  }

  @computed get commentInput () {
    const colors = this.settings.dark ? dark : light;
    
    const {
      INPUT_WIDTH
    } = comment_input;

    return StyleSheet.create({
      container: {
        borderTopWidth: 1,
        borderColor: colors.light_gray_3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: colors.bg
      },
      placeholder: {
        color: colors.black
      },
      textInput: {
        color: colors.black
      },
      right: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4
      },
      avatar: {
        paddingRight: 4
      },
      input: {
        maxWidth: INPUT_WIDTH,
        minWidth: INPUT_WIDTH
      },
      alert: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light_gray,
        padding: 16
      },
      alertTitle: {
        width: 250
      },
      cancelText: {
        color: colors.primary,
        fontWeight: 'bold'
      },
      targetName: {
        fontWeight: 'bold'
      }
    });
  }

  @computed get eventDetails () {
    const colors = this.settings.dark ? dark : light;

    return  StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.bg
      },
      title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingVertical: 4
      },
      date: {
        color: colors.gray,
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 4
      },
      headNote: {
        flexDirection: 'row'
      },
      status: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
      },
      note: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
        fontWeight: 'bold'
      },
      head: {
        marginVertical: 8,
      },
      body: {
        marginVertical: 8
      },
      content: {
        marginHorizontal: 20,
        marginVertical: 4
      },
      label: {
        fontSize: 14,
        fontFamily: 'sans-serif-light',
        marginVertical: 2
      },
      value: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
        fontWeight: 'bold',
      },
      linkStyle: { color: '#2980b9' },
      item: {
        marginVertical: 12
      },
      nav: {
        color: colors.primary_light
      },
      red: {
        color: colors.light_red
      }
    });
  }

  @computed get boardInfo () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        paddingVertical: 8,
        backgroundColor: colors.bg
      },
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
        flexDirection: 'row',
        alignItems: 'center'
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
  }

  @computed get boardSearch () {
    const colors = this.settings.dark ? dark : light;
    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      AVATAR_SIZE,
      FOOTER_HEIGHT,
    } = board_search;

    return StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      separator: {
        height: SEPARATOR_HEIGHT
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      footer: {
        height: FOOTER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      itemContainer: {
        backgroundColor: colors.white,
      },
      itemContent: {
        height: ITEM_HEIGHT,
        paddingLeft: 8,
        paddingRight: 4,
        alignItems: 'center',
        flexDirection: 'row',
      },
      itemBody: {
        width: 250,
        alignItems: 'flex-start'
      },
      itemAvatar: {
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
        marginRight: 8
      },
      itemName: {
        fontFamily: 'sans-serif-bold',
        fontSize: 16
      },
      offlineName: {
        color: colors.gray,
        fontFamily: 'sans-serif-bold',
        fontSize: 16
      },
      danger: {
        color: colors.light_red,
        fontWeight: 'bold'
      },
      paragraph: {
        textAlign: 'center'
      },
      nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    });
  }

  @computed get eventSearch () {
    const colors = this.settings.dark ? dark : light;
    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      AVATAR_SIZE
    } = event_search;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      footer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      itemContainer: {
        height: ITEM_HEIGHT,
        backgroundColor: colors.white,
      },
      itemContent: {
        marginHorizontal: 8,
        flexDirection: 'row',
        flex: 1
      },
      itemHeadline: {
        fontSize: 20,
        fontFamily: 'sans-serif',
      },
      left: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
      },
      right: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8,
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red
      },
      time: {
        fontFamily: 'sans-serif-bold',
        fontSize: 14,
        color: colors.gray,
      },
      separator: {
        height: SEPARATOR_HEIGHT
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      footerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 32
      },
      iconBadge: {
        marginLeft: 4,
      },
      paragraph: {
        textAlign: 'center'
      },
      counts: {
        flexDirection: 'row'
      },
      boardName: {
        width: 150
      }
    });
  }

  @computed get notifications () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
      },
      emptyMessage: {
        textAlign: 'center',
        fontSize: 16
      },
      footer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
  }

  @computed get explore () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1
      },
      item: {
        width: '100%',
        height: 50,
        borderBottomColor: '#0002',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        justifyContent: 'center'
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
  }

  @computed get boardEvents () {
    const colors = this.settings.dark ? dark : light;
    const {
      AVATAR_SIZE,
      ITEM_HEIGHT,
      ITEM_HEIGHT_SMALL,
      SEPARATOR_HEIGHT,
      FOOTER_HEIGHT,
    } = board_events;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        flexGrow: 1
      },
      list: {
        backgroundColor: colors.light_gray,
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      offlineTitle: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.white,
      },
      itemContentSmall: {
        paddingTop: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemContent: {
        paddingTop: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemBody: {
        paddingTop: 4,
        marginLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
        width: 200
      },
      left: {
        paddingTop: 16
      },
      right: {
        justifyContent: 'space-between',
        flex: 1
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red
      },
      time: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        color: colors.gray
      },
      status: {
        color: colors.gray,
        fontFamily: 'sans-serif-bold'
      },
      duration: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
  }

  @computed get commentsList () {
    const colors = this.settings.dark ? dark : light;

    const { SEPARATOR_HEIGHT } = comments_list;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: colors.white,
      },
      linkStyle: { color: '#2980b9' },
      itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      itemLeft: {
        marginRight: 4,
        paddingTop: 10,
      },
      itemRight: {
        flex: 1,
        padding: 4,
        borderRadius: 2
      },
      authorName: {
        fontFamily: 'sans-serif-bold',
        color: colors.black,
        fontWeight: 'bold'
      },
      separator: {
        height: SEPARATOR_HEIGHT
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8
      },
      actions: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
      },
      replyBox: {
        backgroundColor: colors.light_gray,
        padding:4
      },
      replyName: {
        color: colors.gray,
        fontWeight: 'bold',
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      paragraph: {
        textAlign: 'center'
      },
    });    
  }

  @computed get followersList () {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      FOOTER_HEIGHT
    } = followers_list;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.white,
        height: ITEM_HEIGHT
      },
      itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8
      },
      itemRight: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
      },
      itemText: {
        fontFamily: 'sans-serif-bold',
        fontWeight: 'bold',
        fontSize: 16,
        width: 250
      },
      footer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: FOOTER_HEIGHT
      },
      footerText: {
        color: colors.primary_light,
        fontWeight: 'bold',
        fontSize: 16
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
    });
  }

  @computed get starredEventsList () {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      ITEM_HEIGHT_SMALL,
      SEPARATOR_HEIGHT,
    } = starredEvents;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        flexGrow: 1
      },
      list: {
        backgroundColor: colors.light_gray,
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      offlineTitle: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.white,
      },
      itemContentSmall: {
        paddingTop: 4,
        height: ITEM_HEIGHT_SMALL,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemContent: {
        paddingTop: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemBody: {
        paddingTop: 4,
        marginLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
        width: 200
      },
      left: {
        paddingTop: 16
      },
      right: {
        justifyContent: 'space-between',
        flex: 1
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red
      },
      time: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        color: colors.gray
      },
      status: {
        color: colors.gray,
        fontFamily: 'sans-serif-bold'
      },
      duration: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
  }

  @computed get boardsList () {
    const colors = this.settings.dark ? dark : light;
    const {
      AVATAR_SIZE,
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
    } = boards;

    return StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.light_gray
      },
      separator: {
        height: SEPARATOR_HEIGHT
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      itemContainer: {
        backgroundColor: colors.white,
      },
      itemContent: {
        height: ITEM_HEIGHT,
        paddingHorizontal: 8,
        alignItems: 'center',
        flexDirection: 'row',
      },
      itemBody: {
        width: 250,
        alignItems: 'flex-start'
      },
      itemAvatar: {
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
        marginRight: 8
      },
      itemName: {
        fontFamily: 'sans-serif-bold',
        fontSize: 16
      },
      offlineName: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      danger: {
        color: colors.light_red,
        fontWeight: 'bold'
      },
      nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
  }

  @computed get eventsList () {
    const colors = this.settings.dark ? dark : light;
    
    const {
      ITEM_HEIGHT,
      ITEM_HEIGHT_SMALL,
      SEPARATOR_HEIGHT,
      SECTION_HEADER_HEIGHT,
      SECTION_FOOTER_HEIGHT,
      HEADER_HEIGHT,
      FOOTER_HEIGHT
    } = events;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        flexGrow: 1
      },
      list: {
        backgroundColor: colors.light_gray,
      },
      sectionHeader: {
        backgroundColor: colors.light_gray_2,
        padding: 5,
        paddingLeft: 16,
        elevation: 2,
        height: SECTION_HEADER_HEIGHT
      },
      sectionHeading: {
        fontSize: 24,
        color: colors.primary_light
      },
      sectionSubheadingContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      sectionSubheading: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray
      },
      sectionFooter: {
        height: SECTION_FOOTER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
      },
      header:{
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
      },
      headerText:{
        color: colors.primary_light,
      },
      footerContainer: { height: FOOTER_HEIGHT },
      footerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      footerText: {
        fontWeight: 'bold',
        color: colors.gray
      },
      offlineTitle: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.white,
      },
      itemContentSmall: {
        paddingTop: 4,
        height: ITEM_HEIGHT_SMALL,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemContent: {
        paddingTop: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        paddingHorizontal: 8,
      },
      itemBody: {
        paddingTop: 4,
        marginLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
        width: 200
      },
      left: {
        paddingTop: 16
      },
      right: {
        justifyContent: 'space-between',
        flex: 1
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red
      },
      time: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        color: colors.gray
      },
      status: {
        color: colors.gray,
        fontFamily: 'sans-serif-bold'
      },
      duration: {
        fontFamily: 'sans-serif-bold',
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row'
      },
      paragraph: {
        textAlign: 'center'
      },
    });
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
        marginBottom: 8,
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