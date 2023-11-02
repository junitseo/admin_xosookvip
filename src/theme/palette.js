// import { purple, red, indigo, blue, blueGrey } from '@mui/material/colors';

// const white = '#FFFFFF';
// const black = '#000000';

// export default {
//     black,
//     white,
//     primary: {
//       contrastText: white,
//       dark:indigo[900],
//       main:indigo[500],
//       light:indigo[100]
//     },
//     secondary: {
//       contrastText: white,
//       dark:blue[900],
//       main:blue['A400'],
//       light:blue['A400']
//     },
//     text: {
//       primary:blueGrey[900],
//       secondary:blueGrey[600],
//       link:blue[600]
//     },
//     background: {
//       primary: '#f2e1b7',
//       secondary: '#ffb3b1',
//       tertiary: '#9ac48d',
//       quaternary: '#fdae03',
//       quinary: '#e7140d',
//     },
//   };
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    primary: '#f2e1b7',
    secondary: '#ffb3b1',
    tertiary: '#9ac48d',
    quaternary: '#fdae03',
    quinary: '#e7140d',
  },
};