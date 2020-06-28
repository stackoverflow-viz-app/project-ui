<template>
  <svg></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['height'],
  data() {
    return {};
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chart = d3.select('svg')
        .attr('height', this.height);

      // Map and projection
      const projection = d3.geoMercator();
      const pathGenerator = d3.geoPath().projection(projection);

      // Data and color scale
      const colorScheme = d3.schemeReds[6];
      colorScheme.unshift('#eee');

      // eslint-disable-next-line no-unused-vars
      const colorScale = d3.scaleThreshold()
        .domain([
          10000,
          100000,
          500000,
          1000000,
          5000000,
          10000000,
          50000000,
          100000000,
          500000000,
          1500000000,
        ])
        .range([
          'rgb(247,251,255)',
          'rgb(222,235,247)',
          'rgb(198,219,239)',
          'rgb(158,202,225)',
          'rgb(107,174,214)',
          'rgb(66,146,198)',
          'rgb(33,113,181)',
          'rgb(8,81,156)',
          'rgb(8,48,107)',
          'rgb(3,19,43)',
        ]);

      Promise.all([
        d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
        d3.tsv('http://localhost:8080/data/contribution.tsv'),
      ]).then(
        (d) => this.renderMap(chart, pathGenerator, colorScale, d[0], d[1]),
      );
    },
    renderMap(chart, pathGenerator, colorScale, data, population) {
      const populationById = {};

      population.forEach((d) => { populationById[d.id] = +d.population; });
      /* eslint-disable no-param-reassign */
      data.features.forEach((d) => { d.population = populationById[d.id]; });

      chart.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .style('fill', (d) => colorScale(populationById[d.id]))
        .style('stroke', 'white')
        .style('opacity', 0.8)
        .style('stroke-width', 0.3);

      chart.append('path')
        .attr('d', pathGenerator);
    },
  },
};
</script>
<style scoped>

.countries {
    fill: none;
    stroke: #fff;
    stroke-linejoin: round;
}

.legendThreshold {
      font-size: 12px;
      font-family: sans-serif;
}

.caption {
      fill: #000;
      text-anchor: start;
      font-weight: bold;
}
</style>
