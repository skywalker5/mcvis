import React from 'react';
import {Paper, Divider,  Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {TextField, Typography} from '@material-ui/core';
import {Grid, List, Chip, Checkbox} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AntSwitch from './AntSwitch';
import Switch from '@material-ui/core/Switch';
import TableContainer from '@mui/material/TableContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import api from './api';
import { DataGrid } from '@mui/x-data-grid';

class RecommendPanel extends React.Component {
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
    let tableHeadTheme = createMuiTheme({
      overrides: {
          MuiTableCell: {
            stickyHeader: {  //This can be referred from Material UI API documentation. 
                paddingTop: 0,
                paddingBottom: 0,
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
          lineHeight:1.2,
        }
      },
    });
    let tableBodyTheme = createMuiTheme({
      overrides: {
          MuiTableCell: {
              root: {  //This can be referred from Material UI API documentation. 
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
              },
          },
      },
      typography: {
        h6: {
          fontFamily: [
            'Museo Sans Rounded',
          ].join(','),
          fontSize: 13,
          fontWeight: 400,
          lineHeight:1.2,
        }
      },
    });
    let objectTypoTheme = createMuiTheme({
      typography: {
        h6: {
          color:"#fbfbfb",
          fontWeight: 700,
        }
      },
    });
    let objectTypoThemeUn = createMuiTheme({
      typography: {
        h6: {
          color:"rgb(132,140,152)",
          fontWeight: 700,
        }
      },
    });
    const columns = [
      { field: 'Name', headerName: 'Name', flex: 0.4 },
      { field: 'Type', headerName: 'Type', flex: 0.2 }
    ];
    const dat = [
      {"Name":"Qurat-Ul-Ain Qurat-Ul-Ain","Type":"Word","id":36126},
      {"Name":"Ghazanfar Latif","Type":"Doc","id":28156},
      {"Name":"Rema Asheibani Saad","Type":"Doc","id":31065},
      {"Name":"Zakaria Suliman Zubi","Type":"Word","id":36136},
      {"Name":"Qurat-Ul-Ain Qurat-Ul-Ain","Type":"Word","id":6126},
      {"Name":"Ghazanfar Latif","Type":"Doc","id":2816},
      {"Name":"Rema Asheibani Saad","Type":"Doc","id":3165},
      {"Name":"Zakaria Suliman Zubi","Type":"Word","id":3136},
      {"Name":"Qurat-Ul-Ain Qurat-Ul-Ain","Type":"Word","id":616},
      {"Name":"Ghazanfar Latif","Type":"Doc","id":281},
      {"Name":"Rema Asheibani Saad","Type":"Doc","id":65},
      {"Name":"Zakaria Suliman Zubi","Type":"Word","id":136},
    ]
      return (
        <Paper className={classes.recomPaper}>
          <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
            <ThemeProvider theme={titleTheme}>
            <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
              Recommendations
            </Typography>
            </ThemeProvider>
            <Divider/>
            <FormGroup aria-label="position" row>
            <Grid container direction="row" className={classes.grid}>
                {this.state.document? 
                <Chip color="primary" className={classes.objectChip2} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_doc} 
                    control={ <AntSwitch checked={this.state.document} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Document</Typography></ThemeProvider>} />
                }/> :
                <Chip className={classes.objectChip2Un} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_doc} 
                    control={ <AntSwitch checked={this.state.document} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Document</Typography></ThemeProvider>} />
                }/>}
                {this.state.keyword? 
                <Chip color="primary" className={classes.objectChip2} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_word} 
                    control={ <AntSwitch checked={this.state.keyword} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Word</Typography></ThemeProvider>} />
                }/> :
                <Chip className={classes.objectChip2Un} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_word} 
                    control={ <AntSwitch checked={this.state.keyword} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Word</Typography></ThemeProvider>} />
                }/>}
                {this.state.author? 
                <Chip color="primary" className={classes.objectChip2} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_auth} 
                    control={ <AntSwitch checked={this.state.author} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Author</Typography></ThemeProvider>} />
                }/> :
                <Chip className={classes.objectChip2Un} label={
                  <FormControlLabel 
                    className={classes.formLabel} 
                    onChange={this.handleChange_auth} 
                    control={ <AntSwitch checked={this.state.author} inputProps={{ 'aria-label': 'ant design' }} />} 
                    label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Author</Typography></ThemeProvider>} />
                }/>}
                {/* <Chip color="primary" className={classes.objectChip} label={
                <FormControlLabel className={classes.formLabel} onChange={this.handleChange_doc} control={ <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Document</Typography></ThemeProvider>} />
                }/>
                <Chip color="primary" className={classes.objectChip} label={
                <FormControlLabel className={classes.formLabel} onChange={this.handleChange_word} control={<AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Word</Typography></ThemeProvider>} />
                }/>
                <Chip color="primary" className={classes.objectChip} label={
                <FormControlLabel className={classes.formLabel} onChange={this.handleChange_auth} control={<AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Author</Typography></ThemeProvider>} />
                }/> */}
            </Grid>
            </FormGroup>
            <Divider/>
            {/* <Grid container direction="row" className={classes.pairSearchGrid} spacing={0}> */}
              {/* <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                Source
              </Typography>
                <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                Target
              </Typography> */}
              <TableContainer component={Paper} className={classes.recomTable}>
                  <Table stickyHeader size="small" >
                    <ThemeProvider theme={tableHeadTheme}>
                    <TableHead >
                      <TableRow className={classes.recomTableRow}>
                        <TableCell className={classes.recomTableArrowCol} padding="checkbox">
                          <Checkbox
                              size="small"
                                color="primary"
                                // indeterminate={numSelected > 0 && numSelected < rowCount}
                                // checked={rowCount > 0 && numSelected === rowCount}
                                // onChange={onSelectAllClick}
                                // inputProps={{
                                //   "aria-label": "select all desserts"
                                // }}
                              />
                        </TableCell>
                        <TableCell align="left"><Typography variant="h6">Name</Typography></TableCell>
                        <TableCell className={classes.recomTableRatingCol} align="left"><Typography variant="h6">Type</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    </ThemeProvider>
                    <ThemeProvider theme={tableBodyTheme}>
                    <TableBody>
                      {dat.map((cid) => (
                        <TableRow id={cid.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              size="small"
                              color="primary"
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              // checked={rowCount > 0 && numSelected === rowCount}
                              // onChange={onSelectAllClick}
                              // inputProps={{
                              //   "aria-label": "select all desserts"
                              // }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="h6">
                              {cid.Name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="h6">
                              {cid.Type}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* {this.props.recom_entities.map((cid) => (
                        <TableRow id={cid} sx={{ '& > *': { borderBottom: 'unset' } }}>
                          <TableCell></TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="h6">
                              {this.props.recom_entities[cid].Name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="h6">
                              {this.props.recom_entities[cid].Type}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))} */}
                    </TableBody>
                    </ThemeProvider>
                  </Table>
              </TableContainer>
              {/* <List className={classes.searchList}>
                <DataGrid
                  headerHeight={40}
                  rowHeight={35}
                  rows={this.props.recom_entities}
                  columns={columns}
                  pageSize={50}
                  rowsPerPageOptions={[50]}
                  SwitchSelection
                  // onSelectionModelChange={this.props.add_selected_data}
                />
              </List> */}
            {/* </Grid> */}
          </Grid>
        </Paper>
      )
  }
}

export default RecommendPanel;