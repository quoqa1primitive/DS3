import React, { useRef, useEffect, useState } from 'react';
import './BarComponent.css';
import * as d3 from "d3";

function BarComponent(props){
  const [dimension, setDimension] = useState({
    width: props.dimension.width,
    height: props.dimension.height
  })
  const svgRef = useRef(null);

  const countries = ["Czech Republic", "Mexico", "South Korea"];
  const colors = ["#E8ECFB", "#B997C7", "#824D99", "#4E78C4", "#57A2AC", "#7EB875", "#D0B541", "#E67F33", "#CE2220", "#521A13"];

  let animator = "Animator-" + props.index;
  let radioName = animator + "-radio";

  // console.log(props.dimension);
  function reorganize(data){
    let transposed = [
      {year: "1970"},
      {year: "1975"},
      {year: "1980"},
      {year: "1985"},
      {year: "1990"},
      {year: "1995"},
      {year: "2000"},
      {year: "2005"},
      {year: "2010"},
      {year: "2015"},
      {year: "2020"}
    ];

    data.map((country) => {
      Object.keys(country).map((key) => {
        if(key != "country"){
          transposed[transposed.findIndex(obj => {return obj.year === key})][country.country] = country[key];
          // console.log(transposed[key])
        }
      });
    });
    return transposed;
  }

  let data= reorganize(props.data);
  console.log(data);

  let x = d3.scaleBand()
    .domain(data.map(function(d) { return d.year; }))
    .range([0, dimension.width])
    .padding(0.2);
  let y = d3.scaleLinear()
    .domain([0, 100])
    .range([dimension.height, 0]);

  function animate(radio){
    const svg = d3.select(svgRef.current);
    let state = -1;
    Array.prototype.forEach.call(document.getElementsByClassName(animator), (el, idx) => {
      if(el.checked){
        state = idx-1;
      }
    });

    let line = svg.selectAll(".line")
      .data([data], function(d){ return d[countries[0]]});
    line
      .enter()
      .append("path")
      .attr("class","line")
      .merge(line)
      .transition()
      .duration(1200)
      .attr("d", d3.line()
      .x(function(d) { return x(d.year) + 30; })
      .y(function(d) { return (state>=0 && state<3)? y(d[countries[state]]): dimension.height; }))
      .attr("fill", "none")
      .attr("stroke", colors[(state>=0 && state<3)?state*2:9])
      .attr("stroke-width", 2.5)
      .delay(function(d, i){return(i*100)})

    svg.selectAll(".dot")
      .transition()
      .duration(1200)
      .attr("state", state)
      .attr("cx", function(d) { return x(d.year) + 30; })
      .attr("cy", function(d) { return (state>=0 && state<3)? y(d[countries[state]]): dimension.height; })

    svg.selectAll(".titleText")
      .style("font-family", "Roboto")
      .text(`Children and Elderly per 100 Adults - ${(state>=0 && state<3)? String.fromCharCode(65+state): "Country"}`);
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${dimension.width} ${dimension.height}`)
      .attr("width", "100%")

    // Add Title
    svg.append("text")
      .attr("class","titleText")
      .attr("x", (dimension.width / 24))
      .attr("y", 0 - (dimension.height / 12))
      .attr("text-anchor", "start")
      .attr("white-space", "pre-line")
      .style("font-size", "20px")
      .text(`Children and Elderly per 100 Adults - Country`);

    // Add X axis
    svg.append("g")
      .attr("transform", "translate(0," + dimension.height + ")")
      .call(d3.axisBottom(x))

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Line
    svg.append("path")
      .datum(data)
      .attr("class","line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) + 30 })
        .y(function(d) { return dimension.height })
        )

    // tooltip
    d3.select(".svg-container").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("z-index", 3)
      .style("background-color", "rgba(204, 204, 204, 0.9)")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "2")
      .style("margin", "0")
      .style("position", "absolute")

    let tooltip = d3.select(".svg-container").selectAll(".tooltip")

    // tooltip functions
    let mouseover = function(event, d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("opacity", 1)
      .style("stroke", "black")
    }

    let mousemove = function(event, d) {
      let state = d3.select(this).attr("state");
      tooltip
        .html(`${d.year}: ${(state>=0 && state<3)? d[countries[state]]:"0"}`)
        .style("left", `${d3.pointer(event)[0] + 5}px`)
        .style("top", `${d3.pointer(event)[1] - 20}px`)
    }

    let mouseleave = function(event, d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("opacity", 0.0)
        .style("stroke", "none")
    }

    svg.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .style("opacity", 0.0)
        .style("fill", "rgba(128, 128, 128, 1)")
        .attr("class", "dot")
        .attr("r", 8)
        .attr("cx", function(d) { return x(d.year) + 30; })
        .attr("cy", function(d) { return dimension.height; })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

  }, [dimension]);

  return (
    <>
      <div>
        {Array(props.steps).fill(1).map((x) => x).map((item) => (
          <input type="radio" className={animator} name={radioName} onChange={animate(this)} key={Math.floor(Math.random()*(99999-1))} value={item} />
        ))}
      </div>
      <div className="svg-container">
        <svg className="svg-content-responsive" ref={svgRef}/>
      </div>
    </>
  )
}

export default BarComponent;

// svg
//   .selectAll("mybar")
//     .data(data)
//     .enter()
//     .append("rect")
//       .attr("x", function(d) { return x(d.year); })
//       .attr("y", function(d) { return dimension.height; })
//       .attr("width", x.bandwidth())
//       .attr("height", function(d) { return 0; })
//       .attr("fill", "#69b3a2")

// switch(state){
//   case 0:
//     svg.selectAll("rect")
//       .transition()
//       .duration(800)
//       .attr("y", function(d) { return dimension.height; })
//       .attr("height", function(d) { return 0; })
//       .delay(function(d, i){return(i*100)})
//     break;
//   case 1:
//     svg.selectAll("rect")
//       .transition()
//       .duration(800)
//       .attr("y", function(d) { return y(d[country1]); })
//       .attr("height", function(d) { return dimension.height - y(d[country1]); })
//       .delay(function(d, i){return(i*100)})
//     break;
//   case 2:
//     svg.selectAll("rect")
//       .transition()
//       .duration(800)
//       .attr("y", function(d) { return y(d[country2]); })
//       .attr("height", function(d) { return dimension.height - y(d[country2]); })
//       .delay(function(d, i){return(i*100)})
//     break;
//   case 3:
//     svg.selectAll("rect")
//       .transition()
//       .duration(800)
//       .attr("y", function(d) { return y(d[country3]); })
//       .attr("height", function(d) { return dimension.height - y(d[country3]); })
//       .delay(function(d, i){return(i*100)})
//     break;
//   case 4:
//     svg.selectAll("rect")
//       .transition()
//       .duration(800)
//       .attr("y", function(d) { return y(d[country4]); })
//       .attr("height", function(d) { return dimension.height - y(d[country4]); })
//       .delay(function(d, i){return(i*100)})
//     break;
//   defalut:
//     console.log("nothing checked");
// }
// }
