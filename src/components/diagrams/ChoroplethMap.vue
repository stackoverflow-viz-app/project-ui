<template>
  <svg></svg>
</template>

<script>
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import { geoRobinson } from 'd3-geo-projection';

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
      const tip = d3Tip()
        .attr('class', 'd3-tip')
        .html((d) => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span>`
        + `<strong>Respondents: </strong><span class='details'>${d.respondent}</span>`);

      const chart = d3.select('svg')
        .attr('height', this.height)
        .call(d3.zoom().on('zoom', () => {
          chart.attr('transform', d3.event.transform);
        }))
        .append('g');

      // Map and projection
      const pathGenerator = d3.geoPath().projection(geoRobinson());

      // TODO: Props domain and range
      const colorScale = d3.scaleThreshold()
        .domain([
          50,
          100,
          200,
          300,
          400,
          500,
          1000,
          3000,
          5000,
          10000,
          20000,
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
          'rgb(32, 51, 84)',
          'rgb(3,19,43)',
        ]);

      chart.call(tip);

      Promise.all([
        d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
        d3.tsv('./data/contribution.tsv'),
      ]).then(
        (d) => this.renderMap(chart, pathGenerator, colorScale, tip, d[0], d[1]),
      );
    },
    renderMap(chart, pathGenerator, colorScale, tip, data, respondent) {
      const respondentById = {};

      respondent.forEach((d) => { respondentById[d.id] = d.respondent; });
      /* eslint-disable no-param-reassign */
      data.features.forEach((d) => { d.respondent = respondentById[d.id]; });

      chart.append('g')
        .attr('class', 'countries')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .style('fill', (d) => colorScale(respondentById[d.id]))
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style('opacity', 0.8)
        // tooltips
        .style('stroke', 'white')
        .style('stroke-width', 0.3)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
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
</style>
