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
  handleSubmit(event) {
    event.preventDefault();
    const query_s = Object.keys(this.props.rating_list).map(
      (index) => (index+"-"+this.props.rating_list[index])
    ).join('_');
    const query_cs = Object.keys(this.props.cluster_rating_list).map(
      (index) => (index+"-"+this.props.cluster_rating_list[index])
    ).join('_');
    axios.get(`${api}/get_recom/${query_s},${query_cs}`)
    .then(response => {
      this.props.get_recom(response.data)
    })
  
  }

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

    function ClusterRow(props) {
      const { cid, rating } = props;
      return (
        <React.Fragment>
          <TableRow id={"row"+cid} sx={{ '& > *': { borderBottom: 'unset' } }} hover> 
            <TableCell className={classes.recomTableArrowCol}>
            </TableCell>
            <TableCell align="left" className={classes.recomTableIDCol} component="th" scope="row">
                <Typography variant="h6">
                  {cid}
                </Typography>
            </TableCell>
            <TableCell align="left" >
              <Typography variant="h6">
                {"Cluster"}
              </Typography>
            </TableCell>
            <TableCell className={classes.recomTableRatingCol} >
              <Rating icon={<Star sx={{ fontSize: 15, }} />}
                  emptyIcon={<StarBorder sx={{ fontSize: 15, }} />} name="rating" defaultValue= {rating} precision={0.5} />
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }

    function Row(props) {
      const { row, rating } = props;
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
                  emptyIcon={<StarBorder sx={{ fontSize: 15, }} />} name="rating" value= {rating} precision={0.5} />
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
              <form onSubmit={this.handleSubmit.bind(this)}>
              <Button className={classes.submitButton} type="submit" variant="contained" color = "primary">
                {/* <EnterOutline height="15px" color={'white'}/> */}
                <ExitToAppIcon className={classes.submitIcon}/>
                <Typography variant="h6">Submit</Typography>
              </Button>
              </form>
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
                {Object.keys(this.props.rating_list).map((index) => (
                  <Row key={index} row={this.props.query_dict[index]} rating={this.props.rating_list[index]}/>
                ))}
                {Object.keys(this.props.cluster_rating_list).map((index) => (
                  <ClusterRow cid={index} rating={this.props.cluster_rating_list[index]}/>
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