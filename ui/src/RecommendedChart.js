import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { min } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";

class RecommendedChart extends Component {

   constructor(props){
       super(props)
       this.colors = ['#ff0000',
                        '#800000',
                        '#FFFF00',
                        '#808000',
                        '#00FF00',
                        '#008000',
                        '#00FFFF',
                        '#008080',
                        '#0000FF',
                        '#000080',
                        '#FF00FF',
                        '#800080',
                        '#DC7633',
                        '#9C640C',
                        '#48C9B0',
                        '#F39C12',
                        '#BB8FCE',
                        '#85929E',
                        '#F1948A',
                        '#7D6608'
       ];
               
       this.state = {height:0, width:0}
       this.createClusterChart = this.createClusterChart.bind(this)
   }

   componentDidMount() {
      const height = this.divElement.clientHeight;
      const width = this.divElement.clientWidth;
      this.setState({ height, width });
      this.createClusterChart()
   }

   componentDidUpdate() {
      this.createClusterChart()
   }

   createClusterChart() {
     const node = this.node
     var dataMaxX = max(this.props.data.map(d => d.x))
     var dataMinX = min(this.props.data.map(d => d.x))
     var dataMaxY = max(this.props.data.map(d => d.y))
     var dataMinY = min(this.props.data.map(d => d.y))
   
     let yScale = scaleLinear()
        .domain([dataMinY/4 + 0.1, dataMaxY/4 - 0.1])
        .range([0, this.state.height])
      let xScale = scaleLinear()
          .domain([dataMinX/4 - 1, dataMaxX/4 + 1])
          .range([0, this.state.width])

      var dias = select(node)
         .selectAll('.dia')
         .data(this.props.data.filter(function (a) { return a.etype === 'author'; }))
         .enter()
         .append('rect')
         .attr("class","dia");

      select(node)
         .selectAll('.dia')
         .data(this.props.data.filter(function (a) { return a.etype === 'author'; }))
         .exit()
         .remove()


         select(node)
            .selectAll('.dia')
            //.data(this.props.data.filter(function (a) { returdn a.etype === 'author'; }))
            .style('fill', d => [5]
            )
            .attr('x', d => xScale(d.x))
            .attr('y', d => yScale(d.y))
            .attr('width', 6).attr('height', 6)
            .style("stroke","black")
            .style("stroke-width",1);

      dias = select(node)
         .selectAll('.dia')
         .data(this.props.data.filter(function (a) { return a.etype === 'author'; }))
         .style('fill', d => this.colors[5]
         )
         // .style('fill', d => this.props.search_select_list[this.props.search_select_list.length-1]==d.index? 'gray':this.colors[d.c%this.colors.length])
         .attr('transform', d => 'rotate(45,' +  xScale(d.x) +', '+yScale(d.y) +')')
         .attr('x', d => xScale(d.x))
         .attr('y', d => yScale(d.y))
         .attr('width', 6).attr('height', 6)
         .style("stroke","black")
         .style("stroke-width",1)
        //  .on("click", this.props.click)
         // .on("mouseover", this.mouseover);


      var squares = select(node)
         .selectAll('.square')
         .data(this.props.data.filter(function (a) { return a.etype === 'word'; }))
         .enter()
         .append('rect')
         .attr("class","square");

      select(node)
         .selectAll('.square')
         .data(this.props.data.filter(function (a) { return a.etype === 'word'; }))
         .exit()
         .remove()


         select(node)
            .selectAll('.square')
            //.data(this.props.data.filter(function (a) { return a.etype === 'word'; }))
            .style('fill', d => this.colors[6]
            )
            .attr('x', d => xScale(d.x))
            .attr('y', d => yScale(d.y))
            .attr('width', 6).attr('height', 6)
            .style("stroke","black")
            .style("stroke-width",1)
            .on("click", this.props.click)
            // .on("mouseover", this.mouseover);

      squares = select(node)
         .selectAll('.square')
         .data(this.props.data.filter(function (a) { return a.etype === 'word'; }))
         .style('fill', d => this.colors[6]
         )
         // .style('fill', d => this.props.search_select_list[this.props.search_select_list.length-1]==d.index? 'gray':this.colors[d.c%this.colors.length])
         .attr('x', d => xScale(d.x))
         .attr('y', d => yScale(d.y))
         .attr('width', 6).attr('height', 6)
         .style("stroke","black")
         .style("stroke-width",1)
         .on("click", this.props.click)
         // .on("mouseover", this.mouseover);

      var circles = select(node)
         .selectAll('circle')
         .data(this.props.data.filter(function (a) { return a.etype === 'doc'; }))
         .enter()
         .append('circle');

      select(node)
         .selectAll('circle')
         .data(this.props.data.filter(function (a) { return a.etype === 'doc'; }))
         .exit()
         .remove()


         select(node)
            .selectAll('circle')
            .data(this.props.data.filter(function (a) { return a.etype === 'doc'; }))
            .style('fill', d => this.props.mode === "cluster" ? 
               (this.colors[d.c%this.colors.length]): 
               this.colors[0]
            )
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 3)
            .style("stroke","black")
            .style("stroke-width",1)
            .on("click", this.props.click)
            // .on("mouseover", this.mouseover);

      circles = select(node)
         .selectAll('circle')
         //.data(this.props.data.filter(function (a) { return a.etype === 'doc'; }))
         .style('fill', d => this.colors[0]
         )
         // .style('fill', d => this.props.search_select_list[this.props.search_select_list.length-1]==d.index? 'gray':this.colors[d.c%this.colors.length])
         .attr('cx', d => xScale(d.x))
         .attr('cy', d => yScale(d.y))
         .attr('r', 3)
         .style("stroke","black")
         .style("stroke-width",1)
   }

render() {
      return (<div style={{flex:1}} ref={ (divElement) => { this.divElement = divElement } }>
         <svg ref={node => this.node = node}
        width={this.state.width} height={this.state.height}>
            <g className="tooltip-area">
               <text className="tooltip-area__text"></text>
            </g>
        </svg>
      </div>);
      
   }
   
}

export default RecommendedChart