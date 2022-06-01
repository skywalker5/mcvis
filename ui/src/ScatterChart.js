import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import {Paper} from '@material-ui/core';
import { scaleLinear } from 'd3-scale'
import { interpolateTurbo } from 'd3-scale-chromatic'

const colors = ['#8dd3c7', '#ffffb3', '#bebada',
'#fb8072', '#80b1d3', '#fdb462',
'#b3de69', '#fccde5', '#d9d9d9',
'#bc80bd', '#ccebc5', '#ffed6f',
];

export const ScatterChart = (props) => {

  let xScale = scaleLinear()
  .domain(props.x_min_max)
  .range([0+20, props.scatter_width-20]);
  let yScale = scaleLinear()
  .domain(props.y_min_max)
  .range([0+20, props.scatter_height-20]);
  const containerRef = useRef(null);

  useEffect(() => {
    function updateSize() {
      props.set_scatter_size(containerRef.current.clientWidth, containerRef.current.clientHeight);      
    }
    const handleResize = debounce(updateSize, 500);
    updateSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [props.data.length]);

  const in_cluster_opacity = 1;
  const in_stroke="black";
  const out_stroke=null;
  const in_stroke_width=0.5;
  const out_stroke_width=1;

  return (
        <Paper elevation={0} style={{display:"flex", flex:1}} ref={containerRef}>
            <div style={{flex:1}}>
                <svg width="100%" height="100%">
                    <g>
                        {Object.keys(props.outclusters).map((index) => (
                        props.data[index].etype === 'doc'? (
                        <circle
                            key={index}
                            r={3}
                            cx={xScale(props.data[index].x)}
                            cy={yScale(props.data[index].y)}
                            stroke={out_stroke}
                            opacity="0.1"
                            strokeWidth={out_stroke_width}
                            fill={"gray"}
                        ></circle>) : (
                            props.data[index].etype === 'word'? (
                                <rect
                                    key={index}
                                    width={6}
                                    height={6}
                                    x={xScale(props.data[index].x)}
                                    y={yScale(props.data[index].y)}
                                    stroke={out_stroke}
                                    opacity="0.1"
                                    strokeWidth={out_stroke_width}
                                    fill={"gray"}
                                ></rect>) : (
                                    <rect
                                        key={index}
                                        width={6}
                                        height={6}
                                        x={xScale(props.data[index].x)}
                                        y={yScale(props.data[index].y)}
                                        className={props.classes.dia}
                                        stroke={out_stroke}
                                        opacity="0.1"
                                        strokeWidth={out_stroke_width}
                                        fill={"gray"}
                                    ></rect>
                                    ))
                        ))}
                        {Object.keys(props.inclusters).map((index) => (
                        props.data[index].etype === 'doc'? 
                        (<circle
                            key={index}
                            r={props.inclusters[index].is_selected === true? 12:3}
                            cx={xScale(props.data[index].x)}
                            cy={yScale(props.data[index].y)}
                            className={props.inclusters[index].is_selected === true? props.classes.selectSymbol:null}
                            stroke={in_stroke}
                            opacity={props.inclusters[index].is_selected === true? 1:in_cluster_opacity}
                            strokeWidth={in_stroke_width}
                            style={props.inclusters[index].is_selected === true? {position: 'relative', zIndex:1}:{}}
                            fill={props.mode === "cluster" ? props.inclusters[index].color: interpolateTurbo(props.inclusters[index].cid/256.0)}
                        ></circle>)
                        : (
                            props.data[index].etype === 'word'? 
                            (<rect
                                key={index}
                                width={props.inclusters[index].is_selected === true? 24:6}
                                height={props.inclusters[index].is_selected === true? 24:6}
                                className={props.inclusters[index].is_selected === true? props.classes.selectSymbol:null}
                                x={xScale(props.data[index].x)}
                                y={yScale(props.data[index].y)}
                                stroke={in_stroke}
                                opacity={props.inclusters[index].is_selected === true? 1:in_cluster_opacity}
                                strokeWidth={in_stroke_width}
                                style={props.inclusters[index].is_selected === true? {position: 'relative', zIndex:1}:{}}
                                fill={props.mode === "cluster" ? props.inclusters[index].color: interpolateTurbo(props.inclusters[index].cid/256.0)}
                            ></rect>)
                            : 
                            (<rect
                                key={index}
                                width={props.inclusters[index].is_selected === true? 24:6}
                                height={props.inclusters[index].is_selected === true? 24:6}
                                x={xScale(props.data[index].x)}
                                y={yScale(props.data[index].y)}
                                className={props.inclusters[index].is_selected === true? props.classes.diaSelected:props.classes.dia}
                                stroke={in_stroke}
                                opacity={props.inclusters[index].is_selected === true? 1:in_cluster_opacity}
                                strokeWidth={in_stroke_width}
                                style={props.inclusters[index].is_selected === true? {position: 'relative', zIndex:1}:{}}
                                fill={props.mode === "cluster" ? props.inclusters[index].color: interpolateTurbo(props.inclusters[index].cid/256.0)}
                            ></rect>)
                            )
                        ))}
                        { /*Object.keys(props.cluster_list).map((index)   => (
                            <ellipse transform={"rotate("+props.cluster_list[index].rotate_degree+")"} cx={props.cluster_list[index].centroid[0]} cy={props.cluster_list[index].centroid[1]} rx={props.cluster_list[index].first_boundary} ry={props.cluster_list[index].second_boundary}
                            stroke={colors[index%colors.length]}
                            strokeWidth={1.2}
                            fill={colors[index%colors.length]}
                            fillOpacity={0.4}
                            className={props.classes.ellip}/>
                        ))*/}
                    </g>
                </svg>
            </div>
    </Paper>
  );
};

export default ScatterChart;