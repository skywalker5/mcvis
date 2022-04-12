import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ScatterChart from './ScatterChart'
import {Typography} from '@material-ui/core';
import {Divider} from '@material-ui/core';
import Button from '@material-ui/core/Button';


class EmbeddingPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data_points:null};
        
        this.buttonClicked1 = this.buttonClicked1.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
    }

    buttonClicked1(){
        this.props.click_scatter();
    }
    handleChange1 = (event) => {
        this.props.set_mode(event.target.value);
    };

    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.embeddingPaper}>
                <Grid container direction="column" spacing={0} className={classes.recomGridOuter}>
                    <Grid container direction="row" spacing={0}>
                        <Typography variant="h6" id="tableTitle" className={classes.panelTitle} noWrap>
                            Embedding Panel
                        </Typography>
                        {/* <Button className={classes.zoomButton} variant="contained" color = "primary" onClick={this.props.region_selected}>Zoom!</Button> */}
                        {/* <div className={classes.grow}/>
                        <FormControl sx={{ m: 1, width: 130, height:30 }}>
                        <InputLabel id="demo-simple-select-label">Color by</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.mode}
                            label="Age"
                            onChange={this.handleChange1}
                            sx={{height:35, fontSize:15}}
                        >
                            <MenuItem sx={{height:35, fontSize:15}} value={"cluster"}>Cluster</MenuItem>
                            <MenuItem sx={{height:35, fontSize:15}} value={"entity"}>Entity Type</MenuItem>
                        </Select>
                        </FormControl> */}
                    </Grid>
            <Divider/>
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
                    >
                    
                    </ScatterChart>
                </Grid>
            </Paper>
        )
    }
}


export default EmbeddingPanel;