<template>
  <div class="radar_chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['selectedCountries', 'selectedDevTypes','height'],
  watch: {
    selectedCountries(newArray, oldArray) {
      const countries = newArray;
      const devTypes = this.selectedDevTypes;
      this.renderChart('.radar_chart', this.dataset,this.radarChartOptions,countries, devTypes);
    },
    selectedDevTypes(newArray, oldArray) {
      const countries = this.selectedCountries;
      const devTypes = newArray;
      this.renderChart('.radar_chart', this.dataset,this.radarChartOptions,countries, devTypes);
    },
  },
  radarChartOptions() {
    return {
        w: 700,
		h: 700,
		maxValue: 5,
		levels: 5,
		roundStrokes: false,
		color: d3.scaleOrdinal().range(["#AFC52F", "#ff6600"]),
		format: '.0f',
		legend: { title: 'Developer Types', translateX: 100, translateY: 40 },
		unit: 'n'
    }
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
        d3.csv('./data/worklife_balance.csv'),
      ]).then(
        (d) => {
          this.dataset = d[0];
          this.renderChart('.radar_chart', d[0],this.radarChartOptions,[],[]);
        },
      );
    },
    renderChart(parent_selector, data, options,countries, devTypes) {
      const max = Math.max;
      const sin = Math.sin;
      const cos = Math.cos;
      const HALF_PI = Math.PI / 2;
      const wrap = (text, width) => {
          text.each(function() {
            var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.4, // ems
              y = text.attr("y"),
              x = text.attr("x"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
              }
            }
	      });
      };//wrap
      const margin = {top: 10, right: 0, bottom: 10, left: 0},
			width = window.innerWidth - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
      const color = d3.scaleBand()
				.range(["#EDC951","#CC333F","#00A0B0"]);

	   /* Filter Data */
      if(countries.length > 0)
        data = data.filter(function(d) { if(countries.includes(d.Country)) return d;});
      if(devTypes.length > 0)
        data = data.filter(function(d) { if(devTypes.includes(d.DevType)) return d;});

	let secondMap = (items)=>{
        //keyorder = 
        let result = []
		result = [
			{axis:"Remote Working",value: items.WorkRemote},
			{axis:"Avoid Overtimes",value:items.WorkWeekHrs},
			{axis:"Career Satisfaction",value:items.CareerSat},
			{axis:"Job Satisfaction",value:items.JobSat}
		]
        return result;
      }

	  
	   /* Format Data */
      data.forEach(function(d) {
          d.WorkRemote = +d.WorkRemote;
          d.WorkWeekHrs = +d.WorkWeekHrs;
          d.JobSat = +d.JobSat;
		  d.CareerSat = +d.CareerSat;
		  d.Count = +d.Count;
      });
      
      let nestedData = d3.nest()
        .key(function(d) {return d.DevType;})
        .rollup(function(v) { 
          return {
			Count: d3.sum(v, function(d) { return d.Count; }),
			WorkRemote: d3.sum(v, function(d) { return d.WorkRemote*d.Count; })/d3.sum(v, function(d) { return d.Count; }),
			WorkWeekHrs: d3.sum(v, function(d) { return d.WorkWeekHrs*d.Count; })/d3.sum(v, function(d) { return d.Count; }),
			JobSat: d3.sum(v, function(d) { return d.JobSat*d.Count; })/d3.sum(v, function(d) { return d.Count; }),
			CareerSat: d3.sum(v, function(d) { return d.CareerSat*d.Count; })/d3.sum(v, function(d) { return d.Count; }),
          };
        })
        .entries(data)
        .map(function(d) {
            return {
              name: d.key,
              axes: secondMap(d.value)
            };
        });
	
    const cfg = {
        w: 350,				//Width of the circle
        h: 350,				//Height of the circle
        margin: {top: 50, right: 200, bottom: 50, left: 200}, //The margins of the SVG
        levels: 5,				//How many levels or inner circles should there be drawn
        maxValue: 5, 			//What is the value that the biggest circle will represent
        labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
        opacityArea: 0.15, 	//The opacity of the area of the blob
        dotRadius: 4, 			//The size of the colored circles of each blog
        opacityCircles: 0.1, 	//The opacity of the circles of each blob
        strokeWidth: 2, 		//The width of the stroke around each blob
        roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal(d3.schemeCategory10),	//Color function,
        format: '.2%',
        unit: '',
        legend: { title: 'Developer Types', translateX: 300, translateY: 10 }
	};


  	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	// var maxValue = max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	let maxValue = 0;
	for (let j=0; j < nestedData.length; j++) {
		for (let i = 0; i < nestedData[j].axes.length; i++) {
			nestedData[j].axes[i]['id'] = nestedData[j].name;
			if (nestedData[j].axes[i]['value'] > maxValue) {
				maxValue = nestedData[j].axes[i]['value'];
			}
		}
	}
	maxValue = max(cfg.maxValue, maxValue);

	const allAxis = nestedData[0].axes.map((i, j) => i.axis),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(cfg.format),			 	//Formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

	//Scale for the radius
	const rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);

	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////
	const parent = d3.select(parent_selector);

	//Remove whatever chart with the same id/class was present before
	parent.select("svg").remove();

	//Initiate the radar chart SVG
	let svg = parent.append("svg")
			.attr("width",  '100%')
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar");
	
	

	//Append a g element
	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	this.container = g;

	svg.call(d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', () => { this.container.attr('transform', d3.event.transform); }));

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////

	//Filter for the outside glow
	let filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////

	//Wrapper for the grid & axes
	let axisGrid = g.append("g").attr("class", "axisWrapper");

	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", d => radius / cfg.levels * d)
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", d => -d * radius / cfg.levels)
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(d => Format(1-(maxValue - d) / maxValue));

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(maxValue *1.1) * cos(angleSlice * i - HALF_PI))
		.attr("y2", (d, i) => rScale(maxValue* 1.1) * sin(angleSlice * i - HALF_PI))
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d,i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
		.attr("y", (d,i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
		.text(d => d)
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	const radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
		.radius(d => rScale(d.value))
		.angle((d,i) => i * angleSlice);

	if(cfg.roundStrokes) {
		radarLine.curve(d3.curveCardinalClosed)
	}

	//Create a wrapper for the blobs
	const blobWrapper = g.selectAll(".radarWrapper")
		.data(nestedData)
		.enter().append("g")
		.attr("class", "radarWrapper");

	//Append the backgrounds
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", d => radarLine(d.axes))
		.style("fill", (d,i) => cfg.color(i))
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function(d, i) {
			//Dim all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.3);
		})
		.on('mouseout', () => {
			//Bring back all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});

	//Create the outlines
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d.axes); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", (d,i) => cfg.color(i))
		.style("fill", "none")
		.style("filter" , "url(#glow)");

	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(d => d.axes)
		.enter()
		.append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
		.style("fill", (d) => cfg.color(d.id))
		.style("fill-opacity", 1);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////

	//Wrapper for the invisible circles on top
	const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(nestedData)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(d => d.axes)
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius * 1.5)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			tooltip
				.attr('x', this.cx.baseVal.value - 10)
				.attr('y', this.cy.baseVal.value - 10)
				.transition()
				.style('display', 'block')
				.text(Format(1-(maxValue - d.value) / maxValue));
		})
		.on("mouseout", function(){
			tooltip.transition()
				.style('display', 'none').text('');
		});

	const tooltip = g.append("text")
		.attr("class", "tooltip")
		.attr('x', 0)
		.attr('y', 0)
		.style("font-size", "12px")
		.style('display', 'none')
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em");

	// if (cfg.legend !== false && typeof cfg.legend === "object") {
	// 	let legendZone = svg.append('g');
	// 	let names = nestedData.map(el => el.name);
	// 	if (cfg.legend.title) {
	// 		let title = legendZone.append("text")
	// 			.attr("class", "title")
	// 			.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
	// 			.attr("x", cfg.w - 70)
	// 			.attr("y", 10)
	// 			.attr("font-size", "12px")
	// 			.attr("fill", "#404040")
	// 			.text(cfg.legend.title);
	// 	}
	// 	let legend = legendZone.append("g")
	// 		.attr("class", "legend")
	// 		.attr("height", 100)
	// 		.attr("width", 200)
	// 		.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
	// 	// Create rectangles markers
	// 	legend.selectAll('rect')
	// 	  .data(names)
	// 	  .enter()
	// 	  .append("rect")
	// 	  .attr("x", cfg.w - 65)
	// 	  .attr("y", (d,i) => i * 20)
	// 	  .attr("width", 10)
	// 	  .attr("height", 10)
	// 	  .style("fill", (d,i) => cfg.color(i));
	// 	// Create labels
	// 	legend.selectAll('text')
	// 	  .data(names)
	// 	  .enter()
	// 	  .append("text")
	// 	  .attr("x", cfg.w - 52)
	// 	  .attr("y", (d,i) => i * 20 + 9)
	// 	  .attr("font-size", "11px")
	// 	  .attr("fill", "#737373")
	// 	  .text(d => d);

	// }
  return svg;
    },
  },
};
</script>

<style scoped>

</style>
