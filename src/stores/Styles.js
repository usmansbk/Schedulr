import {computed} from 'mobx';
import {StyleSheet} from 'react-native';
import {dark, light} from 'config/colors';
import {
  events,
  schedules,
  searchEvents,
  bookmarkedEvents,
  people_list,
  schedule_events,
  comments_list,
  more_list,
  schedule_search,
  WIDTH,
  BANNER,
  dp,
} from 'lib/constants';

export default class styles {
  constructor(settings) {
    this.settings = settings;
  }

  @computed get sheet() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: colors.bg,
      },
      content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingTop: 8,
      },
      header: {
        padding: 8,
        paddingBottom: 16,
      },
      body: {
        padding: 8,
      },
      title: {
        fontSize: 25,
        fontFamily: 'Bold',
      },
      message: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    });
  }

  @computed get media() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      view: {
        paddingTop: 8,
        borderWidth: 1,
        borderColor: colors.light_gray,
        justifyContent: 'center',
      },
      image: {
        height: 200,
      },
      caption: {
        paddingHorizontal: 4,
      },
      docName: {
        fontSize: 14,
        margin: 0,
        padding: 0,
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
        height: 40,
      },
    });
  }

  @computed get fileSelect() {
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
      },
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
        margin: 4,
        paddingHorizontal: 12,
        borderRadius: dp(16),
      },
      selected: {
        backgroundColor: colors.primary_light,
        borderColor: colors.light_gray,
      },
      itemText: {
        textAlign: 'center',
        color: colors.gray,
      },
      selectedText: {
        color: colors.white,
      },
    });
  }

  @computed get locationInput() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      inputContainer: {
        marginBottom: 12,
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
        marginRight: 8,
      },
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
        backgroundColor: colors.bg,
      },
      content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32,
      },
      h1: {
        fontSize: 27,
        color: colors.black,
        textAlign: 'center',
      },
      caption: {
        textAlign: 'center',
        color: colors.gray,
      },
    });
  }

  @computed get userSchedulesTab() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      barStyle: {
        elevation: 0,
        backgroundColor: colors.bg,
        borderTopWidth: 0,
      },
      indicatorStyle: {
        backgroundColor: colors.primary,
      },
    });
  }

  @computed get topTab() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
      },
      barStyle: {
        elevation: 0,
        backgroundColor: colors.bg,
      },
      indicatorStyle: {
        backgroundColor: colors.primary,
      },
    });
  }

  @computed get bottomTab() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
      },
      barStyle: {
        elevation: 0,
        backgroundColor: colors.bg,
        borderTopColor: 'transparent',
      },
    });
  }

  @computed get tag() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      text: {
        fontFamily: 'Bold',
      },
      cancelled: {
        color: colors.light_red,
      },
      ongoing: {
        color: colors.green,
      },
      done: {
        color: colors.tint,
      },
      upcoming: {
        color: colors.yellow,
      },
      closed: {
        color: colors.light_red,
        fontSize: 12,
      },
      concluded: {
        color: colors.tint,
      },
    });
  }

  @computed get customTypes() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        justifyContent: 'center',
      },
      content: {
        height: dp(48),
        justifyContent: 'center',
      },
      text: {
        color: colors.black,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
  }

  @computed get places() {
    const colors = this.settings.dark ? dark : light;
    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg,
      },
      textInputContainer: {
        backgroundColor: colors.light_gray_2,
        height: dp(54),
      },
      textInput: {
        backgroundColor: colors.textInput,
        color: colors.black,
      },
      itemText: {
        color: colors.black,
      },
      itemContainer: {
        paddingHorizontal: 10,
      },
      poweredText: {
        color: colors.gray,
      },
    });
  }

  @computed get picker() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      contentContainer: {
        padding: 16,
        backgroundColor: colors.bg,
      },
      textInputContainer: {
        flexDirection: 'row',
      },
      textInput: {
        flex: 1,
      },
      text: {
        fontFamily: 'SemiBold',
      },
      button: {
        height: dp(48),
        justifyContent: 'center',
        borderColor: colors.placeholder,
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
        color: colors.black,
      },
    });
  }

  @computed get datePicker() {
    const colors = this.settings.dark ? dark : light;
    const borderWidth = 1 * StyleSheet.hairlineWidth;

    return StyleSheet.create({
      date: {
        flexDirection: 'row',
      },
      button: {
        flexGrow: 1,
      },
      text: {
        color: colors.primary,
        fontFamily: 'Bold',
      },
      pickerButton: {
        fontFamily: 'SemiBold',
      },
      dateButton: {
        flex: 1,
        height: dp(48),
        justifyContent: 'center',
      },
      timeButton: {
        borderColor: colors.placeholder,
        height: dp(48),
        justifyContent: 'center',
      },
    });
  }

  @computed get scheduleForm() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
        elevation: 0,
      },
      form: {
        padding: 16,
        marginBottom: 10,
      },
      switchButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
      },
      checkbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 4,
      },
      text: {
        fontSize: 12,
      },
      textInput: {
        backgroundColor: colors.textInput,
      },
      primary: {
        color: colors.primary,
      },
      info: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 16,
      },
      field: {
        marginVertical: 12,
      },
      horizontalSpacing: {
        paddingHorizontal: 8,
      },
      tightVerticalSpacing: {
        marginVertical: 4,
      },
    });
  }

  @computed get textInput() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        marginVertical: 10,
      },
      input: {
        backgroundColor: colors.bg,
        padding: 8,
        margin: 0,
        fontSize: 18,
        color: colors.black,
      },
      label: {
        fontSize: 12,
        marginLeft: 8,
        color: colors.black,
      },
    });
  }

  @computed get eventForm() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      form: {
        padding: 16,
        marginBottom: 10,
      },
      text: {
        color: colors.primary,
        marginVertical: 8,
      },
      textInput: {
        backgroundColor: colors.textInput,
        fontFamily: 'sans-serif-medium',
      },
      input: {
        marginVertical: 8,
      },
      radio: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      radioText: {
        fontSize: 12,
        marginRight: 16,
      },
      pickerSpacing: {
        marginVertical: 10,
      },
      picker: {
        height: dp(48),
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: colors.bg,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
        elevation: 0,
      },
      baseHorizontalSpacing: {
        paddingHorizontal: 8,
      },
      iconRow: {
        flexDirection: 'row',
      },
      icon: {
        marginTop: 12,
      },
      rowBody: {
        flex: 1,
        marginLeft: 16,
      },
    });
  }

  @computed get loading() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
      },
    });
  }

  @computed get error() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: colors.bg,
      },
      headline: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      content: {
        margin: 16,
      },
    });
  }

  @computed get commentInput() {
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
        color: colors.black,
      },
      textInput: {
        color: colors.black,
      },
      right: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        paddingRight: 4,
      },
      input: {
        flex: 1,
      },
      alert: {
        maxWidth: WIDTH,
        minWidth: WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.light_gray,
        padding: 16,
      },
      alertTitle: {
        width: 250,
      },
      cancelText: {
        color: colors.primary,
        fontFamily: 'Bold',
      },
      targetName: {
        fontFamily: 'Bold',
      },
    });
  }

  @computed get eventDetails() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.bg,
      },
      title: {
        fontFamily: 'Bold',
        fontSize: 30,
        paddingVertical: 4,
      },
      date: {
        color: colors.gray,
        fontFamily: 'Bold',
        fontSize: 16,
        paddingBottom: 4,
      },
      headNote: {
        flexDirection: 'row',
      },
      status: {
        fontFamily: 'Light',
        fontSize: 18,
      },
      note: {
        color: colors.gray,
        fontFamily: 'Bold',
      },
      head: {
        marginVertical: 8,
      },
      body: {
        marginVertical: 8,
      },
      content: {
        marginHorizontal: 20,
        marginVertical: 4,
      },
      label: {
        fontSize: 13,
        marginVertical: 2,
      },
      value: {
        fontSize: 18,
        fontFamily: 'Bold',
      },
      linkStyle: {color: '#2980b9'},
      item: {
        marginVertical: 12,
      },
      nav: {
        // color: colors.primary
      },
      red: {
        color: colors.light_red,
      },
    });
  }

  @computed get scheduleInfo() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.bg,
        paddingBottom: 12,
        paddingHorizontal: 12,
      },
      linkStyle: {color: '#2980b9'},
      avatar: {
        padding: 10,
      },
      head: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      name: {
        fontSize: 27,
        textAlign: 'center',
        fontFamily: 'Bold',
      },
      label: {
        color: colors.black,
        fontSize: 16,
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      count: {
        color: colors.black,
        fontFamily: 'Bold',
        fontSize: 25,
      },
      countRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.light_gray,
        padding: 16,
        borderRadius: 8,
      },
      body: {
        flex: 2,
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
        marginVertical: 8,
      },
      description: {
        fontSize: 18,
        fontFamily: 'Bold',
        marginVertical: 8,
      },
    });
  }

  @computed get scheduleSearch() {
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
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.bg,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      footer: {
        height: FOOTER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        paddingHorizontal: 8,
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
        alignItems: 'flex-start',
        marginLeft: 8,
      },
      itemAvatar: {
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
        marginRight: 8,
      },
      itemName: {
        fontFamily: 'Bold',
        fontSize: 16,
      },
      offlineName: {
        color: colors.gray,
        fontFamily: 'Bold',
        fontSize: 16,
      },
      danger: {
        color: colors.light_red,
        fontFamily: 'Bold',
      },
      paragraph: {
        textAlign: 'center',
      },
      nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rightIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: dp(17),
        right: dp(17),
      },
    });
  }

  @computed get notifications() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.bg,
        padding: 16,
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
        fontSize: 16,
      },
      footer: {
        height: dp(80),
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3,
      },
      paragraph: {
        textAlign: 'center',
      },
      itemContainer: {
        marginVertical: 8,
      },
      unseen: {
        backgroundColor: colors.light_gray_4,
      },
      itemContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      messageItemContent: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
      },
      itemBody: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: colors.light_gray,
        marginLeft: 8,
        flex: 1,
      },
      boldText: {
        fontFamily: 'Bold',
        color: colors.black,
      },
      dateLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 8,
      },
      indicator: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.bg,
        color: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
      },
      avatar: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
      },
      message: {
        paddingHorizontal: 4,
        backgroundColor: colors.light_gray,
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      divider: {
        height: 2,
        backgroundColor: colors.bg,
      },
      counter: {
        margin: 8,
        right: 18,
      },
    });
  }

  @computed get discover() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
      },
      item: {
        width: '100%',
        height: dp(50),
        borderBottomColor: '#0002',
        borderBottomWidth: 0.5,
        paddingHorizontal: 20,
        justifyContent: 'center',
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      paragraph: {
        textAlign: 'center',
      },
    });
  }

  @computed get scheduleEvents() {
    const colors = this.settings.dark ? dark : light;
    const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = schedule_events;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg,
        flexGrow: 1,
      },
      list: {
        backgroundColor: colors.bg,
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      offlineTitle: {
        fontSize: 20,
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
      },
      itemContent: {
        paddingTop: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
      },
      itemBody: {
        paddingTop: 4,
        paddingLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
      },
      left: {
        padding: 8,
        paddingTop: 16,
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red,
      },
      time: {
        fontSize: 14,
        color: colors.gray,
      },
      status: {
        color: colors.gray,
      },
      duration: {
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row',
      },
      paragraph: {
        textAlign: 'center',
      },
    });
  }

  @computed get commentsList() {
    const colors = this.settings.dark ? dark : light;

    const {SEPARATOR_HEIGHT} = comments_list;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        margin: 1,
        backgroundColor: colors.bg,
      },
      itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.bg,
        padding: 8,
      },
      itemLeft: {
        padding: 8,
        alignSelf: 'flex-start',
      },
      itemContent: {
        padding: 4,
        flex: 1,
      },
      item: {
        padding: 16,
        borderTopRightRadius: 12,
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        backgroundColor: colors.light_gray,
      },
      message: {
        alignSelf: 'flex-start',
      },
      to: {
        marginBottom: 8,
        borderTopLeftRadius: 12,
        backgroundColor: colors.light_gray_2,
      },
      attachment: {
        paddingTop: 8,
      },
      withAttachment: {
        borderBottomStartRadius: 0,
      },
      linkStyle: {color: '#2980b9'},
      authorName: {
        fontFamily: 'Bold',
        color: colors.black,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: dp(48),
      },
      actions: {
        flexDirection: 'row',
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      paragraph: {
        textAlign: 'center',
      },
    });
  }

  @computed get peopleList() {
    const colors = this.settings.dark ? dark : light;

    const {ITEM_HEIGHT, SEPARATOR_HEIGHT, FOOTER_HEIGHT} = people_list;

    return StyleSheet.create({
      list: {
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.bg,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        height: ITEM_HEIGHT,
      },
      itemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      },
      itemRight: {
        justifyContent: 'center',
        marginLeft: 16,
      },
      itemText: {
        fontFamily: 'Bold',
        fontSize: 16,
        width: 250,
      },
      footer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: FOOTER_HEIGHT,
      },
      footerText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
    });
  }

  @computed get bookmarkedEventsList() {
    const colors = this.settings.dark ? dark : light;

    const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = bookmarkedEvents;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg,
        flexGrow: 1,
      },
      list: {
        backgroundColor: colors.bg,
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      offlineTitle: {
        fontSize: 20,
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
      },
      itemContent: {
        height: ITEM_HEIGHT,
        flexDirection: 'row',
      },
      unavailableItemContent: {
        paddingTop: 4,
        height: dp(40),
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
      },
      itemBody: {
        paddingLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
        textAlignVertical: 'center',
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
      },
      left: {
        padding: 8,
        paddingTop: 12,
        alignItems: 'center',
      },
      right: {
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 4,
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red,
      },
      time: {
        fontSize: 14,
        color: colors.gray,
      },
      status: {
        color: colors.gray,
      },
      duration: {
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row',
      },
      paragraph: {
        textAlign: 'center',
      },
    });
  }

  @computed get carousel() {
    const colors = this.settings.dark ? dark : light;
    return StyleSheet.create({
      container: {
        width: dp(200),
        height: dp(150),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        elevation: 2,
        borderRadius: 8,
        backgroundColor: colors.light_gray,
      },
      image: {
        width: '94%',
        height: 148,
      },
      text: {
        fontSize: 20,
        color: colors.gray,
      },
    });
  }

  @computed get searchEventsList() {
    const colors = this.settings.dark ? dark : light;

    const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = searchEvents;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg,
        marginTop: 1,
        flexGrow: 1,
      },
      list: {
        backgroundColor: colors.bg,
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      offlineTitle: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        paddingHorizontal: 12,
      },
      itemContent: {
        paddingVertical: 4,
        height: ITEM_HEIGHT,
        flexDirection: 'row',
      },
      itemBody: {
        paddingTop: 4,
        marginLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 20,
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
      },
      left: {
        paddingTop: 16,
        marginRight: 8,
      },
      right: {
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: 16,
        padding: 8,
        backgroundColor: colors.light_gray,
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red,
      },
      time: {
        fontSize: 14,
        color: colors.gray,
      },
      status: {
        color: colors.gray,
      },
      duration: {
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row',
      },
      paragraph: {
        textAlign: 'center',
      },
    });
  }

  @computed get schedulesList() {
    const colors = this.settings.dark ? dark : light;
    const {ITEM_HEIGHT, SEPARATOR_HEIGHT} = schedules;

    return StyleSheet.create({
      list: {
        flex: 1,
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.bg,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      header: {
        height: BANNER + 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footer: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontWeight: 'bold',
        color: colors.light_gray_3,
      },
      itemContainer: {
        backgroundColor: colors.bg,
        paddingHorizontal: 16,
      },
      itemContent: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
      },
      itemBody: {
        width: 250,
        alignItems: 'flex-start',
        paddingLeft: 8,
      },
      itemAvatar: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      itemName: {
        fontFamily: 'Bold',
        fontSize: 16,
      },
      offlineName: {
        fontFamily: 'Bold',
        color: colors.gray,
      },
      danger: {
        color: colors.light_red,
        fontWeight: 'bold',
      },
      nameRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      paragraph: {
        textAlign: 'center',
      },
      muteIcon: {
        marginRight: 8,
      },
      privateIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: dp(17),
        right: dp(17),
      },
    });
  }

  @computed get eventsList() {
    const colors = this.settings.dark ? dark : light;

    const {
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      SECTION_HEADER_HEIGHT,
      SECTION_FOOTER_HEIGHT,
      HEADER_HEIGHT,
      FOOTER_HEIGHT,
    } = events;

    return StyleSheet.create({
      contentContainer: {
        backgroundColor: colors.bg,
        flexGrow: 1,
      },
      list: {
        backgroundColor: colors.bg,
        paddingHorizontal: 14,
      },
      sectionHeader: {
        backgroundColor: colors.light_gray,
        paddingVertical: 5,
        paddingHorizontal: 16,
        height: SECTION_HEADER_HEIGHT,
        borderRadius: 8,
      },
      sectionHeading: {
        fontSize: 22,
        color: colors.primary,
      },
      sectionSubheadingContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      sectionSubheading: {
        color: colors.gray,
      },
      sectionFooter: {
        height: SECTION_FOOTER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
      },
      header: {
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg,
      },
      headerText: {
        color: colors.primary,
        fontWeight: 'bold',
      },
      loadPrevHeaderContainer: {
        height: dp(32),
      },
      footerContainer: {
        height: FOOTER_HEIGHT,
      },
      footerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      footerText: {
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      offlineTitle: {
        fontSize: 20,
        color: colors.gray,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      emptyTitle: {
        fontSize: 25,
        color: colors.light_gray_3,
        textAlign: 'center',
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      itemContainer: {
        height: ITEM_HEIGHT,
        backgroundColor: colors.bg,
      },
      itemContent: {
        paddingTop: 4,
        flexDirection: 'row',
      },
      itemBody: {
        paddingTop: 4,
        paddingLeft: 8,
        flex: 1,
      },
      itemHeadline: {
        fontSize: 18,
      },
      itemNote: {
        fontSize: 16,
        color: colors.gray,
      },
      left: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cancelled: {
        fontSize: 16,
        color: colors.light_red,
      },
      time: {
        fontSize: 14,
        color: colors.gray,
      },
      status: {
        color: colors.gray,
      },
      duration: {
        fontFamily: 'Bold',
        color: colors.gray,
      },
      durationRow: {
        flexDirection: 'row',
      },
      paragraph: {
        textAlign: 'center',
      },
      privateIcon: {
        borderRadius: 5,
        position: 'absolute',
        top: 17,
        right: 17,
      },
    });
  }

  @computed get moreList() {
    const colors = this.settings.dark ? dark : light;
    const {SEPARATOR_HEIGHT, HEADER_HEIGHT} = more_list;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: colors.bg,
      },
      header: {
        height: HEADER_HEIGHT,
        backgroundColor: colors.bg,
        marginBottom: 8,
      },
      separator: {
        height: SEPARATOR_HEIGHT,
      },
      footer: {
        backgroundColor: colors.bg,
        marginVertical: 8,
      },
      item: {
        backgroundColor: colors.bg,
      },
    });
  }

  @computed get actionsheet() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        paddingHorizontal: 16,
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
        backgroundColor: colors.bg,
      },
      content: {
        padding: 16,
      },
      header: {
        paddingBottom: 16,
      },
      title: {
        fontSize: 25,
        fontFamily: 'Bold',
        color: colors.black,
      },
      label: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: colors.light_gray_3,
      },
      option: {
        marginVertical: 16,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 16,
        color: colors.light_gray_3,
      },
    });
  }

  @computed get appStyles() {
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
        maxWidth: 48,
      },
      iconButton: {
        marginRight: 0,
      },
      badge: {
        color: colors.gray,
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
        color: colors.gray,
      },
      bg: {
        backgroundColor: colors.bg,
      },
    });
  }

  @computed get profile() {
    const colors = this.settings.dark ? dark : light;

    return StyleSheet.create({
      container: {
        backgroundColor: colors.bg,
        padding: 24,
        flex: 1,
      },
      header: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      textLabel: {
        fontSize: 13,
        marginVertical: 4,
        fontFamily: 'Bold',
      },
      value: {
        fontSize: 16,
        color: colors.black,
      },
      headline: {
        fontFamily: 'Bold',
        textAlign: 'center',
        padding: 12,
      },
      count: {
        color: colors.black,
        fontFamily: 'Bold',
        fontSize: 25,
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
        backgroundColor: colors.light_gray,
        padding: 16,
        borderRadius: 8,
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      link: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      linkStyle: {
        color: colors.link,
      },
      linkIcon: {
        paddingRight: 8,
      },
      body: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 16,
      },
      fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
      },
    });
  }
}
