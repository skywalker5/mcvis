import React from 'react';
import {Paper, Divider,  Table, TableBody, TableCell, TableRow,TableHead} from '@material-ui/core';
import {Grid, Box} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import {Collapse, IconButton, Typography} from '@material-ui/core';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from '@material-ui/core/Button';
import TableContainer from '@mui/material/TableContainer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import {Star, StarBorder}  from '@mui/icons-material';
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
    
    const columns = [
      { field: 'Name', headerName: 'Name', flex: 0.4 },
      { field: 'Type', headerName: 'Type', flex: 0.2 }
    ];
    const qdata = [
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":1,"id":22451},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":2,"id":2241},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"rating":4,"Co-authors":["Rémi Douence","Jean-Marc Menaud","M. Südholt","Fabien Hermenier"],"Name":"Luis Daniel Benavides Navarro","Papers":[2327],"Top Keywords":["grid","invas","pattern","checkpoint","topolog","wellknown","na","hamper","legaci","instanti"],"Type":"Author","cid":11,"id":2955},
      {"rating":4,"Co-authors":["Jorge M. Santos","Chetak Kandaswamy","Joaquim Marques de Sá"],"Name":"Luís A. Alexandre","Papers":[11344],"Top Keywords":["deep","cost","finetun","supervis","reconstruct","layer","network","train","function","hidden"],"Type":"Author","cid":15,"id":2956},
      {"rating":4,"Name":"cmac","Synonyms":["lyapunov","chatter","servo","timedelay","control","tank","closedloop","pid","torqu","reactor"],"Type":"Word","cid":16,"id":39456},
      {"rating":4,"Name":"oil","Synonyms":["featur","select","cepstral","irrelev","abrupt","selector","roc","prerequisit","steel","mutual"],"Type":"Word","cid":6,"id":39478},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":3,"id":22451},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"rating":4,"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},

    ];

    function Row(props) {
      const { row } = props;
      const [open, setOpen] = React.useState(false);
      return (
        <React.Fragment>
          <TableRow id={"row"+row.id} sx={{ '& > *': { borderBottom: 'unset' } }} hover> 
            <TableCell className={classes.recomTableArrowCol} padding="checkbox">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align="left" className={classes.recomTableIDCol} component="th" scope="row">
                <Typography variant="h6">
                  {row.id}
                </Typography>
            </TableCell>
            <TableCell align="left" >
              <Typography variant="h6">
                {row.Type}
              </Typography>
            </TableCell>
            <TableCell className={classes.recomTableRatingCol} >
              <Rating icon={<Star sx={{ fontSize: 15, }} />}
                  emptyIcon={<StarBorder sx={{ fontSize: 15, }} />} name="rating" defaultValue= {row.rating} precision={0.5} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                  {/* <Typography variant="h6" gutterBottom component="div">
                    Entity Details
                  </Typography> */}
                  {row.Type === "Doc" ?
                  (<Table>
                    <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3} className={classes.cDetailPholder} />
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h5">Authors</Typography></TableCell>
                      <TableCell><Typography variant="h5">Venue</Typography></TableCell>
                      <TableCell><Typography variant="h5">Top Keywords</Typography></TableCell>
                      {/* <TableCell>Cited</TableCell>
                      <TableCell>Cited By</TableCell>
                      <TableCell>Rating</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h6">{row.Authors.join(", ")}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{row.Venue}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{row['Top Keywords'].join(", ")}</Typography></TableCell>
                    </TableRow>
                    {/* <TableCell>{row['Cited'].join(", ")}</TableCell>
                    <TableCell>{row['Cited By'].join(", ")}</TableCell>
                    <TableCell>
                      <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                    </TableCell> */}
                    </TableBody>
                  </Table>):(row.Type === "Word" ? (<Table>
                    <TableBody>
                      <TableRow>
                        <TableCell rowSpan={3} className={classes.cDetailPholder} />
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h5">Synonyms</Typography></TableCell>
                        {/* <TableCell>Rating</TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell><Typography variant="h6">{row["Synonyms"].join(", ")}</Typography></TableCell>
                      </TableRow>
                      {/* <TableCell>
                        <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                      </TableCell> */}
                    </TableBody>
                  </Table>): (<Table>
                    <TableBody>
                      <TableRow>
                        <TableCell rowSpan={3} className={classes.cDetailPholder} />
                      </TableRow>
                    <TableRow>
                      <TableCell className={classes.detailPaperCol}><Typography variant="h5">Papers</Typography></TableCell>
                      <TableCell><Typography variant="h5">Co-authors</Typography></TableCell>
                      <TableCell><Typography variant="h5">Top Keywords</Typography></TableCell>
                      {/* <TableCell>Rating</TableCell> */}
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.detailPaperCol}><Typography variant="h6">{row["Papers"].join(", ")}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{row["Co-authors"].join(", ")}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{row["Top Keywords"].join(", ")}</Typography></TableCell>
                    </TableRow>
                    {/* <TableCell>
                      <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                    </TableCell> */}
                    </TableBody>
                  </Table>))}
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }
    Row.propTypes = {
      row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        Type: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Description:  PropTypes.string.isRequired
      }).isRequired
    };



    return (
      <Paper className={classes.ratePaper}>
        <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
          <Stack direction="row" className={classes.zoomStack} spacing={0}>
            <ThemeProvider theme={titleTheme}>
            <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
              Ratings
            </Typography>
            </ThemeProvider>
            <ThemeProvider theme={rateTypoTheme}>
              <Button className={classes.submitButton} type="submit" variant="contained" color = "primary">
                {/* <EnterOutline height="15px" color={'white'}/> */}
                <ExitToAppIcon className={classes.submitIcon}/>
                <Typography variant="h6">Submit</Typography>
              </Button>
            </ThemeProvider>
          </Stack>
          {/* <Grid container direction="row" className={classes.zoomGrid} spacing={0}>
            <Grid container direction="row" className={classes.rateStack}>
              <div className={classes.grow}/>
            </Grid>
          </Grid> */}
          {/* <Divider/> */}
          <TableContainer component={Paper} className={classes.recomTable}>
            <Table stickyHeader>
              <ThemeProvider theme={tableHeadTheme}>
              <TableHead >
                <TableRow className={classes.recomTableRow}>
                  <TableCell padding="checkbox" className={classes.recomTableArrowCol} />
                  <TableCell className={classes.detailTableIDCol} align="left"><Typography variant="h6">ID</Typography></TableCell>
                  <TableCell align="left"><Typography variant="h6">Type</Typography></TableCell>
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
                {Object.keys(qdata).map((index) => (
                  <Row key={index} row={qdata[index]}/>
                ))}
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