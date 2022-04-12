import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import ProjectGrid from './ProjectGrid';
import NavigationBar from './NavigationBar';
import Footer from './Footer'

const styles = {
  grow: {
    flexGrow: 1,
  }
};

class Main extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.grow}>
          <CssBaseline/>
            <NavigationBar/>
              <ProjectGrid/>
            <Footer/>
      </div>
    );
  }
}

export default withStyles(styles)(Main);