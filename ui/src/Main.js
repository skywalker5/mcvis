import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import ProjectGrid from './ProjectGrid';
import NavigationBar from './NavigationBar';
import Footer from './Footer'
import useStyles from "./StyleOptions";

class Main extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.grow}>
          <CssBaseline/>
            <NavigationBar classes={classes}/>
              <ProjectGrid classes={classes}/>
            <Footer/>
      </div>
    );
  }
}

export default withStyles(useStyles)(Main);