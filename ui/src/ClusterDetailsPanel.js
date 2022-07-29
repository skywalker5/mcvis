import React from 'react';
import {Paper, Divider, Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {Grid, List, Box, Chip} from '@material-ui/core';
import {Collapse, IconButton, Typography} from '@material-ui/core';
import axios from 'axios';
import api from './api';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Rating from "@mui/material/Rating";
import { interpolateTurbo } from 'd3-scale-chromatic'
import {Star, StarBorder}  from '@mui/icons-material';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TableContainer from '@mui/material/TableContainer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';




class ClusterDetailsPanel extends React.Component {
  constructor(props){
      super(props)
      this.state = { author: true, 
        document: true, 
        keyword: true
     };
  }
  

  CreateData(
    cluster_name,
    total_entity_num,
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
          lineHeight:1.2,
        }
      },
    });
    let tableBodyTheme = createMuiTheme({
      overrides: {
          MuiTableCell: {
              root: {  //This can be referred from Material UI API documentation. 
                  paddingTop: 2,
                  paddingBottom: 2,
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
        },
        h5: {
          fontFamily: [
            'Museo Sans Rounded',
          ].join(','),
          fontSize: 12,
          fontWeight: 600,
          lineHeight:1.2,
        }
      },
    });
    function Row(props) {
      const { cid, data,rate } = props;
      const [open, setOpen] = React.useState(false);
      // const [rate, setRate] = React.useState(2.5);
      
      const handleChange_rate = (event, newRate) => {
        // setRate(newRate);
        props.set_cluster_rating_list({[cid]: newRate});
        // axios.post(`${api}/ratechange_cluster/${cid}`+","+`${newRate}`);
      };
      return (
        <React.Fragment>
          <TableRow id={cid} sx={{ '& > *': { borderBottom: 'unset' } }}> 
            <TableCell className={classes.recomTableArrowCol} padding="checkbox">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="left" component="th" scope="row">
              <Typography variant="h6">
                {data["Keywords"].join(", ")}
              </Typography>
            </TableCell>
            <TableCell className={classes.detailTableCluCol} align="left">
            <Grid container direction="row" className={classes.grid}>
              <Typography noWrap variant="h6" className={classes.clusterCell}>
                {cid}
                <SquareRoundedIcon className={classes.sqIcon} sx={{ color: interpolateTurbo(cid/20.0) }}/>
              </Typography>
            </Grid>
            </TableCell>
            <TableCell className={classes.recomTableRatingCol} >
            <Rating icon={<Star sx={{ fontSize: 15, }} />}
                  emptyIcon={<StarBorder sx={{ fontSize: 15, }} />} name="rating" value= {rate} onChange={handleChange_rate} precision={0.5} />
              {/* <Rating name="rating" defaultValue= {2.5} precision={0.5} />  */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell rowSpan={data["Top Objects"].length+2} className={classes.cDetailPholder} />
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5">Top Objects</Typography></TableCell>
                        <TableCell className={classes.detailTableTypeCol} align="left"><Typography variant="h5">Type</Typography></TableCell>
                      </TableRow>
                      {data["Top Objects"].map((ob) => (
                        <TableRow>
                          <TableCell><Typography variant="h6">{ob[0]}</Typography></TableCell>
                          <TableCell className={classes.detailTableTypeCol} align="left"><Typography variant="h6">{ob[1]}</Typography></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }


    const {classes} = this.props;
    
      return (
        <Paper className={classes.historyPaper}>
          <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
            <ThemeProvider theme={titleTheme}>
              <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                Cluster Details
              </Typography>
            </ThemeProvider>
            <TableContainer component={Paper} className={classes.recomTable}>
                <Table stickyHeader>
                  <ThemeProvider theme={tableHeadTheme}>
                  <TableHead >
                    <TableRow className={classes.recomTableRow}>
                      <TableCell padding="checkbox" className={classes.recomTableArrowCol} />
                      <TableCell align="left"><Typography variant="h6">Keywords</Typography></TableCell>
                      <TableCell className={classes.detailTableCluCol} align="left"><Typography variant="h6">Cluster</Typography></TableCell>
                      <TableCell className={classes.recomTableRatingCol} align="left"><Typography variant="h6">Rating</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  </ThemeProvider>
                  <ThemeProvider theme={tableBodyTheme}>
                  <TableBody>
                    {/* {cluster_ids.map((cid) => (
                      <Row
                        cid={cid} 
                        data={this.props.data}
                        zoom_in_clusters={this.props.zoom_in_clusters}
                        zoom_dict = {this.props.zoom_dict}
                      />
                    ))} */}
                    {this.props.cluster_info.map((cd) => (
                      <Row
                        cid={cd.cid} 
                        data={cd}
                        set_cluster_rating_list={this.props.set_cluster_rating_list}
                        rate={(this.props.cluster_rating_list[cd.cid]==undefined)? 2.5:this.props.cluster_rating_list[cd.cid]}
                      />
                    ))}
                  </TableBody>
                  </ThemeProvider>
                </Table>
            </TableContainer>
          </Grid>
        </Paper>
      )
  }
}

export default ClusterDetailsPanel;