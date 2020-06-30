<template>
  <div id = 'hbarchart'>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['data', 'height', 'width', 'margin', 'hx-title', 'hy-title'],

  mounted() {
    this.renderChart(this.data);
  },
  methods: {
    renderChart(dataVal) {
      const chartWidth = this.width - this.margin;
      const chartHeight = this.height - this.margin;

      const chart = d3.select('#hbarchart')
        .append('svg')
        .attr('height', this.height)
        .attr('width', this.width);

      const yScale = d3.scaleBand()
        .range([chartHeight, 0])
        .domain(dataVal.map((dataPoint) => dataPoint.x))
        .padding(0.4);

      const xScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([0, d3.max(dataVal, (d) => d.y) + 50]);

      const xAxis = d3.axisBottom()
        .scale(xScale);
      chart.append('g')
        .attr('transform', `translate(${this.margin},${chartHeight})`)
        .call(xAxis);

      const yAxis = d3.axisLeft()
        .scale(yScale);
      chart.append('g')
        .attr('transform', `translate(${this.margin},0)`)
        .call(yAxis);

      const barGroup = chart.selectAll('.bar')
        .data(dataVal)
        .enter();

      barGroup
        .append('rect')
        .classed('bar', true)
        .attr('width', (data) => xScale(data.y))
        .attr('height', yScale.bandwidth())
        .attr('y', (data) => yScale(data.x))
        .attr('transform', `translate(${this.margin},0)`)
        .style('fill', 'steelblue')
        .style('opacity', 1);

      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -((this.width - this.margin) / 2))
        .attr('y', this.margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(this.hyTitle);

      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', chartWidth / 2 + this.margin)
        .attr('y', chartHeight + this.margin / 1.7)
        .attr('text-anchor', 'middle')
        .text(this.hxTitle);
    },
  },
};
</script>
<style scoped>
</style>
