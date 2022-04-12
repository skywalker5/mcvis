import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavigationBar = (props)=> {
  return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h4" noWrap>
 		        McVis
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default NavigationBar;

