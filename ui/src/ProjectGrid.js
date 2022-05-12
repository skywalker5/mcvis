import React, { useState } from 'react';

// material UI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// sub components
import SearchPanel from './SearchPanel'
import RecommendPanel from './RecommendPanel'
import RatedPanel from './RatedPanel'
import DetailPanel from './DetailPanel'
import ClusterDetailsPanel from './ClusterDetailsPanel'
import EmbeddingPanel from './EmbeddingPanel'
import ZoomPanel from './ZoomPanel'
import axios from "axios";
import api from "./api";

import useStyles from "./StyleOptions";


class ProjectGrid extends React.Component {
    constructor(props){
        super(props)
        this.state = {query_data:[], data_points:[],
            in_clusters:{},
            out_clusters:{},
            to_vis_items:{},
            auto_list:[],
            search_select_list:[], current_clicked:null,
            cluster_list:[],
            selected_history:{},
            x_min_max:[0,0],y_min_max:[0,0],
            cluster_x_min_max:[0,0],cluster_y_min_max:[0,0],
            mode:"all",
            zoom_cluster_list:{},
            zoom_in_clusters:{},
            scatter_width:0,
            scatter_height:0,
            zoom_width:0,
            zoom_height:0,
            recom_entities:[],
            select_box:[],
            zoom_x_offset_end:[],
            zoom_y_offset_end:[],
            zoom_dict:{},
            year_values:[2009,2018],
            doc_num:0,
            word_num:0,
            auth_num:0,
        };
        this.click_scatter = this.click_scatter.bind(this)
        this.get_auto_list = this.get_auto_list.bind(this)
        this.add_selected_data = this.add_selected_data.bind(this)
        this.click = this.click.bind(this)
        this.set_mode = this.set_mode.bind(this)
        this.set_clicked_entity = this.set_clicked_entity.bind(this);
        this.region_selected = this.region_selected.bind(this);
        this.set_scatter_size = this.set_scatter_size.bind(this);
        this.set_zoom_size = this.set_zoom_size.bind(this);
        this.change_select_state = this.change_select_state.bind(this);
        this.delete_select_state = this.delete_select_state.bind(this);
        this.entity_clicked = this.entity_clicked.bind(this);
        this.set_select_box_size = this.set_select_box_size.bind(this);
        this.set_query_data = this.set_query_data.bind(this);
    }
    set_select_box_size(select_box){
        this.setState({
            select_box:select_box
        });
    }
    change_select_state(key){
        let tmp = this.state.selected_history;
        tmp[key]['selected'] = !tmp[key]['selected']
        this.setState({
            selected_history:tmp
        });
    }
    delete_select_state(key){
        let dlt = this.state.selected_history;
        delete dlt[key]
        this.setState({
            selected_history:dlt
        });
    }
    set_scatter_size(w, h) {
        axios.post(`${api}/setsizescatter/${w}`+","+`${h}`);
        this.setState({
            scatter_width: w,
            scatter_height: h,
        });
    }
    
    set_zoom_size(w, h) {
        axios.post(`${api}/setsizezoom/${w}`+","+`${h}`);
        this.setState({
            zoom_width: w,
            zoom_height: h,
        })
    }

    region_selected() {
        if (this.state.mode == "cluster"){

            let xmin = parseInt(this.state.select_box[0].x * this.state.scatter_width / 100.0);
            let xmax = parseInt((this.state.select_box[0].x + this.state.select_box[0].width) * this.state.scatter_width / 100.0);
            let ymin = parseInt(this.state.select_box[0].y * this.state.scatter_height / 100.0);
            let ymax = parseInt((this.state.select_box[0].y + this.state.select_box[0].height) * this.state.scatter_height / 100.0);
            
            axios.post(`${api}/getzoom/${xmin}`+","+`${xmax}`+","+`${ymin}`+","+`${ymax}`)
            .then(response => {
                this.setState({
                    zoom_cluster_list:response.data[0],
                    zoom_in_clusters:response.data[1],
                    query_data:response.data[2],
                    cluster_x_min_max:response.data[3],
                    cluster_y_min_max:response.data[4],
                    zoom_x_offset_end:response.data[5],
                    zoom_y_offset_end:response.data[6],
                });
            });
        }
    }
    set_query_data(query_data){
        let doc_num = query_data[0].filter(function(element){
            return element.Type == 'Doc';
        }).length;
        let word_num = query_data[0].filter(function(element){
            return element.Type == 'Word';
        }).length;
        let auth_num = query_data[0].filter(function(element){
            return element.Type == 'Author';
        }).length;
        this.setState({
            query_data:query_data[0],
            data_points:query_data[1],
            in_clusters:query_data[2],
            out_clusters:query_data[3],
            to_vis_items:query_data[4],
            zoom_in_clusters:query_data[5],
            zoom_width: query_data[6],
            zoom_height: query_data[7],
            cluster_x_min_max:query_data[8],
            cluster_y_min_max:query_data[9],
            zoom_dict:query_data[10],
            doc_num:doc_num,
            word_num:word_num,
            auth_num:auth_num,
        })
    }

    entity_clicked(d) {
        axios.post(`${api}/getrecom/${d}`)
        .then(response => {
            this.setState({
                recom_entities:response.data[0],
            });
        });
    }
    set_mode(mode_){
        this.setState({mode:mode_})
    }
    click_scatter(){
        axios.get(`${api}/scatter`)
        .then(response => {
         this.setState({
            data_points:response.data[0],
            in_clusters:response.data[1],
            out_clusters:response.data[2],
            to_vis_items:response.data[3],
            x_min_max:response.data[4],
            y_min_max:response.data[5],
            year_values:response.data[6]
        });
        })
    };
    
