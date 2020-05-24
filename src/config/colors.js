export const avatarColors = [
  '#8e44ad', //Wisteria
  '#2980b9', // belize hole
  '#27ae60', // nephritis,
  '#2d3436', //dracula orchid
  '#16a085', // green sea
  '#e67e22', // carrot
  '#d35400', // pumpkin
  '#00cec9' // robin's egg blue 
];

export const avatarColorsWithOpacity = {
  '#8e44ad': `rgba(142, 68, 173, 0.3)`,
  '#2980b9': `rgba(41, 128, 185, 0.3)`,
  '#27ae60': `rgba(39, 174, 96, 0.3)`,
  '#2d3436': `rgba(45, 52, 54, 0.3)`,
  '#16a085': `rgba(22, 160, 133, 0.3)`,
  '#e67e22': `rgba(230, 126, 34, 0.3)`,
  '#d35400': `rgba(211, 84, 0, 0.3)`,
  '#00cec9': `rgba(0, 206, 201, 0.3)`
}

export const light = {
  tint: '#84939e',
  nav: '#e3f1fc',
  facebook: '#3b5998',
  google: '#4285F4',
  black: '#14171a',
  bg: 'white',
  gray: '#657786',
  light_gray: '#f5f8fa',
  light_gray_2: '#f8f8f8',
  light_gray_3: '#989898',
  light_gray_4: '#e1e8ed',
  white: 'white',
  light_red: '#eb5a46',
  // primary: '#00acee',
  primary: '#008abe',
  primary_light: '#2bc4ff',
  primary_dark: '#008abe',
  link: '#0086e6',
  like: '#63a4ff',
  green: '#008000',
  yellow: '#ff9900',
  soft_blue: '#688bf8',
  placeholder: '#7d7d7d',
  navButtonColor: '#004ba0',
  success: '#53C41A',
  error: '#FF180B',
  warning: '#FBAD15',
  actionsheet: '#e5e5e5',
  actionsheetTitleText: '#757575',
  selectedButton: 'white',
  textInput: '#f5f8fa',
  primaryOpaque : opacity => `rgba(25, 118, 210, ${opacity})`
};

export const dark = {
  nav: '#303030',
  tint: '#84939e',
  facebook: '#3b5998',
  google: '#4285F4',
  black: '#ffffff',
  gray: 'white',
  // bg: '#303030',
  light_gray: '#121212',
  bg: '#121212',
  // light_gray: '#303030',
  light_gray_2: '#212121',
  light_gray_3: '#989898',
  light_gray_4: '#303030',
  link: '#0086e6',
  white: '#424242',
  light_red: '#ff5252',
  primary: '#00acee',
  primary_light: '#2bc4ff',
  primary_dark: '#008abe',
  disabled: '#d3d3d3',
  money_green: '#216C2A',
  like: '#63a4ff',
  green: '#008000',
  yellow: '#ffc40d',
  soft_blue: '#7ad7f0',
  placeholder: '#7d7d7d',
  navButtonColor: 'white',
  success: '#53C41A',
  error: '#FF180B',
  warning: '#FBAD15',
  actionsheet: '#212121',
  actionsheetTitleText: 'white',
  selectedButton: 'black',
  textInput: '#424242',
  primaryOpaque : opacity => `rgba(25, 118, 210, ${opacity})`
};

export default light;