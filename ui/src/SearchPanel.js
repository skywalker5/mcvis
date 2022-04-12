import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import api from './api';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@material-ui/core/Slider';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';
import {TableContainer, TableHead} from '@material-ui/core';


class SearchPanel extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          selected_entities:[],
          query_candidates:[],
          year_selected:[2010,2016],
          queryNum: "",
          author: true, 
          document: true, 
          keyword: true,
          query_str: "",
          entityNum: ""
       };
      this.queryTexts = [];
      // this.handleQuery.bind(this);
      // this.populate_candidate_query.bind(this);
  }

  handleChange_auth = (event, click) => {
    this.setState({
        author: !this.state.author
    });
    axios.post(`${api}/entitychange_search/auth_${this.state.author}`)
    .then(response => {
        console.log(7)
    });
  };

  handleChange_doc = (event, click) => {
    this.setState({
        document: !this.state.document
    });
    axios.post(`${api}/entitychange_search/doc_${this.state.document}`)
    .then(response => {
        console.log(8)
    });
  };

  handleChange_word = (event, click) => {
    this.setState({
        keyword: !this.state.keyword
    });
    axios.post(`${api}/entitychange_search/word_${this.state.keyword}`)
    .then(response => {
        console.log(9)
    });
  };
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.query_str === undefined || this.state.query_str ==="") return;
    axios.get(`${api}/text/${this.state.query_str}`)
    .then(response => {
      this.props.set_query_data(response.data)
      // this.state.query_data = response.data;
    })
  
  }
  handleQuery(event,val) {
    // this.queryTexts = val.map(({word}) => (word));
    this.queryTexts = val;
    if (val.length === 0){
      axios.post(`${api}/query_keywords/_`)
      .then(response => {
        this.setState({ query_candidates: response.data,
        });
      })
    }
    else{
      axios.post(`${api}/query_keywords/${val.join(",")}`)
      .then(response => {
        this.setState({ query_candidates: response.data,
        });
      })
    }
  }

  handleNumber(event,newNum) {
    this.setState({
      queryNum:newNum,
    });
    axios.post(`${api}/get_entitynum/${newNum}`)
    .then(response => {
      this.setState({ entityNum: response.data,
      });
    })

  };


  handleChange = (event, newValue) => {
    this.setState({
      year_selected:newValue,
    });
    axios.post(`${api}/sliderchange/${newValue[0]}`+","+`${newValue[1]}`);

  };

  handleRadioChange = (event) => {
    this.setState({
      query_str:event.target.value
    })
  };

  
  render(){
    const { classes } = this.props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const columns = [
      { field: 'id', headerName: 'ID', minWidth: 30 },
      { field: 'Name', headerName: 'Name', minWidth: 120, flex: 0.4},
      { field: 'Type', headerName: 'Type', minWidth: 110 },
      { field: 'Description', headerName: 'Description', minWidth: 130, flex: 0.6, sortable: false }
    ];
    const marks_arr = new Array();
    for (let i = 0; i <= this.props.year_values[1]-this.props.year_values[0]; i++) {
        marks_arr[i] = {value:this.props.year_values[0]+i,
          label:this.props.year_values[0]+i};
    }


      return (
        <Paper className={classes.searchPaper}>
          <form className={classes.searchPaper}  noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
            <Grid direction="column" spacing={0} className={classes.searchGridOuter}>
              <Grid item >
                <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
                  Entity Search
                </Typography>
              </Grid>
              <Divider/>
              <Grid item spacing={0}>
                <Grid container direction="row" className={classes.searchGrid} spacing={0}>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={this.props.auto_list}
                    className={classes.autoCom}
                    size="small"
                    freeSolo
                    // getOptionLabel={(option) => option.word}
                    onChange={ (e,v)=>this.handleQuery(e,v)}
                    renderInput={(params) => (
                      <TextField
                        autoFocus
                        {...params}
                        id="outlined-basic"
                        variant="standard"
                        label= "Search Entities"
                        placeholder="Search"
                        className={classes.searchTextField}
                      />

                    )}
                  />
                  <TextField className={classes.entityNum} label="Entity #" variant="outlined" size="small" defaultValue="500"/>
                </Grid>
              </Grid>
              <Divider/>
              <Grid item spacing={0}>
                <Typography variant="h8" id="tableTitle" className={classes.entityType}>
                  Entity Type
                </Typography>
                <FormGroup aria-label="position" row>
                  <Grid container direction="row" className={classes.grid} justify={'center'}>
                    <FormControlLabel onChange={this.handleChange_doc} control={<Checkbox size="small" defaultChecked />} label={<Typography variant="h7" className={classes.entityControlLabel}>Document</Typography>} />
                    <FormControlLabel onChange={this.handleChange_word} control={<Checkbox size="small" defaultChecked />} label={<Typography variant="h7" className={classes.entityControlLabel}>Keyword</Typography>} />
                    <FormControlLabel onChange={this.handleChange_auth} control={<Checkbox size="small" defaultChecked/>} label={<Typography variant="h7" className={classes.entityControlLabel}>Author</Typography>} />
                  </Grid>
                </FormGroup>
              </Grid>
              <Divider/>
              <Typography variant="h8" id="tableTitle" className={classes.entityType}>
                Year Range
              </Typography>
              <Grid item spacing={0}>
                <Box className={classes.sliderBox}>
                <Slider
                  className={classes.slider}
                  value={this.state.year_selected}
                  onChange={this.handleChange}
                  valueLabelDisplay="auto"
                  step={1}
                  min={this.props.year_values[0]}
                  max={this.props.year_values[1]}
                  marks={marks_arr}
                />
                </Box>
              </Grid>
              <Divider/>
              <Paper className={classes.queryPaper}>
                <FormControl>
                  <Typography variant="h8" id="tableTitle" className={classes.entityType}>
                    Queries
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={this.handleRadioChange}
                  >
                    {this.state.query_candidates.map((s) => (
                      <FormControlLabel value={s} control={<Radio size="small"/>} label={<Typography variant="h7" className={classes.queryControlLabel}>{s}</Typography>} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
              <Button className={classes.searchButton} type="submit" variant="contained" color = "primary">search<SearchIcon className={classes.ssIcon}/></Button>
            </Grid>
          </form>
        </Paper>
      )
  }
}

export default SearchPanel;