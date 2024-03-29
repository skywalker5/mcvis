import React from 'react';
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import {Paper,Tooltip,Button} from '@material-ui/core';
import { scaleLinear } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic'
import Rating from "@mui/material/Rating";

const colors = ['#8dd3c7', '#ffffb3', '#bebada',
'#fb8072', '#80b1d3', '#fdb462',
'#b3de69', '#fccde5', '#d9d9d9',
'#bc80bd', '#ccebc5', '#ffed6f',
];

export const ZoomChart = (props) => {
  let xScale = scaleLinear()
  .domain(props.cluster_x_min_max)
  .range([0, props.zoom_width]);
  let yScale = scaleLinear()
  .domain(props.cluster_y_min_max)
  .range([0, props.zoom_height]);
  const containerRef = useRef(null);

  function CircleZoom(props) {

    return(
      <Tooltip 
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<Rating name="rating" size="small" defaultValue= {2.5} precision={0.5} />}
      >
        <circle 
          id={props.id}
          r={props.r}
          cx={props.cx}
          cy={props.cy}
          stroke={props.stroke}
          fill={props.fill}
          >
            
        </circle>
      </Tooltip>)

  }

  function RectZoom(props) {
    
    return(
      <Tooltip 
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<Rating name="rating" size="small" defaultValue= {2.5} precision={0.5} />}
      >
        <rect
          id={props.id}
          width={props.width}
          height={props.height}
          x={props.x}
          y={props.y}
          stroke={props.stroke}
          fill={props.fill}
          >
        </rect>
            
      </Tooltip>)

  }

  function DiaZoom(props) {
    
    return(
      <Tooltip 
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<Rating name="rating" size="small" defaultValue= {2.5} precision={0.5} />}
      >
        <rect
          id={props.id}
          width={props.width}
          height={props.height}
          x={props.x}
          y={props.y}
          className={props.className}
          stroke={props.stroke}
          fill={props.fill}
          >
        </rect>
            
      </Tooltip>)

  }

  useEffect(() => {
    function updateSize() {
      props.set_zoom_size(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    const handleResize = debounce(updateSize, 500);
    updateSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [props.data.length]);
  
  const in_stroke="black";
  const { classes } = props;
  return (
    <Paper variant="outlined" elevation={0} style={{display:"flex", flex:1, }} ref={containerRef} className={classes.zoomChart} >
        <div style={{flex:1}}>
            <svg width="100%" height="100%">
                <g>
                  {Object.keys(props.zoom_in_clusters).map((index) => (
                    (props.document & props.data[index].etype === 'doc')? (
                      <Tooltip 
                        title={props.cluster_info[props.zoom_dict[index].cid]["Keywords"].join(", ")} followCursor

                      >
                      <a href={"#row"+index} style={{"cursor": "default"}}>
                      <CircleZoom 
                        id={index}
                        r={3}
                        cx={xScale(props.zoom_dict[index].x)}
                        cy={yScale(props.zoom_dict[index].y)}
                        stroke={in_stroke}
                        fill={interpolateTurbo(props.zoom_dict[index].cid/20.0)}
                        >
                          
                      </CircleZoom>
                      </a>
                      </Tooltip>
                    ):(
                      (props.keyword & props.data[index].etype === 'word')? (
                        <Tooltip 
                          title={props.cluster_info[props.zoom_dict[index].cid]["Keywords"].join(", ")} followCursor

                        >
                        <a href={"#row"+index} style={{"cursor": "default"}}>
                        <RectZoom
                          id={index}
                          width={6}
                          height={6}
                          x={xScale(props.zoom_dict[index].x)}
                          y={yScale(props.zoom_dict[index].y)}
                          stroke={in_stroke}
                          fill={interpolateTurbo(props.zoom_dict[index].cid/20.0)}
                          >
                            
                        </RectZoom>
                        </a>
                        </Tooltip>
                      ):(
                        (props.author & props.data[index].etype === 'author')? (
                          <Tooltip 
                            title={props.cluster_info[props.zoom_dict[index].cid]["Keywords"].join(", ")} followCursor
  
                          >
                          <a href={"#row"+index} style={{"cursor": "default"}}>
                          <DiaZoom
                            id={index}
                            width={6}
                            height={6}
                            x={xScale(props.zoom_dict[index].x)}
                            y={yScale(props.zoom_dict[index].y)}
                            className={props.classes.dia}
                            stroke={in_stroke}
                            fill={interpolateTurbo(props.zoom_dict[index].cid/20.0)}
                            >
                              
                          </DiaZoom>
                          </a>
                          </Tooltip>

                      ): (null)
                      )
                    )
                  ))}
                </g>
            </svg>
        </div>
    </Paper>
  );
};

export default ZoomChart;