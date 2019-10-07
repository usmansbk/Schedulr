import moment from 'moment';
import NavigationService from 'config/navigation';

export function processLocalNotification(data) {
  const { id, startAt, endAt } = data;
  let today = moment();
  const start = moment(startAt);
  const end = moment(endAt);
  const duration = Math.abs(moment.duration(start.diff(end)));

  let refStartAt, refEndAt;

  if (start >= today) {
    const hour = start.hours();
    const min = start.minutes();
    const sec = start.seconds();
    today.hours(hour);
    today.minutes(min);
    today.seconds(sec);
    refStartAt = start.toISOString();
    refEndAt = start.clone().add(duration).toISOString();
  }
  NavigationService.navigate('EventDetails', { id, refStartAt, refEndAt });
}

export function processRemoteNotification(notification) {
  console.log(notification);
  NavigationService.navigate('Notifications');
}