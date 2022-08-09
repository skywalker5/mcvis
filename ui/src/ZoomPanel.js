import React from 'react';
import {Paper, Divider} from '@material-ui/core';
import ZoomChart from './ZoomChart'
import {Grid,Chip} from '@material-ui/core';
import ScatterChart from './ScatterChart'
import Box from '@material-ui/core/Box';
import Stack from '@mui/material/Stack';
import {Typography} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AntSwitch from './AntSwitch';
import Slider from '@material-ui/core/Slider';
import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import api from './api';

class ZoomPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          author: true, 
            document: true, 
            keyword: true,
            gamma: 0.4,
         };
        // this.handleQuery.bind(this);
        // this.populate_candidate_query.bind(this);
    }
    handleChange_auth = (event, click) => {
      this.setState({
          author: !this.state.author
      });
      axios.post(`${api}/entitychange_zoom/auth_${this.state.author}`);
    };

    handleChange_doc = (event, click) => {
      this.setState({
          document: !this.state.document
      });
      axios.post(`${api}/entitychange_zoom/doc_${this.state.document}`);
    };

    handleChange_word = (event, click) => {
      this.setState({
          keyword: !this.state.keyword
      });
      axios.post(`${api}/entitychange_zoom/word_${this.state.keyword}`);
    };

    handleChangeSlider = (event, newValue) => {
      if (newValue != this.state.gamma){
        this.setState({
          gamma:newValue,
        });
        axios.post(`${api}/tsne_shrinkage_change/${newValue}`)
        .then(response => {
          this.props.set_zoom_dict(response.data);
        })
      }
    };

    render(){
        const { classes } = this.props;
    
        let titleTheme = createMuiTheme({
          typography: {
            h5: {
              fontFamily: [
                'Museo Sans Rounded',
              ].join(','),
              fontSize: 13,
              fontWeight: 600,
            },
            h6: {
              fontFamily: [
                'Museo Sans Rounded',
              ].join(','),
              fontSize: 13,
              fontWeight: 300,
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
        let tsneTheme = createMuiTheme({
          typography: {
            h6: {
              fontFamily: [
                'Museo Sans Rounded',
              ].join(','),
              fontSize: 11,
              fontWeight: 300,
            }
          },
        });
        return (
            <Paper className={classes.zoomPaper}>
                <Stack direction="column" spacing={0} className={classes.zoomStackOuter}>
                  <Stack direction="row" className={classes.zoomStack} spacing={0}>
                    <ThemeProvider theme={titleTheme}>
                      <Typography className={classes.zoomStackTypo} noWrap>
                        <Typography variant="h5" id="tableTitle" className={classes.zoomTitle1}>
                            {"Embedding Panel"}
                        </Typography>
                        <Typography variant="h6" id="tableTitle" className={classes.zoomTitle2}>
                            {"("}
                        </Typography>
                        <Typography variant="h5" id="tableTitle" className={classes.zoomTitle1}>
                            {this.props.doc_num}
                        </Typography>
                        <Typography variant="h6" id="tableTitle" className={classes.zoomTitle3}>
                            {"Documents"+", "}
                        </Typography>
                        <Typography variant="h5" id="tableTitle" className={classes.zoomTitle3}>
                            {this.props.word_num}
                        </Typography>
                        <Typography variant="h6" id="tableTitle" className={classes.zoomTitle3}>
                            {"Words, "}
                        </Typography>
                        <Typography variant="h5" id="tableTitle" className={classes.zoomTitle3}>
                            {this.props.auth_num}
                        </Typography>
                        <Typography variant="h6" id="tableTitle" className={classes.zoomTitle3}>
                            {"Authors)"}
                        </Typography>
                      </Typography>
                    </ThemeProvider>
                    <Stack direction="column" className={classes.zoomSliderStack} spacing={0}>
                      <ThemeProvider theme={tsneTheme}>
                      <Typography noWrap variant="h6" id="tableTitle" className={classes.zoomTsneTitle}>
                          {"T-SNE Shrinkage"}
                      </Typography>
                      </ThemeProvider>
                      <Stack direction="row" className={classes.zoomSliderInnerStack} spacing={0}>
                        <Box className={classes.zoomSliderBox}>
                          <Slider defaultValue={0.4} step={0.05} min={0} max={1} valueLabelDisplay="auto" onChange={this.handleChangeSlider}/>
                        </Box>
                        <ThemeProvider theme={tsneTheme}>
                          <Typography variant="h6" className={classes.zoomTitle1}>
                              {this.state.gamma}
                          </Typography>
                        </ThemeProvider>
                      </Stack>
                    </Stack>
                    {/* <Grid container direction="row" className={classes.zoomTsne}>
                        <Grid container direction="column" className={classes.zoomTsne}>
                        <ThemeProvider theme={tsneTheme}>
                        <Typography noWrap variant="h6" id="tableTitle" className={classes.zoomTitle1}>
                            {"T-SNE Shrinkage"}
                        </Typography>
                        </ThemeProvider>
                        <Grid container direction="row" className={classes.zoomSlider} noWrap>
                        <Slider defaultValue={0.7} step={0.05} min={0} max={1} valueLabelDisplay="auto" onChange={this.handleChange}/>
                          <ThemeProvider theme={tsneTheme}>
                            <Typography variant="h6" id="tableTitle" className={classes.zoomTitle1}>
                                {this.state.gamma}
                            </Typography>
                          </ThemeProvider>
                        </Grid>
                        </Grid>
                    </Grid> */}

                  </Stack>
                  {/* <Divider/> */}
                  <Stack direction="row" className={classes.zoomMiddleRowStack}>
                    <Stack direction="column" className={classes.zoomLegendStack}>
                      <FormGroup aria-label="position" row>
                      <Stack direction="column" className={classes.toggleStack}>
                          {this.state.document? 
                          <Chip color="primary" className={classes.objectChip2} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_doc} 
                              control={ <AntSwitch checked={this.state.document} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Document <CircleTwoToneIcon className={classes.circleIcon}/></Typography></ThemeProvider>} />
                          }/> :
                          <Chip className={classes.objectChip2Un} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_doc} 
                              control={ <AntSwitch checked={this.state.document} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Document <CircleTwoToneIcon className={classes.circleIcon}/></Typography></ThemeProvider>} />
                          }/>}
                          {this.state.keyword? 
                          <Chip color="primary" className={classes.objectChip2} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_word} 
                              control={ <AntSwitch checked={this.state.keyword} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Word <SquareTwoToneIcon className={classes.squareIcon}/></Typography></ThemeProvider>} />
                          }/> :
                          <Chip className={classes.objectChip2Un} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_word} 
                              control={ <AntSwitch checked={this.state.keyword} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Word <SquareTwoToneIcon className={classes.squareIcon}/></Typography></ThemeProvider>} />
                          }/>}
                          {this.state.author? 
                          <Chip color="primary" className={classes.objectChip2} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_auth} 
                              control={ <AntSwitch checked={this.state.author} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoTheme}><Typography variant="h6" className={classes.entityControlLabel}>Author <SquareTwoToneIcon className={classes.diaIcon}/></Typography></ThemeProvider>} />
                          }/> :
                          <Chip className={classes.objectChip2Un} label={
                            <FormControlLabel 
                              className={classes.formLabel} 
                              onChange={this.handleChange_auth} 
                              control={ <AntSwitch checked={this.state.author} inputProps={{ 'aria-label': 'ant design' }} />} 
                              label={<ThemeProvider theme={objectTypoThemeUn}><Typography variant="h6" className={classes.entityControlLabel}>Author <SquareTwoToneIcon className={classes.diaIcon}/></Typography></ThemeProvider>} />
                          }/>}
                      </Stack>
                      </FormGroup>
                      {/* <ThemeProvider theme={tsneTheme}>
                      <Typography noWrap variant="h6" className={classes.zoomLegend}>
                        <CircleTwoToneIcon className={classes.circleIcon}/>
                        {"Document"}
                        <SquareTwoToneIcon className={classes.squareIcon}/>
                        {"Word"}
                        <SquareTwoToneIcon className={classes.diaIcon} />
                        {"Author"}
                      </Typography>
                      </ThemeProvider> */}
                      <ScatterChart data={this.props.dpoints} 
                        inclusters = {this.props.inclusters}
                        outclusters = {this.props.outclusters}
                        cluster_list={this.props.cluster_list} click={this.props.click} mode={this.props.mode}
                        search_select_list={this.props.search_select_list}
                        current_clicked = {this.props.current_clicked}
                        x_min_max = {this.props.x_min_max}
                        y_min_max = {this.props.y_min_max}
                        className={classes.clusterChart} classes={classes}
                        region_selected = {this.props.region_selected}
                        set_scatter_size = {this.props.set_scatter_size}
                        scatter_width = {this.props.scatter_width}
                        scatter_height = {this.props.scatter_height}
                        set_select_box_size = {this.props.set_select_box_size}
                        select_box = {this.props.select_box}
                        to_vis_items = {this.props.to_vis_items}
                      />
                    </Stack>
                    <ZoomChart data={this.props.dpoints} cluster_list={this.props.cluster_list} click={this.props.click}
                        search_select_list={this.props.search_select_list}
                        current_clicked = {this.props.current_clicked}
                        className={classes.zoomChart} classes={classes}
                        zoom_cluster_list = {this.props.zoom_cluster_list}
                        zoom_in_clusters = {this.props.zoom_in_clusters}
                        set_zoom_size = {this.props.set_zoom_size}
                        zoom_width = {this.props.zoom_width}
                        zoom_height = {this.props.zoom_height} 
                        zoom_dict = {this.props.zoom_dict}
                        cluster_x_min_max = {this.props.cluster_x_min_max}
                        cluster_y_min_max = {this.props.cluster_y_min_max}
                        zoom_x_offset_end = {this.props.zoom_x_offset_end}
                        zoom_y_offset_end = {this.props.zoom_y_offset_end}
                        cluster_info = {this.props.cluster_info}
                        author = {this.state.author}
                        document = {this.state.document}
                        keyword = {this.state.keyword}
                    >
                    </ZoomChart>
                  </Stack>
                </Stack>
            </Paper>
        )
    }
}
export default ZoomPanel;