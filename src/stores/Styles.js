import { computed } from 'mobx';
import { StyleSheet } from 'react-native';
import { dark, light } from 'config/colors';
import {
  events,
  schedules,
  searchEvents,
  bookmarkedEvents,
  people_list,
  schedule_events,
  comments_list,
  event_search,
  more_list,
  schedule_search,
  WIDTH,
  BANNER,
  dp
} from 'lib/constants';

export default class AppStyles {
  constructor(settingsStore) {
    this.settings = settingsStore;
  }

  @computed get media() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      view: {
        // marginVertical: 8,
        borderWidth: 1,
        borderColor: colors.light_gray,
        justifyContent: 'center',
      },
      image: {
        height: 200
      },
      caption: {
        paddingHorizontal: 4
      },
      docName: {
        fontSize: 14,
        margin: 0,
        padding: 0
      },
      docContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        backgroundColor: colors.light_gray,
      },
      docBody: {
        flex: 1,
        paddingVertical: 4,
      },
      mediaIcon: {
        width: 40,
        height: 40
      }
    });
  }

  @computed get fileSelect () {
    const colors = this.settings.dark ? dark : light;
    const ITEM_HEIGHT = 60;

    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bg,
      },
      container: {
        marginHorizontal: 4,
        height: ITEM_HEIGHT,
      },
      itemContainer: {
        width: ITEM_HEIGHT,
        marginHorizontal: 2,
        marginVertical: 4,
        backgroundColor: colors.light_gray_2,
      },
      itemContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    });
  }

  @computed get chipList() {
    const colors = this.settings.dark ? dark : light;
    
    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg,
        height: dp(36),
      },
      itemContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.light_gray,
        borderWidth: 1,
        borderColor: colors.light_gray_3,
        margin: 4,
        paddingHorizontal: 12,
        borderRadius: dp(16)
      },
      selected : {
        backgroundColor: colors.primary_light,
        borderColor: colors.light_gray,
      },
      itemText: {
        textAlign: 'center',
        color: colors.gray
      },
      selectedText: {
        color: colors.white
      }
    });
  }

  @computed get locationInput() {
    const colors = this.settings.dark ? dark : light;
    
    return StyleSheet.create({
      inputContainer: {
        marginBottom: 12
      },
      input: {
        borderColor: colors.placeholder,
        borderRadius: 4,
        borderWidth: 1 * StyleSheet.hairlineWidth,
        padding: 4,
        height: dp(48),
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 8
      }
    });
  }

  @computed get login() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: colors.bg
      },
      content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32
      },
      h1: {
        fontSize: 27,
        color: colors.black,
        textAlign: 'center'
      },
      caption: {
        textAlign: 'center',
        color: colors.gray
      }
    });
  }

  @computed get userSchedulesTab () {
    const colors = this.settings.dark ? dark : light;
    
    return StyleSheet.create({
      barStyle: {
        elevation: 0,
        backgroundColor: colors.bg,
        borderTopWidth: 0
      },
      indicatorStyle: {
        backgroundColor: colors.primary
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
        elevation: 0,
        backgroundColor: colors.bg,
      },
      indicatorStyle: {
        backgroundColor: colors.primary
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
      cancelled: {
        color: colors.light_red,
      },
      ongoing: {
        color: colors.green
      },
      done: {
        color: colors.tint,
      },
      upcoming: {
        color: colors.yellow,
      },
      closed: {
        color: colors.light_red,
        fontSize: 12
      },
      concluded: {
        color: colors.tint,
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
        height: dp(48),
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

  @computed get places() {
    const colors = this.settings.dark ? dark : light;
    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg
      },
      textInputContainer: {
        backgroundColor: colors.light_gray_2,
        height: dp(54)
      },
      textInput: {
        backgroundColor: colors.textInput,
        color: colors.black,
      },
      itemText: {
        color: colors.black
      },
      poweredText: {
        color: colors.gray
      }
    });
  }

  @computed get picker () {
    const colors = this.settings.dark ? dark : light;
    const borderWidth = 1 * StyleSheet.hairlineWidth;
    
    return StyleSheet.create({
      contentContainer: {
        padding: 16,
        backgroundColor: colors.bg,
      },
      textInputContainer: {
        flexDirection: 'row'
      },
      textInput: {
        flex: 1
      },
      button: {
        height: dp(48),
        justifyContent: 'center',
        paddingHorizontal: 8,
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
        height: dp(48),
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderRightWidth: 0,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      timeButton: {
        borderWidth,
        borderColor: colors.placeholder,
        height: dp(48),
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      }
    });    
  }

  @computed get scheduleForm () {
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
        fontWeight: 'bold',
        color: colors.primary,
      },
      textInput: {
        backgroundColor: colors.bg
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
      textInput: {
        backgroundColor: colors.bg
      },
      input: {
        marginVertical: 8,
      },
      radio: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16
      },
      radioText: {
        fontWeight: 'bold',
        color: colors.primary,
        marginRight: 16,
        marginVertical: 8
      },
      firstPicker: {
        marginTop: 0
      },
      pickerSpacing: {
        marginVertical: 8
      },
      picker: {
        height: dp(48),
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.bg
      },
      pickerItem: {
        color: colors.black,
        backgroundColor: colors.bg
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
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center'
      },
      content: {
        margin: 16
      }
    });
  }

  @computed get commentInput () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        borderTopWidth: 1,
        borderColor: colors.light_gray_3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: colors.bg,
        maxWidth: WIDTH,
        minWidth: WIDTH,
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
      },
      avatar: {
        paddingRight: 4
      },
      input: {
        flex: 1
      },
      alert: {
        maxWidth: WIDTH,
        minWidth: WIDTH,
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
        color: colors.primary
      },
      red: {
        color: colors.light_red
      }
    });
  }

  @computed get scheduleInfo () {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        paddingVertical: 8,
        backgroundColor: colors.bg
      },
      menuButton: {
        width: dp(48),
        height: dp(48),
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

  @computed get scheduleSearch () {
    const colors = this.settings.dark ? dark : light;
    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      AVATAR_SIZE,
      FOOTER_HEIGHT,
    } = schedule_search;

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
        height: dp(80),
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
      scheduleName: {
        width: 150
      }
    });
  }

  @computed get notifications () {
    const colors = this.settings.dark ? dark : light;
    const SIZE = 10;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.light_gray,
        // paddingVertical: 8,
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
        height: dp(80),
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3
      },
      paragraph: {
        textAlign: 'center'
      },
      itemContainer: {
        backgroundColor: colors.white,
        maxWidth: WIDTH,
        minWidth: WIDTH,
      },
      unseen: {
        backgroundColor: colors.light_gray_4
      },
      itemContent: {
        height: dp(80),
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
      },
      messageItemContent: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
      },
      itemBody: {
        marginLeft: 8,
        flex: 1
      },
      boldText: {
        fontWeight: 'bold',
        color: colors.black
      },
      dateLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      icon: {
        marginRight: 8
      },
      indicator: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.bg,
        color: '#fff',
        position: 'absolute',
        top: 0,
        right: 0
      },
      avatar: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
      },
      message: {
        paddingHorizontal: 4,
        backgroundColor: colors.light_gray
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      divider: {
        height: 2,
        backgroundColor: colors.white
      },
      counter: {
        margin: 8,
        right: 18
      }
    });
  }

  @computed get discover () {
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
        height: dp(50),
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

  @computed get scheduleEvents () {
    const colors = this.settings.dark ? dark : light;
    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
    } = schedule_events;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        marginTop: 1,
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
        margin: 1,
        paddingHorizontal: 8,
        backgroundColor: colors.bg
      },
      itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: colors.bg,
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
        marginTop: 4
      },
      actions: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
      },
      replyBox: {
        backgroundColor: colors.light_gray,
        flexDirection: 'row',
        justifyContent: 'center',
        padding:4
      },
      replyContent: {
        flex: 1,
        justifyContent: 'center',
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

  @computed get peopleList () {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      FOOTER_HEIGHT
    } = people_list;

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
        // alignItems: 'center',
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
        color: colors.primary,
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

  @computed get bookmarkedEventsList () {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      ITEM_HEIGHT_SMALL,
      SEPARATOR_HEIGHT,
    } = bookmarkedEvents;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        // marginTop: 1,
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
      unavailableItemContent: {
        paddingTop: 4,
        height: dp(40),
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between'
      },
      itemBody: {
        paddingTop: 4,
        marginLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
        fontFamily: 'sans-serif-bold',
        textAlignVertical: 'center'
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
        width: 200
      },
      left: {
        paddingTop: 16
      },
      uleft: {
        justifyContent: 'center',
        backgroundColor: 'red',
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

  @computed get carousel() {
    const colors = this.settings.dark ? dark : light;
    return StyleSheet.create({
      container: {
        width: dp(300),
        height: dp(250),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        elevation: 4,
        backgroundColor: colors.bg
      },
      image: {
        width: '100%',
        height: 250
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.gray
      }
    });
  }

  @computed get searchEventsList () {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      ITEM_HEIGHT_SMALL,
      SEPARATOR_HEIGHT,
    } = searchEvents;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.light_gray,
        marginTop: 1,
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

  @computed get schedulesList () {
    const colors = this.settings.dark ? dark : light;
    const {
      AVATAR_SIZE,
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
    } = schedules;

    return StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: colors.light_gray
      },
      contentContainer: {
        flexGrow: 1,
        // marginTop: 1,
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
      header: {
        height: BANNER + 4,
        justifyContent: 'center',
        alignItems: 'center'
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
        justifyContent: 'center',
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
      muteIcon: {
        marginRight: 4
      },
      privateIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: dp(17),
        right: dp(17),
      },
      authorAvatar: {
        position: 'absolute',
        bottom: dp(8),
        left: dp(36)
      }
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
        // marginTop: 1,
        flexGrow: 1
      },
      list: {
        backgroundColor: colors.light_gray,
      },
      sectionHeader: {
        backgroundColor: colors.light_gray,
        padding: 5,
        paddingLeft: 16,
        height: SECTION_HEADER_HEIGHT
      },
      sectionHeading: {
        fontSize: 24,
        color: colors.primary
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
        alignItems: 'center',
        backgroundColor: colors.white,
      },
      header:{
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      },
      headerText:{
        color: colors.primary,
        fontWeight: 'bold'
      },
      loadPrevHeaderContainer: {
        height: dp(32)
      },
      footerContainer: {
        height: FOOTER_HEIGHT
      },
      footerContent: {
        flex: 1,
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
        fontSize: 18,
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
      privateIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: 17,
        right: 17,
      },
      muteIcon: {
        marginRight: 4
      },
    });
  }

  @computed get moreList () {
    const colors = this.settings.dark ? dark : light;
    const {
      SEPARATOR_HEIGHT,
      HEADER_HEIGHT
    } = more_list;

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

  @computed get actionsheet () {
    const colors = this.settings.dark ? dark : light;

    const hairlineWidth = StyleSheet.hairlineWidth;

    return StyleSheet.create({
      overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.4,
        backgroundColor: '#000'
      },
      wrapper: {
        flex: 1,
        flexDirection: 'row'
      },
      body: {
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: colors.actionsheet
      },
      titleBox: {
        height: dp(40),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg
      },
      titleText: {
        color: colors.actionsheetTitleText,
        fontSize: 14
      },
      messageBox: {
        height: dp(30),
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg
      },
      messageText: {
        color: '#9a9a9a',
        fontSize: 12
      },
      buttonBox: {
        height: dp(50),
        marginTop: hairlineWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg
      },
      buttonText: {
        fontSize: 18
      },
      cancelButtonBox: {
        height: dp(50),
        marginTop: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg
      }
    })
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
      header: {
        elevation: 0,
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

  @computed get profile() {
    
    const colors = this.settings.dark ? dark : light;

    const AVATAR_HEIGHT = 120;
    const HEADER_HEIGHT = 220;

    return StyleSheet.create({
      container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white
      },
      header: {
        width: '100%',
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#303030'
      },
      avatar: {
        width: AVATAR_HEIGHT,
        height: AVATAR_HEIGHT,
      },
      image: {
        width: AVATAR_HEIGHT,
        height: AVATAR_HEIGHT,
        borderRadius: AVATAR_HEIGHT / 2,
        borderWidth: 4,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      },
      backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: HEADER_HEIGHT,
        top: 0,
        left: 0,
        opacity: 0.5
      },
      headline: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-bold',
        textAlign: 'center',
        color: 'white',
        paddingBottom: 10
      },
      count: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 8,
        marginBottom: 4 
      },
      label: {
        color: colors.black,
        fontSize: 16,
      },
      linkLabel: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16,
      },
      countRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16
      },
      link: {
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      linkStyle: {
        color: colors.link,
      },
      linkIcon: {
        paddingRight: 8
      }
    })
  }
}