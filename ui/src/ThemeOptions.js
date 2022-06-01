const ThemeOptions = {
  overrides:{
    MuiRadio: {
      root:{
      //   // padding:3
        paddingTop:0,
        paddingBottom:0,
        paddingRight:3,
      }
    },
    MuiSlider: {
      thumb:{
        width: 8,
        height: 8,
        marginTop:-2.5,
        marginLeft:-2.5
      },
      track: {
        height: 3
      },
      rail: {
        height: 3
      },
      // mark:{
      // }
      markLabel:{
        Active:{
          fontSize:20,

        },
        fontSize:10,
        // transform:"rotate(45deg)"
      },
      mark:{
        height:3,
        width:3
      },
    },
  },
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
    success: {
      main: 'rgb(255,127,80)',
      contrastText: '#fbfbfb',
    },
    warning: {
      // main: '#c96765',
      // contrastText: '#fbfbfb',
      main: 'rgb(255,127,80)',
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