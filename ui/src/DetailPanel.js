import React from 'react';
import {Paper, Divider, Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import {TableContainer, TableHead} from '@material-ui/core';
import {Grid, List, Box} from '@material-ui/core';
import {Collapse, IconButton, Typography} from '@material-ui/core';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import axios from 'axios';
import api from './api';

class DetailPanel extends React.Component {

  onClick(event,d) {
    this.props.set_clicked_entity(event.currentTarget.id);
  }

  render(){
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
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell>{row.Type}</TableCell>
            <TableCell>{row.Name}</TableCell>
            <TableCell>{row.cid}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  {/* <Typography variant="h6" gutterBottom component="div">
                    Entity Details
                  </Typography> */}
                  {row.Type === "Doc" ?
                  (<Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Authors</TableCell>
                        <TableCell>Venue</TableCell>
                        <TableCell>Top Keywords</TableCell>
                        <TableCell>Cited</TableCell>
                        <TableCell>Cited By</TableCell>
                        <TableCell>Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableCell>{row.Authors.join(", ")}</TableCell>
                    <TableCell>{row.Venue}</TableCell>
                    <TableCell>{row['Top Keywords'].join(", ")}</TableCell>
                    <TableCell>{row['Cited'].join(", ")}</TableCell>
                    <TableCell>{row['Cited By'].join(", ")}</TableCell>
                    <TableCell>
                      <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                      {/* <Rating name="rating" defaultValue= {2.5} precision={0.5} />  */}
                    </TableCell>
                    </TableBody>
                  </Table>):(row.Type === "Word" ? (<Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Synonyms</TableCell>
                        <TableCell>Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableCell>{row["Synonyms"].join(", ")}</TableCell>
                    <TableCell>
                      <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                      {/* <Rating name="rating" defaultValue= {2.5} precision={0.5} />  */}
                    </TableCell>
                    </TableBody>
                  </Table>): (<Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Papers</TableCell>
                        <TableCell>Co-authors</TableCell>
                        <TableCell>Top Keywords</TableCell>
                        <TableCell>Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableCell>{row["Papers"].join(", ")}</TableCell>
                    <TableCell>{row["Co-authors"].join(", ")}</TableCell>
                    <TableCell>{row["Top Keywords"].join(", ")}</TableCell>
                    <TableCell>
                      <Rating name="rating" defaultValue= {defaultval} onChange={handleChange_rate} precision={0.5} />
                      {/* <Rating name="rating" defaultValue= {2.5} precision={0.5} />  */}
                    </TableCell>
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
    return (
      <Paper className={classes.detailPaper}>
        <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
          <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
            Object Details
          </Typography>
          <Divider/>
          <TableContainer component={Paper} className={classes.recomTable}>
            <Table size="small">
              <TableHead >
                <TableRow className={classes.recomTableRow}>
                  <TableCell ></TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Cluster</TableCell>
                  <TableCell align="left">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.props.query_data).map((index) => (
                  <Row key={index} row={this.props.query_data[index]} entity_clicked={this.props.entity_clicked}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    )
  }
}

export default DetailPanel;