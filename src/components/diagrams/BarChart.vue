<template>
  <div id="bar_chart"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['data', 'height', 'width', 'margin', 'x-title', 'y-title'],
  data() {
    return {};
  },
  mounted() {
    this.renderChart(this.data);
  },
  methods: {
    renderChart(dataVal) {
      const chartWidth = this.width - this.margin;
      const chartHeight = this.height - this.margin;

      const chart = d3
        .select('#bar_chart')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

      const yScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(dataVal, (d) => d.y) + 50]);

      chart
        .append('g')
        .attr('transform', `translate(${this.margin}, 0)`)
        .call(d3.axisLeft().scale(yScale));

      const xScale = d3.scaleBand()
        .range([this.margin, (chartWidth)])
        .domain(dataVal.map((s) => s.x))
        .padding(0.4);

      chart
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

      const barGroups = chart
        .selectAll('.bar')
        .data(dataVal)
        .enter();

      barGroups
        .append('rect')
        .classed('bar', true)
        .attr('x', (data) => xScale(data.x))
        .attr('y', (data) => yScale(data.y))
        .attr('width', xScale.bandwidth())
        .attr('height', (data) => (chartHeight) - yScale(data.y))
        .style('fill', 'steelblue')
        .style('opacity', 1);

      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', -((this.width - this.margin) / 2))
        .attr('y', this.margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(this.yTitle);

      chart
        .append('text')
        .attr('class', 'label')
        .attr('x', chartWidth / 2 + this.margin)
        .attr('y', chartHeight + this.margin / 1.7)
        .attr('text-anchor', 'middle')
        .text(this.xTitle);
    },
  },
};
</script>
<style scoped>
</style>
