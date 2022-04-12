import React from 'react';
import {Paper, Divider,  Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {TextField, Typography} from '@material-ui/core';
import {Grid, List} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@mui/material/TableContainer';
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
    const columns = [
      { field: 'Name', headerName: 'Name', flex: 0.4 },
      { field: 'Type', headerName: 'Type', flex: 0.2 }
    ];
      return (
        <Paper className={classes.recomPaper}>
          <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
            <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
              Recommended Entities
            </Typography>
            <FormGroup row position='right'> 
            <FormControlLabel onChange={this.handleChange_doc} control={<Checkbox  defaultChecked />} label="Document" />
            <FormControlLabel onChange={this.handleChange_word} control={<Checkbox  defaultChecked />} label="Keyword" />
            <FormControlLabel onChange={this.handleChange_auth} control={<Checkbox defaultChecked />} label="Author" />
            </FormGroup>
            <Divider/>
            {/* <Grid container direction="row" className={classes.pairSearchGrid} spacing={0}> */}
              {/* <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                Source
              </Typography>
                <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                Target
              </Typography> */}
              <List className={classes.searchList}>
                <DataGrid
                  headerHeight={40}
                  rowHeight={35}
                  rows={this.props.recom_entities}
                  columns={columns}
                  pageSize={50}
                  rowsPerPageOptions={[50]}
                  checkboxSelection
                  // onSelectionModelChange={this.props.add_selected_data}
                />
              </List>
            {/* </Grid> */}
          </Grid>
        </Paper>
      )
  }
}

export default RecommendPanel;