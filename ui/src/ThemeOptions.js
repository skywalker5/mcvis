const ThemeOptions = {
  props: {
    MuiGrid: {
      spacing: 2
    }
  },
  palette: {
    type: 'light',
    primary: {
      // main: '#4876d6',
      main: 'rgb(44,56,87)',
      contrastText: '#fbfbfb',
    },
    secondary: {
      main: '#2aa298',
      contrastText: '#fbfbfb',
    },
    warning: {
      main: '#c96765',
      contrastText: '#fbfbfb',
    },
    background: {
      paper: '#f8f8f8',
      default: '#ededed',
    },
    text: {
      primary: '#403f53',
      secondary: '#90a7b2',
    },
    error: {
      main: '#de3d3b',
      contrastText: '#fbfbfb',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
};
export default ThemeOptions