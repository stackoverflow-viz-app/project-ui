<template>
  <div id="gapminder_chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['height', 'width', 'margin', 'x-title', 'y-title'],
  data() {
    return {};
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chart = d3
        .select('#gapminder_chart')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

      Promise.all([
        d3.csv('http://localhost:8080/data/gapminder.csv'),
      ]).then(
        (d) => this.renderGapMinder(chart, d[0]),
      );
    },
    renderGapMinder(svg, dataWeLoaded) {
      const xScale = d3.scaleLinear()
        .domain([0, 40000])
        .range([100, 800]);
      const yScale = d3.scaleLinear()
        .domain([30, 80])
        .range([400, 100]);
      const rScale = d3.scaleSqrt()
        .range([0, 50]);
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      rScale.domain([0, d3.max(dataWeLoaded, (d) => +d.population)]);
      svg.selectAll('circle')
        .data(dataWeLoaded)
        .enter()
        .append('circle')
        .attr('cy', (d) => yScale(+d.lifeexp))
        .attr('cx', (d) => xScale(+d.gdp))
        .attr('r', (d) => rScale(+d.population))
        .attr('fill-opacity', 0.4)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 1)
        .attr('fill', (d) => colorScale(d.region))
        // eslint-disable-next-line no-unused-vars
        .on('mouseover', function (d) {
          d3.select(this)
            .attr('fill', 'yellow')
            .transition()
            // eslint-disable-next-line no-shadow
            .attr('r', (d) => 1.5 * rScale(+d.population));
        })
        // eslint-disable-next-line no-unused-vars
        .on('mouseout', function (d) {
          d3.select(this)
            // eslint-disable-next-line no-shadow
            .attr('fill', (d) => colorScale(d.region))
            .transition()
            // eslint-disable-next-line no-shadow
            .attr('r', (d) => rScale(+d.population));
        });

      const leftAxis = d3.axisLeft(yScale);
      const bottomAxis = d3.axisBottom(xScale);

      svg.append('g')
        .attr('transform', 'translate(100,0)')
        .call(leftAxis);

      svg.append('g')
        .attr('transform', 'translate(0,400)')
        .call(bottomAxis);

      svg.append('text')
        .attr('class', 'label')
        .text(this.yTitle)
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('x', -(this.width) / 3.5)
        .attr('y', this.margin)
        .attr('transform', 'rotate(-90)');

      svg.append('text')
        .attr('class', 'label')
        .text(this.xTitle)
        .attr('font-size', 10)
        .attr('font-family', 'sans-serif')
        .attr('transform', 'translate(770,430)');
    },
  },
};
</script>
<style scoped>
</style>