    get_auto_list(){
        axios.get(`${api}/autolist`)
        .then(response => {
            this.setState({auto_list:response.data});
        })
    };
    
    add_selected_data(selected_list){
        this.setState({search_select_list:selected_list});
        for (let i=0 ; i<selected_list.length ; i++){
            axios.post(`${api}/filter/${selected_list[i]}`);
        }
        axios.get(`${api}/getcluster`)
        .then(response => {
            this.setState({cluster_list:response.data[0],
                in_clusters:response.data[1],
                out_clusters:response.data[2],
                selected_history:response.data[3],
                mode:"cluster",
            });
        })
    }
    click(dindex){
        return () => {
            axios.get(`${api}/recom/${dindex}`)
            .then(response => {
                this.setState({query_data:response.data});
            });
        };
    };
    set_clicked_entity(clicked_entities){
        this.setState({current_clicked: clicked_entities});
    };

    componentDidMount() {
        this.click_scatter();
        // this.get_auto_list();
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.content}>
                <Grid container direction="row" className={classes.grid} justify={'center'}>
                    <Grid container item lg={3} direction={'column'} justify={'flex-start'} alignItems={'stretch'} wrap="nowrap" className={classes.grid}>
                        <Grid item>
                            <SearchPanel classes={classes} 
                            add_selected_data = {this.add_selected_data} auto_list={this.state.auto_list}
                            year_values = {this.state.year_values}
                            set_query_data = {this.set_query_data}
                            />
                        </Grid>
                        <Grid item>
                            <EmbeddingPanel 
                                classes={classes} 
                                click = {this.click}
                                dpoints = {this.state.data_points}
                                inclusters = {this.state.in_clusters}
                                outclusters = {this.state.out_clusters}
                                cluster_list = {this.state.cluster_list}
                                current_clicked = {this.state.current_clicked}
                                search_select_list = {this.state.search_select_list}
                                click_scatter = {this.click_scatter}
                                x_min_max = {this.state.x_min_max}
                                y_min_max = {this.state.y_min_max}
                                mode = {this.state.mode}
                                set_mode = {this.set_mode}
                                region_selected={this.region_selected}
                                set_scatter_size = {this.set_scatter_size}
                                scatter_width = {this.state.scatter_width}
                                scatter_height = {this.state.scatter_height}
                                set_select_box_size = {this.set_select_box_size}
                                select_box = {this.state.select_box}
                                to_vis_items = {this.state.to_vis_items}
                            />
                            {/* <RecommendPanel classes={classes} query_data={this.state.query_data} set_clicked_entity={this.set_clicked_entity}/> */}
                        </Grid>
                    </Grid>

                    <Grid container item lg={6} direction={'column'} justify={'flex-start'} alignItems={'stretch'} wrap="nowrap" className={classes.grid}>
                        <Grid item >
                            <ZoomPanel 
                                classes={classes} 
                                click = {this.click}
                                dpoints = {this.state.data_points}
                                cluster_list = {this.state.cluster_list}
                                current_clicked = {this.state.current_clicked}
                                search_select_list = {this.state.search_select_list}
                                zoom_cluster_list = {this.state.zoom_cluster_list}
                                zoom_in_clusters = {this.state.zoom_in_clusters}
                                click_scatter = {this.click_scatter}
                                set_zoom_size = {this.set_zoom_size}
                                zoom_width = {this.state.zoom_width}
                                zoom_height = {this.state.zoom_height}
                                cluster_x_min_max = {this.state.cluster_x_min_max}
                                cluster_y_min_max = {this.state.cluster_y_min_max}
                                entity_clicked = {this.entity_clicked}
                                zoom_x_offset_end = {this.state.zoom_x_offset_end}
                                zoom_y_offset_end = {this.state.zoom_y_offset_end}
                                zoom_dict={this.state.zoom_dict}
                                doc_num={this.state.doc_num}
                                word_num={this.state.word_num}
                                auth_num={this.state.auth_num}
                            />
                        </Grid>
                        <Grid item >
                            <DetailPanel classes={classes} query_data={this.state.query_data} set_clicked_entity={this.set_clicked_entity}
                                entity_clicked = {this.entity_clicked}
                             doc_num={this.state.doc_num}
                             word_num={this.state.word_num}
                             auth_num={this.state.auth_num}/>
                        </Grid>
                    </Grid>

                    <Grid container item lg={3} direction={'column'} justify={'flex-start'} alignItems={'stretch'} wrap="nowrap" className={classes.grid}>
                        <Grid item >
                            <ClusterDetailsPanel classes={classes} query_data={this.state.query_data} set_clicked_entity={this.set_clicked_entity} 
                                selected_history={this.state.selected_history}
                                data = {this.state.data_points}
                                zoom_in_clusters = {this.state.zoom_in_clusters}
                                zoom_dict={this.state.zoom_dict}
                                change_select_state={this.change_select_state}
                                delete_select_state={this.delete_select_state}/>
                            
                        </Grid>
                        <Grid item >
                            <RatedPanel classes={classes} 
                                query_data={this.state.query_data} 
                                set_clicked_entity={this.set_clicked_entity}
                                recom_entities={this.state.recom_entities}
                                />
                        </Grid>
                        <Grid item >
                            <RecommendPanel classes={classes} 
                                query_data={this.state.query_data} 
                                set_clicked_entity={this.set_clicked_entity}
                                recom_entities={this.state.recom_entities}
                                />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default ProjectGrid;