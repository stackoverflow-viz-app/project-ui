<template>
<v-card class="filter-section-card" outlined>
      <v-card-text class="filter-card-text">
        <h3>Legend</h3>
        <br />
        <svg id="legend"></svg>
      </v-card-text>
    </v-card>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['height', 'selectedDevTypes'],
  watch: {
    selectedDevTypes(newArray, oldArray) {
      const selDevTypes = newArray.length > 0
        ? [...newArray].sort((a, b) => a.localeCompare(b))
        : [...this.devTypes].sort((a, b) => a.localeCompare(b));
      this.renderNewValues(selDevTypes);
    },
  },
  data() {
    return {
      svg: null,
      dots: null,
      labels: null,
      devTypes: ['Developer, back-end', 'Developer, full-stack', 'Database administrator', 'Academic researcher', 'Data or business analyst', 'Developer, front-end', 'Data scientist & ML', 'DevOps specialist'],
    };
  },
  mounted() {
    this.initSvg();
  },
  methods: {
    initSvg() {
      this.svg = d3
        .select('#legend')
        .attr('width', '100%')
        .attr('height', this.height);

      this.renderSvg([...this.devTypes].sort((a, b) => a.localeCompare(b)));
    },
    renderSvg(data) {
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const size = 10;
      this.dots = this.svg.selectAll('mydots')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 10)
        .attr('y', (d, i) => 10 + i * (size + 5)) // 100 is where the first dot appears. 25 is the distance between dots
        .attr('width', size)
        .attr('height', size)
        .style('fill', (d) => color(d));

      this.labels = this.svg.selectAll('mylabels')
        .data(data)
        .enter()
        .append('text')
        .attr('x', 10 + size * 1.2)
        .attr('y', (d, i) => 10 + i * (size + 5) + (size / 2)) // 100 is where the first dot appears. 25 is the distance between dots
        .style('fill', (d) => color(d))
        .text((d) => d)
        .attr('text-anchor', 'left')
        .style('alignment-baseline', 'middle');
    },
    getWidth() {
      return d3.select('#legend')
        .style('width')
        .slice(0, -2);
    },
    renderNewValues(devTypes) {
      this.dots.remove();
      this.labels.remove();

      this.renderSvg(devTypes);
    },
  },
};
</script>
<style scoped>
</style>
