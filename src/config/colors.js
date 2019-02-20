import { isDayTime } from '../lib/time';

const light = {
  facebook: '#3b5998',
  google: '#4285F4',
  black: '#404040',
  bg: 'white',
  gray: '#7d7d7d',
  light_gray: '#f5f5f5',
  light_gray_2: '#f8f8f8',
  light_gray_3: '#989898',
  white: 'white',
  red: '#cc3300',
  light_red: '#eb5a46',
  primary: '#1976d2',
  primary_light: '#63a4ff',
  primary_dark: '#004ba0',
  // disabled: '#d3d3d3',
  alt_primary: '#757de8',
  green: '#008000',
  yellow: '#ff9900',
  soft_blue: '#688bf8',
  deep_purple: '#562765',
  blue: '004f86',
  placeholder: '#7d7d7d',
  navButtonColor: '#004ba0',
}

const dark = {
  facebook: '#3b5998',
  google: '#4285F4',
  black: '#ffffff',
  gray: 'white',
  bg: '#303030',
  light_gray: '#303030',
  light_gray_2: '#212121',
  light_gray_3: '#989898',
  white: '#424242',
  red: '#cc3300',
  light_red: '#f2476a',
  primary: '#1976d2',
  primary_light: '#63a4ff',
  primary_dark: '#004ba0',
  disabled: '#d3d3d3',
  alt_primary: '#757de8',
  money_green: '#216C2A',
  green: '#7FFF00',
  yellow: '#ffc40d',
  soft_blue: '#7ad7f0',
  deep_purple: '#562765',
  blue: '004f86',
  placeholder: 'white',
  navButtonColor: 'white'
};

let defaultPalette = dark;

if (isDayTime()) {
  defaultPalette = light;
}

export default defaultPalette;