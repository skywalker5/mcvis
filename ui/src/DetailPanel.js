import React from 'react';
import {Paper, Divider, Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import {TableContainer, TableHead} from '@material-ui/core';
import {Grid, Box} from '@material-ui/core';
import {Collapse, IconButton, Typography} from '@material-ui/core';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import { interpolateTurbo } from 'd3-scale-chromatic'
import {Star, StarBorder}  from '@mui/icons-material';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import api from './api';

class DetailPanel extends React.Component {

  onClick(event,d) {
    this.props.set_clicked_entity(event.currentTarget.id);
  }

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
    const qdata = [
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":1,"id":22451},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":2,"id":2241},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"Co-authors":["Rémi Douence","Jean-Marc Menaud","M. Südholt","Fabien Hermenier"],"Name":"Luis Daniel Benavides Navarro","Papers":[2327],"Top Keywords":["grid","invas","pattern","checkpoint","topolog","wellknown","na","hamper","legaci","instanti"],"Type":"Author","cid":11,"id":2955},
      {"Co-authors":["Jorge M. Santos","Chetak Kandaswamy","Joaquim Marques de Sá"],"Name":"Luís A. Alexandre","Papers":[11344],"Top Keywords":["deep","cost","finetun","supervis","reconstruct","layer","network","train","function","hidden"],"Type":"Author","cid":15,"id":2956},
      {"Name":"cmac","Synonyms":["lyapunov","chatter","servo","timedelay","control","tank","closedloop","pid","torqu","reactor"],"Type":"Word","cid":16,"id":39456},
      {"Name":"oil","Synonyms":["featur","select","cepstral","irrelev","abrupt","selector","roc","prerequisit","steel","mutual"],"Type":"Word","cid":6,"id":39478},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":3,"id":22451},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":12,"id":2241},
      {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on architecture","cid":13,"id":2245},

    ];
    function Row(props) {
      const { row, onClick } = props;
      const [open, setOpen] = React.useState(false);
      const [defaultval, setdefaultval] = React.useState(2.5);

      const handleChange_rate = (event, newRate) => {
        setdefaultval(newRate);
        axios.post(`${api}/ratechange/${row.id}`+","+`${newRate}`)
        .then(response => {
            console.log(1)
        });
        props.entity_clicked(1);
      };
      return (
        <React.Fragment>
          <TableRow id={"row"+row.id} sx={{ '& > *': { borderBottom: 'unset' } }} hover
          onClick={onClick} onMouseUp={onClick} onMouseDown={onClick}> 
            <TableCell className={classes.recomTableArrowCol} padding="checkbox">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={classes.recomTableIDCol} component="th" scope="row">
                <Typography variant="h6">
                  {row.id}
                </Typography>
            </TableCell>
            <TableCell className={classes.recomTableTypeCol} >
              <Typography variant="h6">
                {row.Type}
              </Typography>
            </TableCell>
            <TableCell className={classes.recomTableNameCol}><Typography variant="h6">{row.Name}</Typography></TableCell>
            <TableCell className={classes.recomTableClusterCol} >
              <Grid container direction="row" className={classes.grid}>
                <Typography noWrap variant="h6" className={classes.clusterCell}>
                  {row.cid}
                  <SquareRoundedIcon className={classes.sqIcon} sx={{ color: interpolateTurbo(row.cid/20.0) }}/>
                </Typography>
              </Grid>
            </TableCell>
            <TableCell className={classes.recomTableRatingCol} >
              <Rating icon={<Star sx={{ fontSize: 15, }} />}
                  emptyIcon={<StarBorder sx={{ fontSize: 15, }} />} name="rating" defaultValue= {2.5} precision={0.5} />
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
                      <TableCell rowSpan={3} className={classes.detailPholder} />
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
                        <TableCell rowSpan={3} className={classes.detailPholder} />
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
                        <TableCell rowSpan={3} className={classes.detailPholder} />
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
    const {classes} = this.props;

    // const aa = [
    //   {"Authors":["Benjamin C. Brodie","David E. Taylor","R Cytron"],"Cited":[],"Cited By":[],"Name":"A Scalable Architecture For High-Throughput Regular-Expression Pattern Matching","Top Keywords":["highthroughput","densiti","pattern","fpga","match","throughput","architectur","regular","asic","respond"],"Type":"Doc","Venue":"proceedings of the rd annual international symposium on computer architecture","cid":11,"id":22451},
    //   {"Authors":["Matthew Palensky","Hesham H. Ali"],"Cited":[],"Cited By":[],"Name":"A genetic algorithm for simplifying the amino acid alphabet in bioinformatics applications","Top Keywords":["alphabet","simplifi","amino","protein","acid","simplif","creat","predict","genet","sequenc"],"Type":"Doc","Venue":"aia' proceedings of the th iasted international conference on artificial intelligence and applications","cid":3,"id":22642},
    //   {"Authors":["Jamil Ahmad","Imran Shafi","S. I. Shah","Faisal M. Kashif"],"Cited":[],"Cited By":[],"Name":"Analysis & comparison of neural network training algorithms for the joint time-frequency analysis","Top Keywords":["train","signal","frequenc","neural","if","timefrequ","comparison","instantan","compon","network"],"Type":"Doc","Venue":"aia' proceedings of the th iasted international conference on artificial intelligence and applications","cid":15,"id":22671},
    //   {"Authors":["Bernard Girau","Khaled Ben Khalifa"],"Cited":[],"Cited By":[],"Name":"FPGA-targeted neural architecture for embedded alertness detection","Top Keywords":["mlp","neural","fpga","physician","connectionist","wear","alert","eeg","lowpow","simplif"],"Type":"Doc","Venue":"aia' proceedings of the th iasted international conference on artificial intelligence and applications","cid":15,"id":22672},
    //   {"Authors":["J. F. Dale Addison","John MacIntyre"],"Cited":[],"Cited By":[],"Name":"Two biologically plausible network architectures for the avoidance of catastrophic interference","Top Keywords":["catastroph","plausibl","interfer","biolog","pseudo","recurr","neural","architectur","author","network"],"Type":"Doc","Venue":"aia' proceedings of the th iasted international conference on artificial intelligence and applications","cid":15,"id":22674}
    // ]

    return (
      <Paper className={classes.detailPaper}>
        <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
          <ThemeProvider theme={titleTheme}>
          <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
            Object Details
          </Typography>
          </ThemeProvider>
          {/* <Divider/> */}
          <TableContainer component={Paper} className={classes.recomTableCont}>
            <Table className={classes.recomTable} stickyHeader>
              <ThemeProvider theme={tableHeadTheme}>
                <TableHead >
                  <TableRow className={classes.recomTableRow}>
                    <TableCell className={classes.recomTableArrowCol} padding="checkbox" ></TableCell>
                    <TableCell className={classes.recomTableIDCol} align="left"><Typography variant="h6">ID</Typography></TableCell>
                    <TableCell className={classes.recomTableTypeCol} align="left"><Typography variant="h6">Type</Typography></TableCell>
                    <TableCell className={classes.recomTableNameCol} align="left"><Typography variant="h6">Name</Typography></TableCell>
                    <TableCell className={classes.recomTableClusterCol} align="left"><Typography variant="h6">Cluster</Typography></TableCell>
                    <TableCell className={classes.recomTableRatingCol} align="left"><Typography variant="h6">Rating</Typography></TableCell>
                  </TableRow>
                </TableHead>
              </ThemeProvider>
              <ThemeProvider theme={tableBodyTheme}>
              <TableBody>
                {/* {Object.keys(this.props.query_data).map((index) => (
                  <Row key={index} row={this.props.query_data[index]} entity_clicked={this.props.entity_clicked}/>
                ))} */}
                {Object.keys(qdata).map((index) => (
                  <Row key={index} row={qdata[index]} entity_clicked={this.props.entity_clicked}/>
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

export default DetailPanel;