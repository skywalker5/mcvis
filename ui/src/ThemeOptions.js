const ThemeOptions = {
  props: {
    MuiGrid: {
      spacing: 0
    },
    MuiOutlinedInput: {
      borderColor: "red",
    },
  },
  palette: {
    type: 'light',
    primary: {
      // main: '#4876d6',
      main: '#4979D1',
      contrastText: '#fbfbfb',
    },
    secondary: {
      main: 'rgb(44,56,87)',
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
      // secondary: '#4979D1',
      secondary: '#90a7b2',
    },
    error: {
      main: '#de3d3b',
      contrastText: '#fbfbfb',
    },
  },
  typography: {
    fontFamily: [
      'Museo Sans Rounded',
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