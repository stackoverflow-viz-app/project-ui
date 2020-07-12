<template>
  <div class="line_chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['selectedCountries', 'selectedDevTypes','height'],
  watch: {
    selectedCountries(newArray, oldArray) {
      const countries = newArray;
      const devTypes = this.selectedDevTypes;
      this.renderChart('.line_chart', this.dataset,countries, devTypes);
    },
    selectedDevTypes(newArray, oldArray) {
      const countries = this.selectedCountries;
      const devTypes = newArray;
      this.renderChart('.line_chart', this.dataset,countries, devTypes);
    },
  },
  data() {
    return {
      container: null,
      svg: null,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      dataset: null
    };
  },
  mounted() {
    this.readData();
  },
  methods: {
    readData() {
      Promise.all([
        d3.csv('./data/upward_mobility.csv'),
      ]).then(
        (d) => {
          this.dataset = d[0];
          this.renderChart('.line_chart', d[0],[],[]);
        },
      );
    },
    renderChart(parent_selector, data,countries, devTypes) {
      var width = 700;
      var margin = 50;
      var height = this.height-margin;  
      var duration = 250;

      var lineOpacity = "0.25";
      var lineOpacityHover = "0.85";
      var otherLinesOpacityHover = "0.1";
      var lineStroke = "1.5px";
      var lineStrokeHover = "2.5px";
      var circleOpacity = '0.85';
      var circleOpacityOnLineHover = "0.25"
      var circleRadius = 3;
      var circleRadiusHover = 6;

      /* Format Data */
      data.forEach(function(d) {
          d.YearsCodePro = d.YearsCodePro;
          d.Salary = +d.Salary;
          d.DevType = d.DevType;
      });
      
      /* Filter Data */
      if(countries.length > 0)
        data = data.filter(function(d) { if(countries.includes(d.Country)) return d;});
      if(devTypes.length > 0)
        data = data.filter(function(d) { if(devTypes.includes(d.DevType)) return d;});
      data = data.filter(function(d) { if(d.Count>10) return d;});
      /* Scale */
      var xScale = d3.scaleBand()
        .domain(["0-2", "2-5", "5-7", "7-10","10-15","15-20","20+"])
        .range([0, width-margin])
        .padding(1);

      var yScale = d3.scaleLinear()
        .domain([0, d3.max(data,  function(d) { return d.Salary; })])
        .range([height-margin, 0]);

      var color = d3.scaleOrdinal(d3.schemeCategory10);
      const parent = d3.select(parent_selector);
	    //Remove whatever chart with the same id/class was present before
	    parent.select("svg").remove();

      /* Add SVG */
      var svg = d3.select(parent_selector).append("svg")
        .attr("width", '100%')
        .attr("height", (height+margin)+"px")
        .append('g')
        .attr("transform", `translate(${margin}, ${margin})`);
      
      /* Add line into SVG */

      var line = d3.line()
        .x(d => xScale(d.YearsCodePro))
        .y(d => yScale(+d.Salary));

      let lines = svg.append('g')
        .attr('class', 'lines');

      let secondMap = (items)=>{
        //keyorder = 
        let result = []
        items.forEach(element => {
          result.push({
            YearsCodePro : element.key,
            Salary : element.value.Salary,
            Count : element.value.Count
          })
        });      
        result = result.sort((a, b) => (["0-2", "2-5", "5-7", "7-10","10-15","15-20","20+"].indexOf(a.YearsCodePro) < ["0-2", "2-5", "5-7", "7-10","10-15","15-20","20+"].indexOf(b.YearsCodePro)) ? 1 : -1)
        return result;
      }
      
      let nestedData = d3.nest()
        .key(function(d) {return d.DevType;})
        .key(function(d) { return d.YearsCodePro; })
        .sortKeys(d3.ascending)
        .rollup(function(v) { 
          return {
              Count: d3.sum(v, function(d) { return d.Count; }),
              Salary: d3.sum(v, function(d) { return d.Salary*d.Count; })/d3.sum(v, function(d) { return d.Count; }),
          };
        })
        .entries(data)
        .map(function(d) {
            return {
              key: d.key,
              values: secondMap(d.values)
            };
        });

        lines.selectAll('.line-group')
        .data(nestedData).enter()
        .append('g')
        .attr('class', 'line-group')
        .on("mouseover", function(d, i) {
            svg.append("text")
              .attr("class", "title-text")
              .style("fill", color(i))
              .text(d.key)
              .attr("text-anchor", "middle")
              .attr("x", (width-margin)/2)
              .attr("y", 5);
          })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
          })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                .style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
              });
    

    /* Add circles in the line */
    lines.selectAll("circle-group")
      .data(nestedData).enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values).enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function(d) {
          d3.select(this)
            .style("cursor", "pointer")
            .append("text")
            .attr("class", "text")
            .text(`${'Mean Salary:'+d.Salary.toFixed(2)+' , Years Exp: '+d.YearsCodePro}`)
            .attr("x", d => xScale(d.YearsCodePro) + 5)
            .attr("y", d => yScale(d.Salary) - 10);
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")
            .transition()
            .duration(duration)
            .selectAll(".text").remove();
        })
      .append("circle")
      .attr("cx", d => xScale(d.YearsCodePro))
      .attr("cy", d => yScale(d.Salary))
      .attr("r", circleRadius)
      .style('opacity', circleOpacity)
      .on("mouseover", function(d) {
            d3.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadiusHover);
        })
        .on("mouseout", function(d) {
            d3.select(this)
              .transition()
              .duration(duration)
              .attr("r", circleRadius);
        });

    
    

    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);   

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(xAxis)
        .append('text')
        .attr("x", width-margin)
        .attr("y", 20)
        .attr("transform", "rotate(360)")
        .attr("fill", "#000")
        .text("Years Coding");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Mean Salary");
        },
      },
      getWidth(){
        return d3.select('.line_chart')
        .style('width')
        .slice(0, -2)
      },
}
</script>

<style>
.line {
  stroke-width: 2;
  fill: none;
}

.axis path {
  stroke: black;
}

.text {
  font-size: 12px;
}

.title-text {
  font-size: 12px;
}
</style>
