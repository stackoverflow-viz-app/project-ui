<template>
  <svg id='gapMinder'></svg>
</template>

<script>
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default {
  props: ['height', 'width', 'margin', 'x-title', 'y-title',
    'selectedCountries', 'selectedDevTypes'],
  watch: {
    selectedCountries(newArray, oldArray) {
      const countries = newArray;
      const devTypes = this.selectedDevTypes;
      this.renderGraphNewValues(countries, devTypes);
    },
    selectedDevTypes(newArray, oldArray) {
      const countries = this.selectedCountries;
      const devTypes = newArray;
      this.renderGraphNewValues(countries, devTypes);
    },
  },
  data() {
    return {
      tip: null,
      svg: null,
      circles: null,
      xScale: null,
      yScale: null,
      rScale: null,
      colorScale: null,
      immutableData: [],
    };
  },
  mounted() {
    this.initGraph();
    this.readData();
  },
  methods: {
    initGraph() {
      this.tip = d3Tip()
        .attr('class', 'd3-tip')
        .html((d) => `<strong>Country: </strong><span class='details'>${d.country}<br></span>`
                  + `<strong>Type: </strong><span class='details'>${d.devType}<br></span>`
                  + `<strong>Mean Ed. Level: </strong><span class='details'>${d.levelEd}<br></span>`
                  + `<strong>Mean Salary: </strong><span class='details'>${d.salary}<br></span>`
                  + `<strong>Size: </strong><span class='details'>${d.size}<br></span>`);

      this.svg = d3
        .select('#gapMinder')
        .attr('width', this.width)
        .attr('height', this.height);

      this.svg.call(this.tip);

      this.xScale = d3.scaleLinear()
        .domain([0, 4.5])
        .range([100, 680]);
      this.yScale = d3.scaleLinear()
        .domain([10000, 300000])
        .range([400, 30]);

      this.rScale = d3.scaleSqrt()
        .range([0, 50]);
      this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const leftAxis = d3.axisLeft(this.yScale);
      const bottomAxis = d3.axisBottom(this.xScale);

      this.svg.append('g')
        .attr('transform', 'translate(100,0)')
        .call(leftAxis);

      this.svg.append('g')
        .attr('transform', 'translate(0,400)')
        .call(bottomAxis);

      this.svg.append('text')
        .attr('class', 'label')
        .text(this.yTitle)
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('x', -(this.width) / 3)
        .attr('y', 2 * this.margin)
        .attr('transform', 'rotate(-90)');

      this.svg.append('text')
        .attr('class', 'label')
        .text(this.xTitle)
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('x', this.width / 2.3 - (2 * this.margin))
        .attr('y', this.height - this.margin);
    },
    readData() {
      Promise.all([
        d3.dsv('|', './data/gapminder.csv'),
      ]).then(
        (d) => {
          // eslint-disable-next-line prefer-destructuring
          this.immutableData = d[0];
          this.renderGraph(this.svg, this.tip, this.immutableData);
        },
      );
    },
    renderGraph(svg, tip, dataWeLoaded) {
      this.rScale.domain([0, d3.max(dataWeLoaded, (d) => +d.size)]);
      this.circles = svg.selectAll('circle')
        .data(dataWeLoaded)
        .enter()
        .append('circle')
        .attr('cy', (d) => this.yScale(+d.salary))
        .attr('cx', (d) => this.xScale(+d.levelEd))
        .attr('r', (d) => this.rScale(+d.size))
        .attr('fill-opacity', 0.4)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 1)
        .attr('fill', (d) => this.colorScale(d.devType))
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    },
    renderGraphNewValues(countries, devTypes) {
      let newValues = this.immutableData;
      if (countries.length && devTypes.length) {
        newValues = newValues
          .filter((item) => countries.includes(item.country))
          .filter((item) => devTypes.includes(item.devType));
      } else if (countries.length && devTypes.length === 0) {
        newValues = newValues
          .filter((item) => countries.includes(item.country));
      } else if (countries.length === 0 && devTypes.length) {
        newValues = newValues
          .filter((item) => devTypes.includes(item.devType));
      }

      this.circles.remove();
      this.renderGraph(this.svg, this.tip, newValues);
    },
  },
};
</script>
<style scoped>
</style>
