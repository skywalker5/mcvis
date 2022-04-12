import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeOptions from  './ThemeOptions';
import Main from './Main';

const windowHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0);

const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      height: windowHeight,
  }
}));

function App() {
  let theme = createMuiTheme(ThemeOptions);
  theme = responsiveFontSizes(theme);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Main/>
      </div>
    </ThemeProvider>
  );
}

export default App;
