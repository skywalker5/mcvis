import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SaveAlt from '@mui/icons-material/SaveAlt';

const NavigationBar = (props)=> {
  return (
      <AppBar position="static">
        <Toolbar variant="dense" className={props.classes.toolbarGrid}>
          <Typography variant="h4" className={props.classes.titleTypo} noWrap>
 		        McVis
          </Typography>
          <Typography variant="h6" className={props.classes.datasetTypo} noWrap>
 		        DATASET | AMinerText
          </Typography>
          <Typography variant="h6" className={props.classes.nonzeroTypo} noWrap>
 		        NONZEROS | 16,592,539
          </Typography>
          <SaveAlt/>
          <Typography variant="h6" className={props.classes.exportTypo} noWrap>
 		        EXPORT
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default NavigationBar;

