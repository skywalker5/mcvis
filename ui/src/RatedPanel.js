import React from 'react';
import {Paper, Divider,  Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TableContainer from '@mui/material/TableContainer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import api from './api';
import { LogoNodejs,EnterOutline } from 'react-ionicons'
class RatedPanel extends React.Component {
  constructor(props) {
      super(props);
      this.state = { author: true, 
          document: true, 
          keyword: true
       };
  }

  handleChange_auth = (event, click) => {
    this.setState({
        author: !this.state.author
    });
    axios.post(`${api}/entitychange_recom/auth_${this.state.author}`)
    .then(response => {
        console.log(4)
    });
  };

  handleChange_doc = (event, click) => {
    this.setState({
        document: !this.state.document
    });
    axios.post(`${api}/entitychange_recom/doc_${this.state.document}`)
    .then(response => {
        console.log(5)
    });
  };

  handleChange_word = (event, click) => {
    this.setState({
        keyword: !this.state.keyword
    });
    axios.post(`${api}/entitychange_recom/word_${this.state.keyword}`)
    .then(response => {
        console.log(6)
    });
  };
  render(){
    const {classes} = this.props;
    
    let titleTheme = createMuiTheme({
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
    let rateTypoTheme = createMuiTheme({
      palette: {
        primary: {
          main: 'rgb(255,127,80)',
          contrastText: '#fbfbfb',
        },
      },
      typography: {
        h6: {
          fontSize:11,
          fontWeight: 600,
        }
      },
    });
    let tableHeadTheme = createMuiTheme({
      overrides: {
          MuiTableCell: {
            stickyHeader: {  //This can be referred from Material UI API documentation. 
                paddingTop: 2,
                paddingBottom: 2,
                borderBottom: false,
                borderTop: false,
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor:"rgb(249,231,204)",
            },
          },
      },
      typography: {
        h6: {
          fontFamily: [
            'Museo Sans Rounded',
          ].join(','),
          fontSize: 12,
          fontWeight: 600,
        }
      },
    });
    let tableBodyTheme = createMuiTheme({
      overrides: {
          MuiTableCell: {
              root: {  //This can be referred from Material UI API documentation. 
                  paddingTop: 2,
                  paddingBottom: 2,
              },
          },
      },
    });
    
    const columns = [
      { field: 'Name', headerName: 'Name', flex: 0.4 },
      { field: 'Type', headerName: 'Type', flex: 0.2 }
    ];
      return (
        <Paper className={classes.ratePaper}>
          <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
            <Grid container direction="row" className={classes.zoomGrid} spacing={0}>
              <Grid container direction="row" className={classes.rateStack}>
                <ThemeProvider theme={titleTheme}>
                <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                  Ratings
                </Typography>
                </ThemeProvider>
                <div className={classes.grow}/>
                <ThemeProvider theme={rateTypoTheme}>
                <Button className={classes.submitButton} type="submit" variant="contained" color = "primary">
                  {/* <EnterOutline height="15px" color={'white'}/> */}
                  <ExitToAppIcon className={classes.submitIcon}/>
                  <Typography variant="h6">Submit</Typography>
                </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
            {/* <Divider/> */}
            <TableContainer component={Paper} className={classes.recomTable}>
              <Table stickyHeader>
                <ThemeProvider theme={tableHeadTheme}>
                <TableHead >
                  <TableRow className={classes.recomTableRow}>
                    <TableCell className={classes.recomTableArrowCol} padding="checkbox" />
                    <TableCell align="left"><Typography variant="h6">ID</Typography></TableCell>
                    <TableCell className={classes.detailTableCluCol} align="left"><Typography variant="h6">Type</Typography></TableCell>
                    <TableCell className={classes.recomTableRatingCol} align="left"><Typography variant="h6">Rating</Typography></TableCell>
                  </TableRow>
                </TableHead>
                </ThemeProvider>
                <ThemeProvider theme={tableBodyTheme}>
                <TableBody>
                  {/* <TableRow className={classes.recomTableRow}>
                    <TableCell>Entity ID</TableCell>
                    <TableCell>Entities #</TableCell>
                  </TableRow> */}
                </TableBody>
                </ThemeProvider>
              </Table>
            </TableContainer>
            <Divider/>
          </Grid>
        </Paper>
      )
  }
}

export default RatedPanel;