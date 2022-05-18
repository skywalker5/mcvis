import React from 'react';
import {Paper, Divider} from '@material-ui/core';
import ZoomChart from './ZoomChart'
import {Grid,Chip} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AntSwitch from './AntSwitch';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import api from './api';

class ZoomPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: true, 
            document: true, 
            keyword: true
         };
        // this.handleQuery.bind(this);
        // this.populate_candidate_query.bind(this);
    }


    handleChange_auth = (event, click) => {
        this.setState({
            author: !this.state.author
        });
        axios.post(`${api}/entitychange_zoom/auth_${this.state.author}`)
        .then(response => {
            console.log(1)
        });
      };

      handleChange_doc = (event, click) => {
        this.setState({
            document: !this.state.document
        });
        axios.post(`${api}/entitychange_zoom/doc_${this.state.document}`)
        .then(response => {
            console.log(2)
        });
      };

      handleChange_word = (event, click) => {
        this.setState({
            keyword: !this.state.keyword
        });
        axios.post(`${api}/entitychange_zoom/word_${this.state.keyword}`)
        .then(response => {
            console.log(3)
        });
      };

    handleChangeSlider = (event, newValue) => {
        
    };

    render(){
        const { classes } = this.props;
    
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
        return (
            <Paper className={classes.zoomPaper}>
                <Grid direction="column" spacing={0} className={classes.recomGridOuter}>
                    <Grid container direction="row" className={classes.searchGrid} spacing={0}>
                        <ThemeProvider theme={titleTheme}>
                        <Typography variant="h6" id="tableTitle" className={classes.panelTitle}>
            {"Zoom Panel (" +this.props.doc_num+" Documents, "+this.props.word_num + " Words, "+this.props.auth_num + " Authors)"}
                        </Typography>
                        </ThemeProvider>
                        <div className={classes.grow}/>
                        <Slider aria-label="Volume" value={30} onChange={this.handleChangeSlider} />
                        <FormGroup row position='right'> 
                            <Chip label={
                            <FormControlLabel onChange={this.handleChange_doc} control={ <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<Typography variant="h7" className={classes.entityControlLabel}>Document</Typography>} />
                            }/>
                            <Chip label={
                            <FormControlLabel onChange={this.handleChange_word} control={<AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<Typography variant="h7" className={classes.entityControlLabel}>Word</Typography>} />
                            }/>
                            <Chip label={
                            <FormControlLabel onChange={this.handleChange_auth} control={<AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />} label={<Typography variant="h7" className={classes.entityControlLabel}>Author</Typography>} />
                            }/>
                        </FormGroup>
                    </Grid>

                    <Divider/>
                    <ZoomChart data={this.props.dpoints} cluster_list={this.props.cluster_list} click={this.props.click}
                        search_select_list={this.props.search_select_list}
                        current_clicked = {this.props.current_clicked}
                        className={classes.clusterChart} classes={classes}
                        zoom_cluster_list = {this.props.zoom_cluster_list}
                        zoom_in_clusters = {this.props.zoom_in_clusters}
                        set_zoom_size = {this.props.set_zoom_size}
                        zoom_width = {this.props.zoom_width}
                        zoom_height = {this.props.zoom_height} 
                        zoom_dict = {this.props.zoom_dict}
                        cluster_x_min_max = {this.props.cluster_x_min_max}
                        cluster_y_min_max = {this.props.cluster_y_min_max}
                        entity_clicked = {this.props.entity_clicked}
                        zoom_x_offset_end = {this.props.zoom_x_offset_end}
                        zoom_y_offset_end = {this.props.zoom_y_offset_end}
                        author = {this.state.author}
                        document = {this.state.document}
                        keyword = {this.state.keyword}
                    >
                    </ZoomChart>
                </Grid>
            </Paper>
        )
    }
}
export default ZoomPanel;