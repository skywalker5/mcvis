import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SaveAlt from '@mui/icons-material/SaveAlt';

const NavigationBar = (props)=> {
  return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h4" noWrap>
 		        McVis
          </Typography>
          <div className={props.classes.grow}/>
          <Typography variant="h6" noWrap>
 		        DATASET | AMinerText
          </Typography>
          <Typography variant="h6" noWrap>
 		        NONZEROS | 16,592,539
          </Typography>
          <div className={props.classes.grow}/>
          <SaveAlt/>
          <Typography variant="h6" noWrap>
 		        EXPORT
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default NavigationBar;

