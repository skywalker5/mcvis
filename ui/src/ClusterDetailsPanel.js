import React from 'react';
import {Paper, Divider, Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {Grid, List, Box, Chip} from '@material-ui/core';
import {Collapse, IconButton, Typography} from '@material-ui/core';
import axios from 'axios';
import api from './api';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




class ClusterDetailsPanel extends React.Component {
  constructor(props){
      super(props)
      this.state = { author: true, 
        document: true, 
        keyword: true
     };
  }
  

  CreateData(
    cluster_name: string,
    total_entity_num: number,
  ) {
    return {
      cluster_name,
      total_entity_num,
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


  handleDelete = (key) => () => {
    this.props.delete_select_state(key);
  };
  handleClick = (key) => () => {
    this.props.change_select_state(key);
  };


  render(){
    function Row(props) {
      const { cid, data, zoom_in_clusters, zoom_dict } = props;
      const [open, setOpen] = React.useState(false);
      const top_10_entities = [
        
      ];
      return (
        <React.Fragment>
          <TableRow id={cid} sx={{ '& > *': { borderBottom: 'unset' } }}> 
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="right" component="th" scope="row">
              {cid}
            </TableCell>
            <TableCell align="right">{Object.keys(zoom_dict).filter((index) => (
              zoom_dict[index].cid === cid
            )
            ).length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Top 10 Entities
                  </Typography>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }


    const cluster_ids = [
      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
    ];

    const {classes} = this.props;
    
      return (
        <Paper className={classes.historyPaper}>
          <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
            <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
              Cluster Details
            </Typography>
            <FormGroup row position='right'> 
            <FormControlLabel onChange={this.handleChange_doc} control={<Checkbox defaultChecked />} label="Document" />
            <FormControlLabel onChange={this.handleChange_word} control={<Checkbox defaultChecked />} label="Keyword" />
            <FormControlLabel onChange={this.handleChange_auth} control={<Checkbox defaultChecked />} label="Author" />
            </FormGroup>
            
            <Divider/>
              
              <TableContainer component={Paper} className={classes.recomTable}>
                <Table size="small">
                  <TableHead >
                    <TableRow className={classes.recomTableRow}>
                      <TableCell />
                      <TableCell align="right">Cluster ID</TableCell>
                      <TableCell align="right">Entities #</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cluster_ids.map((cid) => (
                      <Row
                        cid={cid} 
                        data={this.props.data}
                        zoom_in_clusters={this.props.zoom_in_clusters}
                        zoom_dict = {this.props.zoom_dict}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
        </Paper>
      )
  }
}

export default ClusterDetailsPanel;