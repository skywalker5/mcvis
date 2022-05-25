import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Grid from '@material-ui/core/Grid';

const NavigationBar = (props)=> {
  let titleTheme = createMuiTheme({
    typography: {
      h4: {
        fontFamily: [
          'Museo Sans Rounded',
        ].join(','),
        fontSize: 26,
        fontWeight: 600,
      }
    },
  });
  let featTheme = createMuiTheme({
    typography: {
      h6: {
        fontFamily: [
          'Museo Sans Rounded',
        ].join(','),
        fontSize: 13,
        fontWeight: 300,
      }
    },
  });
  let nameTheme = createMuiTheme({
    typography: {
      h6: {
        fontFamily: [
          'Museo Sans Rounded',
        ].join(','),
        fontSize: 13,
        fontWeight: 600,
      }
    },
  });
  return (
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense" className={props.classes.toolbarGrid}>
          <ThemeProvider theme={titleTheme}>
            <Typography variant="h4" className={props.classes.titleTypo} noWrap>
              McVis
            </Typography>
          </ThemeProvider>
          
            <Typography className={props.classes.datasetTypo} noWrap>
            <ThemeProvider theme={featTheme}>
            <Typography variant="h6" noWrap>
              DATASET 
            </Typography>
            </ThemeProvider>
            <ThemeProvider theme={nameTheme}>
            <Typography className={props.classes.nameTypo} variant="h6" noWrap>
              | AMinerText
            </Typography>
            </ThemeProvider>
            </Typography>
          
          <Typography className={props.classes.datasetTypo} noWrap>
          <ThemeProvider theme={featTheme}>
          <Typography variant="h6" noWrap>
            NONZEROS
          </Typography>
          </ThemeProvider>
          <ThemeProvider theme={nameTheme}>
          <Typography className={props.classes.nameTypo} variant="h6" noWrap>
          | 16,592,039
          </Typography>
          </ThemeProvider>
          </Typography>
          <ThemeProvider theme={nameTheme}>
          <Typography variant="h6" className={props.classes.exportTypo} noWrap>
          <SaveAlt className={props.classes.saveIcon} />
 		        EXPORT
          </Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
  );
};

export default NavigationBar;