import {capitalize} from 'lib/utils';

const DATE_FORMAT = 'MMMM DD, YYYY';
const DAY_FORMAT = 'dddd';
const NEXT_LAST_FORMAT = 'dddd, Do';
const CAL_TIME_FORMAT = 'DD MMM YYYY hh:mm';

export default {
  APP_welcome: '¡Bienvenido a Schdlr!',
  APP_caption: 'El planificador de eventos.',
  APP_footerCaption: '¡Comparte tus horarios!',

  ACTION_filterByType: (filter) => 'Filtrar por tipo: ' + capitalize(filter),
  ACTION_all: 'All',
  ACTION_events: 'Eventos',
  ACTION_schedules: 'Horarios',
  ACTION_bookmarks: 'Marcadores',
  ACTION_followers: 'Seguidores',
  ACTION_comments: 'Comentarios',
  ACTION_clearAll: 'Limpiar todo',

  COMMENTS: 'Comentarios',
  COMMENTS_emptyList: 'Sin comentarios',
  COMMENTS_loadMore: (count) => `Ver ${count} comentarios más`,
  COMMENTS_noMoreComments: 'No mas comentarios',
  COMMENT_tooLong: 'Comenta demasiado',

  FOLLOWERS_emptyList: 'Sin seguidores',
  FOLLOWERS_loadMore: 'Carga más',

  VENUE: 'LUGAR DE EVENTOS',
  REPEAT: 'REPETIR',
  CREATED: 'CREADO EN',
  UNTIL: 'HASTA EN',
  STARTED: 'EMPEZÓ A LAS',
  AUTHOR: 'CREADO POR',
  EDITED: 'EDITADO EN',
  DESCRIPTION: 'DESCRIPCIÓN',
  EVENTS_emptyList: 'No hay eventos próximos.',
  EVENT_noLocationSet: 'Sin ubicación establecida',
  EVENT_creating: 'Creando evento...',
  EVENT_updating: 'Actualizando evento...',
  EVENT_cancelling: 'Cancelando evento...',
  EVENT_noDescription: 'Sin descripción',
  EVENTS_SECTIONLIST_after: (date) => `Después del ${date}`,
  EVENTS_SECTIONLIST_noMoreEvents: () => 'No mas eventos',
  EVENTS_SECTIONLIST_before: (date) => `Antes del ${date}`,
  EVENTS_SECTIONLIST_noPrevEvents: () => 'No hay eventos previos.',
  EVENTS_SECTION_FOOTER: 'No hay eventos próximos.',
  EVENTS_SECTION_ITEM_COUNT: (count) => (count ? `${count} eventos` : ''),
  EVENT_interested: 'Interested',

  BOARD_emptyList: 'Tu tabla esta vacia',
  BOARD_emptyListCaption: 'Sigue o crea un horario',

  PROFILE_boardEmptyList: 'Sin horarios',
  PROFILE_followingLabel: 'Siguiendo',
  PROFILE_createdLabel: 'Creada',
  PROFILE_notVisibleToPublic: 'Eventos no visibles al público',

  BOOKMARKS_emptyList: 'Aún no has guardado ningún evento',
  BOOKMARKS_COUNT: (count) => `marcador${count > 1 ? 'es' : ''}`,
  BOOKMARKS_BY_emptyList: 'Aún no hay marcadores',
  BOOKMARKED_BY: 'Interested',

  MORE_settings: 'Configuraciones',
  MORE_inviteAFriend: 'Dile a un amigo',
  MORE_help: 'Ayuda',
  MORE_signOut: 'desconectar',
  MORE_sync: 'Sincronizar',
  MORE_importCalendar: 'Importar calendario',

  DISCOVER_emptyList: 'Descubrir',
  DISCOVER_turnOnLocation: 'Usa tu ubicación',
  DISCOVER_locationUsage:
    'Schdlr requiere su ubicación para encontrar eventos cercanos.',
  DISCOVER_emptyListCaption: 'Eventos que ocurren a tu alrededor!',

  SEARCH_inputPlaceholder: (city) => `Buscar${city ? ' ' + city : ' Schdlr'}`,
  SEARCH_schedulesTabLabel: 'Horarios',
  SEARCH_eventsTabLabel: 'Eventos',
  SEARCH_peopleTabLabel: 'Personas',
  SEARCH_emptyList: 'No se han encontrado resultados',
  SEARCH_loadMore: 'Carga más',
  SEARCH_noMoreResults: 'No hay más resultados',
  SEARCH_search: 'Buscar Schdlr',

  NOTIFICATIONS_updatesTabLabel: 'ACTUALIZACIONES',
  NOTIFICATIONS_messagesTabLabel: 'COMENTARIOS',
  NOTIFICATIONS_emptyUpdatesList: '¡Manténganse al tanto!',
  NOTIFICATIONS_emptyUpdatesListCaption:
    'Las actualizaciones y anuncios importantes aparecerán aquí',
  NOTIFICATIONS_emptyMessagesList: 'Sin comentarios',
  NOTIFICATIONS_allCaughtUp: '¡Estás atrapado!',
  NOTIFICATIONS_title: (filter) => {
    if (filter === 'all') return 'Notificaciones';
    return `Notificaciones - ${capitalize(filter)}`;
  },

  SETTINGS_screenTitle: 'Configuraciones',
  SETTINGS_generalSectionTitle: 'General',
  SETTINGS_commentSectionTitle: 'Comentarios',
  SETTINGS_sound: 'Sonido',
  SETTINGS_vibrate: 'Vibrar',
  SETTINGS_dark: 'Tema oscuro',
  SETTINGS_location: 'Ubicación',
  SETTINGS_reminderSectionTitle: 'Recordatorio',
  SETTINGS_disableReminders: 'Silenciar todos los eventos',
  SETTINGS_remindMe: 'Recuerdame',
  SETTINGS_pushSectionTitle: 'Notificación de inserción',
  SETTINGS_disablePush: 'Inhabilitar',
  SETTINGS_disableComments: 'Desactivar Comentarios',
  SETTINGS_disableAdminComment: 'Disable admin comments',
  SETTINGS_enableMembersComment: 'Enable members comments',
  SETTINGS_disableReplies: 'Disable replies',

  REMIND_ME_title: 'Recuerdame',
  REMIND_ME_five: '5 minutos antes',
  REMIND_ME_ten: '10 minutos antes',
  REMIND_ME_fifteen: '15 minutos antes',
  REMIND_ME_thirty: '30 minutos antes',
  REMIND_ME_oneHour: '1 hora antes',
  REMIND_ME_oneDay: '1 día antes',

  MODAL_done: 'Hecho',
  MODAL_continue: 'SEGUIR',
  MODAL_dismiss: 'DESCARTAR',

  SIGN_OUT_title: '¿Desconectar?',
  SIGN_OUT_message: 'Borrará datos',

  HELP_title: 'Ayuda',
  HELP_contactUs: 'Contactar al desarrollador',
  HELP_contactUsSubtitle: 'Preguntas? Necesitas ayuda',
  HELP_copyRight: 'informacion registrada',
  HELP_terms: 'Términos de servicio',
  HELP_appVersion: 'Version de aplicacion',
  HELP_build: 'Versión de compilación',
  HELP_privacy: 'Política de privacidad',

  BUTTON_import: 'calendario de importación',
  BUTTON_cancel: 'Cancelar',
  BUTTON_create: 'Crear',
  BUTTON_save: 'salvar',
  BUTTON_signout: 'desconectar',
  BUTTON_ok: 'Okay',
  BUTTON_help: 'AYUDA',
  BUTTON_dontShowAgain: 'No mostrar de nuevo',
  BUTTON_askMeLater: 'Pregúntame Luego',
  BUTTON_yes: 'si',
  BUTTON_no: 'No',
  BUTTON_dismiss: 'Descartar',
  BUTTON_continue: 'Seguir',
  BUTTON_done: 'Hecho',
  BUTTON_next: 'Próximo',
  BUTTON_skip: 'Omitir',
  BUTTON_back: 'Regresa',
  BUTTON_loading: 'Cargando...',
  BUTTON_tryAgain: 'Try again',
  BUTTON_addMyCalendar: 'Agregar mi calendario',
  BUTTON_continueWithEmail: 'Continuar con correo electrónico',
  BUTTON_continueWithGoogle: 'Continuar con Google',
  BUTTON_continueWithFacebook: 'Continuar con Facebook',
  BUTTON_loggingIn: 'Iniciando sesión...',
  BUTTON_signingIn: 'Iniciando sesión...',
  BUTTON_editProfile: 'Editar detalles',
  BUTTON_shareVia: 'Compartir via',
  BUTTON_shareInviteLink: 'Compartir enlace de invitación',
  BUTTON_removeBookmark: 'Eliminar marcador',
  BUTTON_bookmark: 'Marcador',
  BUTTON_mute: 'Recordatorio de silencio',
  BUTTON_muteEvents: 'Recordatorio de silencio',
  BUTTON_unmute: 'Dejar de silenciar',
  BUTTON_unmuteEvents: 'Recordatorio de silencio',
  BUTTON_unfollow: 'Dejar de seguir',
  BUTTON_sync: 'Sincronización',
  BUTTON_turnOnLocation: 'Encender',

  ALERT_repeat: 'Repetir',
  ALERT_duration: 'Duración',
  ALERT_tooShort: 'Demasiado corto',
  ALERT_until: 'Hasta la fecha',
  ALERT_cantRepeat: 'El evento debe terminar en una fecha futura',
  ALERT_invalidStart:
    'La fecha de finalización debe ser mayor que la fecha de inicio',
  ALERT_durationTooShort: 'El evento debe durar al menos cinco minutos',
  ALERT_shortUntil:
    'El evento debe ocurrir al menos dos veces antes de la fecha final',
  ALERT_whatIsASchedule: '¿Qué es un horario?',
  ALERT_whatIsAScheduleA: (schdl) =>
    `Un horario es un grupo de eventos, como un horario de clases. Los seguidores de ${
      schdl ? `"${schdl.name}"` : 'Tu agenda'
    } serán informados de este evento.`,
  ALERT_whatIsAScheduleA2:
    'Un horario es un grupo de eventos. Agregue eventos aquí y las personas que sigan este cronograma serán informadas de sus eventos.',
  ALERT_privateSchedule: 'Horario privado',
  ALERT_privateScheduleA:
    "Los eventos creados después de establecer el horario en 'Privado' no son visibles para todos.",
  ALERT_publicScheduleA:
    "Los eventos creados después de establecer el horario en 'Público' son visibles para todos.",
  ALERT_permissionLocationTitle: 'Permiso de ubicación',
  ALERT_permissionLocationMessage:
    'Schdlr necesita acceso a su ubicación para una mejor experiencia.',
  ALERT_deleteType: '¿Eliminar tipo?',
  ALERT_deleteImage: '¿Eliminar Imagen?',
  ALERT_unfollow: (name) => `Dejar de seguir a ${name}?`,
  ALERT_unfollowMessage: 'Sus eventos ya no aparecerán en su calendario.',
  ALERT_clearNotifications: '¿Borrar notificaciones?',
  ALERT_clearNotificationsMessage: 'Borrará todas las notificaciones.',

  SHARE_inviteAFriendTitle: 'Invitar a través de ...',
  SHARE_SCHEDULE_inviteTitle: 'Compartir enlace de invitación a través de ...',
  SHARE_SCHEDULE_subject: 'Has sido invitado a seguir un horario en Schdlr.',
  SHARE_SCHEDULE_message: (name) =>
    `Hola, te invito a seguir "${name}" para ver sus últimos eventos, recibir actualizaciones y recordatorios.\n`,
  SHARE_EVENT_inviteTitle: 'Compartir evento a través de ...',
  SHARE_appMessage: `¡Hola! ¡Te invito a usar Schdlr!
  Con Schdlr puede compartir fácilmente eventos con comunidades, ya sea en familia, trabajo o escuela.
  Descarga Schdlr aquí:`,
  SHARE_appTitle: 'Invita a un amigo',
  SHARE_appSubject: 'Ver eventos que ocurren cerca de ti',

  TOAST_eventAdded: 'Evento publicado',
  TOAST_enableReminder: '¡Activar todos los eventos para continuar!',
  TOAST_updatesAvailable: 'Actualizaciones disponibles. Actualizar calendario',
  TOAST_locationError:
    'No se pudo obtener la ubicación. Desactiva el modo avión.',
  TOAST_noImageFound: 'No se ha encontrado ninguna imagen.',
  TOAST_removed: 'Marcador eliminado',
  TOAST_saved: 'Evento marcado',
  TOAST_fetchingUpdates: 'Obteniendo actualizaciones ...',
  TOAST_newNotifications: (count) => {
    if (count > 1) {
      return `${count} notificaciones nuevas`;
    }
    return `${count} nueva notificación`;
  },
  TOAST_justAmoment: 'Aplicando tema ... Solo un momento',
  TOAST_downloading: 'Descargando ...',
  TOAST_downloadFailed: 'Descarga fracasó',
  TOAST_fileTooLarge: (name) =>
    `"${name.slice(0, 20)}..." es más grande que 8mb`,

  PROFILE_FORM_name: 'Nombre',
  PROFILE_FORM_website: 'Sitio web',
  PROFILE_FORM_bio: 'Bio',
  PROFILE_joined: (date) => `Se unió en ${date}`,

  EVENT_FORM_title: 'Título',
  EVENT_FORM_description: 'Descripción',
  EVENT_FORM_venue: 'Lugar de eventos',
  EVENT_FORM_category: 'TIPO DE EVENTO',
  EVENT_FORM_from: 'FECHA DE INICIO',
  EVENT_FORM_to: 'FECHA FINAL',
  EVENT_FORM_allDay: 'EVENTO TODO EL DÍA',
  EVENT_FORM_repetition: 'REAPARICIÓN',
  EVENT_FORM_public: 'Público',
  EVENT_FORM_schedule: 'CALENDARIO',
  EVENT_FORM_repeat: 'REPETIR',
  EVENT_FORM_repeatForever: 'REPETIR PARA SIEMPRE',
  EVENT_FORM_repeatUntil: 'REPETIR HASTA LA FECHA',
  EVENT_FORM_selectASchedule: 'Selecciona un horario',
  EVENT_FORM_noSchedule: 'Sin horario',
  EVENT_FORM_addToASchedule: 'Agregar a un horario',

  EVENT_ITEM_allDay: 'Todo el dia',
  EVENT_CAPTION_allDay: ({type, recurrence}) => {
    return `${recurrence} ${type}`;
  },
  EVENT_CAPTION_xthDayOfType: ({type, totalDayCount, currentDayCount}) => {
    return `${
      type ? type + ' day' : 'Día'
    } ${currentDayCount} de ${totalDayCount}`;
  },
  EVENT_CAPTION_xDurationRecurrenceType: ({duration, recurrence, type}) => {
    return `${duration}${recurrence ? ` ${recurrence}` : ''}${
      type ? ` ${type}` : ''
    }`;
  },

  SCHEDULE: 'CALENDARIO',
  SCHEDULE_public: 'Horario público',
  SCHEDULE_private: 'Horario privado',
  SCHEDULE_FORM_name: 'Nombre',
  SCHEDULE_FORM_description: 'Descripción',
  SCHEDULE_FORM_private: 'Horario privado',
  SCHEDULE_FORM_public: 'PÚBLICO',

  SCHEDULE_followerCount: 'Seguidor',
  SCHEDULE_followerCounts: 'Seguidores',
  SCHEDULE_eventsCount: 'Evento',
  SCHEDULE_eventsCounts: 'Eventos',
  SCHEDULE_thisScheduleIsClosed: 'Este horario está archivado',
  SCHEDULE_createdOn: 'Creado en',
  SCHEDULE_by: 'Creado por',
  SCHEDULE_whatIsASchedule: '¿Qué es un horario?',

  SCHEDULES_noUpcomingEvents: 'No hay eventos próximos.',
  SCHEDULES_loadPastEvents: (count) =>
    `Carga${count > 1 ? '' : 'r'} ${count} evento${
      count > 1 ? 's' : ''
    } pasado${count > 1 ? 's' : ''}`,
  SCHEDULES_noMoreEvents: 'No mas eventos',
  SCHEDULE_FORM_selectTopic: 'elige un tema',

  HELPER_TEXT_titleIsRequired: 'Título es requerido',
  HELPER_TEXT_nameIsRequired: 'Se requiere el nombre',
  HELPER_TEXT_tooShort: 'Demasiado corto',
  HELPER_TEXT_tooLong: 'Demasiado largo',
  HELPER_TEXT_recommended: 'Recomendado',
  HELPER_TEXT_required: 'Necesario',
  HELPER_TEXT_invalidDatesAndRecur:
    'La duración de los eventos debe ser más corta que la frecuencia de repetición',
  HELPER_TEXT_description: 'Demasiado largo',
  HELPER_TEXT_nameIsRequired: 'Se requiere el nombre',
  HELPER_TEXT_website: 'Entrada inválida',
  HELPER_TEXT_location:
    'Su ubicación nos ayuda a mejorar su experiencia con mejores resultados de búsqueda.',
  HELPER_TEXT_invalidEndDate: 'El evento debe terminar en una fecha futura',
  HELPER_TEXT_invalidStart:
    'La fecha de finalización debe ser mayor que la fecha de inicio',
  HELPER_TEXT_durationTooShort: 'El evento debe durar al menos cinco minutos.',
  HELPER_TEXT_shortUntil: 'El evento debe repetirse al menos una vez',

  MENU_edit: 'Edit',
  MENU_close: 'Close',
  MENU_open: 'Open',
  MENU_delete: 'Delete',

  RECUR_never: 'Evento de una vez',
  RECUR_daily: 'Diario',
  RECUR_weekly: (day) => `Semanal (todos los ${day})`,
  RECUR_weekdays: 'Entre semana (lunes a viernes)',
  RECUR_monthly: 'Mensualmente (el mismo día)',
  RECUR_yearly: (date) => `Anualmente (cada ${date})`,

  STATUS_concluded: 'Concluido',
  STATUS_ongoing: 'En marcha',
  STATUS_done: 'Hecho',
  STATUS_cancelled: 'Cancelado',
  STATUS_upcoming: 'Próximo',
  STATUS_closed: 'Archivado',

  ERROR_serverError: (message) =>
    'error del servidor en la aplicación' + (message ? ': ' + message : ''),
  ERROR_noConnection: 'Sin conexión',
  ERROR_404: 'Extraviado',
  ERROR_404_caption: 'El artículo puede haber sido eliminado',
  ERROR_offline: 'Estas fuera de linea!',
  ERROR_somethingWentWrong: '¡Algo salió mal! Inténtalo de nuevo',
  ERROR_failedToGetLocation:
    'No se pudo acceder a tu ubicación. Verifique su red móvil y GPS',
  ERROR_failedToRemoveImage: 'Error al eliminar la imagen',
  ERROR_failedToUploadImage: 'Error al cargar la imagen',
  ERROR_failedToApplyTheme: 'Error al aplicar el tema',
  ERROR_navigationError: 'Error de navegación',
  ERROR_failedToCreateEvent: (title) =>
    `Error al publicar el evento: ${title}.`,
  ERROR_failedToCreateSchedule: (name) =>
    `Error al guardar el horario: ${name}.`,
  ERROR_failedToCreateComment: (content) =>
    `Error al entregar el comentario: ${content}.`,
  ERROR_failedToSendFiles: (count) =>
    `Error al enviar ${count} archivo${count > 1 ? 's' : ''}`,
  ERROR_failedToCreateBookmark: 'No se pudo marcar el evento.',
  ERROR_failedToCreateFollow: 'No se pudo seguir el horario.',
  ERROR_failedToDeleteEvent: 'No se pudo eliminar el evento.',
  ERROR_failedToDeleteSchedule: 'No se pudo eliminar el horario.',
  ERROR_failedToDeleteComment: 'No se pudo eliminar el comentario.',
  ERROR_failedToDeleteBookmark: 'No se pudo eliminar el marcador.',
  ERROR_failedToDeleteFollow: 'No se pudo dejar de seguir el horario.',
  ERROR_fatal: 'Se produjo un error fatal.',
  ERROR_configHint: 'Sincronice ahora e intente nuevamente.',
  ERROR_signInFailure: 'Error al iniciar sesión',

  PLACEHOLDER_comment: (addressee) => {
    if (addressee) {
      return 'Replying ' + addressee;
    }
    return 'About this event...';
  },
  PLACEHOLDER_normal: 'Normal',
  PLACEHOLDER_addYourWebsite: 'Añade tu página web',
  PLACEHOLDER_bio: 'Sobre mí',
  PLACEHOLDER_venue: (city) => (city ? `En ${city}` : 'Lugar de eventos'),
  PLACEHOLDER_customType: 'Agregar un tipo personalizado',
  PLACEHOLDER_searchCities: 'Buscar ciudades',

  WARNING_dontMissOut: '¡No te lo pierdas!',
  WARNING_fileTooLarge: 'El archivo es demasiado grande',

  DIALOG_cancelEvent: '¿Cancelar evento?',
  DIALOG_onlyThisEvent: 'Sólo este evento?',
  DIALOG_allOfThisEvent: 'Todo este evento',
  DIALOG_closeSchedule: 'Archivar este horario?',
  DIALOG_closeScheduleWarning: 'No agregarás eventos futuros.',
  DIALOG_deleteComment: '¿Eliminar este comentario?',
  DIALOG_deleteEvent: '¿Eliminar este evento?',
  DIALOG_deleteEventWarning:
    'Siempre cancele los eventos antes de eliminarlos para notificar a sus seguidores.',
  DIALOG_deleteSchedule: '¿Eliminar este horario?',
  DIALOG_deleteScheduleWarning:
    '¡La acción eliminará todos los eventos relacionados!',
  DIALOG_openSchedule: '¿Desarchivar este horario?',

  SNACKBAR_sync: 'Sincronizar',
  SNACKBAR_seeUpdates: 'Ver actualizaciones',

  REQUEST_LOCATION_TITLE: 'Permiso de ubicación de Schdlr',
  REQUEST_LOCATION_MESSAGE:
    'La aplicación Schdlr necesita acceso a su ubicación para que los eventos sean más fáciles de encontrar.',

  PICKER_location: 'Ubicación',
  SYNC_message:
    'Eliminará todos los eventos eliminados y caducados y arreglará los eventos y horarios faltantes.',
  SYNC_complete: 'Sincronizado',

  TEXT_addImagesToAlbum: 'Agregar imágenes al álbum',
  TEXT_noAlbum: 'Álbum de fotos',
  TEXT_noBanner: 'Banner de eventos',
  TEXT_album: 'Álbum',

  THEME_title: 'Theme',
  THEME_auto: 'Use my System Theme',
  THEME_light: 'Light',
  THEME_dark: 'Dark',

  MOMENT_left: (from) => `Quedan ${from}`,
  Today: 'Hoy',

  calendarFormats: {
    sameDay: '[Hoy] ddd Do',
    nextDay: '[Mañana] ddd Do',
    nextWeek: 'dddd, Do',
    lastDay: '[Ayer], ddd Do',
    lastWeek: '[el] dddd [pasado]',
    sameElse: 'ddd, Do MMM YYYY',
  },

  headingCalendarFormats: {
    sameDay: '[Hoy]',
    nextDay: '[mañana]',
    nextWeek: DAY_FORMAT,
    lastDay: '[Ayer]',
    lastWeek: '[el] dddd [pasado]',
    sameElse: DATE_FORMAT,
  },
  calendarTimeFormats: {
    sameDay: function () {
      return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] HH:mm';
    },
    nextDay: '[Mañana]',
    nextWeek: DAY_FORMAT,
    lastDay: function () {
      return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] hh:mm';
    },
    lastWeek: CAL_TIME_FORMAT,
    sameElse: CAL_TIME_FORMAT,
  },
  subheadingCalendarFormats: {
    sameDay: NEXT_LAST_FORMAT,
    nextDay: NEXT_LAST_FORMAT,
    nextWeek: DATE_FORMAT,
    lastDay: NEXT_LAST_FORMAT,
    lastWeek: DATE_FORMAT,
    sameElse: DAY_FORMAT,
  },
  categories: [
    'Evento normal', // Default category should always be the first item
    'Conferencia',
    'Competencia',
    'Examen',
    'Festival',
    'Reunirse',
    'Reunión',
    'Fiesta',
    'La actuación',
    'Excursión',
    'Torneo',
    'Formación',
  ],
  SELECT_customType: 'Tipo personalizado...',
  topics: [
    'Nombramientos personales',
    'Profesional de negocios',
    'Caridad y causas',
    'Comunidad y cultura',
    'Educación',
    'Belleza de la moda',
    'Cine, medios y entretenimiento',
    'Comida y bebida',
    'Gobierno y política',
    'Salud y Bienestar',
    'Aficiones e intereses especiales',
    'Estilo de vida familiar',
    'Música',
    'Religion & Espiritualidad',
    'Actividades escolares',
    'Tecnología científica',
    'Estacional y festivo',
    'Deportes y fitness',
    'Viajes y actividades al aire libre',
  ],
  personalSchedule: {
    name: 'Lista personal 📝',
    description: 'Mis citas',
    topic: 'Mis citas',
    isPublic: false,
  },
  timeLabels: {
    d: 'Dias',
    h: 'Horas',
    m: 'Mins',
    s: 'Segundos',
  },
  daily: 'diario',
  weekly: 'weekly',
  weekdays: 'semanal',
  monthly: 'mensual',
  yearly: 'anual',
};
