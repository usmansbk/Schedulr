import NavigationService from 'config/navigation';

export function processLocalNotification(data) {
  const { id, __typename } = data;
  if (__typename === 'Calendar') {
    NavigationService.navigate('CalendarEvent', { id });
  } else {
    NavigationService.navigate('EventDetails', { id });
  }
}

export function processRemoteNotification(result) {
  const { notification : { payload : { additionalData } } } = result;
  let screen = 'Notifications';
  if (additionalData.type === 'Event') {
    screen = 'EventDetails';
  } else if (additionalData.type === 'Comment') {
    screen = 'Comments';
  }
  NavigationService.navigate(screen, {
    id: additionalData.id,
    from: additionalData.refStartAt
  });
}