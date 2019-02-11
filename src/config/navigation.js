import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function deepLinkNavigate(url) {
  const route = url.replace(/.*?:\/\//g, '');
  const id = route.match(/\/([^\/]+)\/?$/)[1];
  const routeName = route.split('/')[1];
  switch(routeName) {
    case 'event':
      NavigationService.navigate('EventDetails', { id });
      break;
    case 'board':
      NavigationService.navigate('BoardInfo', { id });
      break;
    default:
      break;
  }
}

export default {
  navigate,
  deepLinkNavigate,
  setTopLevelNavigator
}