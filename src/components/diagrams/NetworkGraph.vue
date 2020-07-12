<template>
  <svg id='graph'></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['height', 'selectedCountries', 'selectedDevTypes'],
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
      immutableNodes: [],
      immutableLinks: [],
      simulation: null,
      node: null,
      link: null,
      container: null,
      svg: null,
      color: d3.scaleOrdinal(d3.schemeCategory10),
    };
  },
  mounted() {
    this.initGraph();
    this.readData();
  },
  methods: {
    initGraph() {
      this.svg = d3
        .select('#graph')
        .attr('width', '100%')
        .attr('height', this.height);

      this.container = this.svg.append('g');

      this.svg.call(d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', () => { this.container.attr('transform', d3.event.transform); }));
    },
    readData() {
      Promise.all([
        d3.json('./data/network_graph.json'),
      ]).then(
        (d) => {
          // eslint-disable-next-line prefer-destructuring
          // eslint-disable-next-line no-shadow
          this.immutableNodes = d[0].nodes.map((d) => Object.create(d));
          // eslint-disable-next-line no-shadow
          this.immutableLinks = d[0].links.map((d) => Object.create(d));
          this.renderGraph(this.container, d[0]);
        },
      );
    },
    renderGraph(svg, data) {
      const links = data.links.map((d) => Object.create(d));
      const nodes = data.nodes.map((d) => Object.create(d));

      this.simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id((d) => d.name))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.getWidth() / 2, this.height / 2));

      this.link = svg.append('g').attr('class', 'links')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.2)
        .selectAll('line')
        .data(links)
        .enter()
        .append('line');

      this.node = svg.append('g').attr('class', 'nodes')
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g');

      this.node.append('circle')
        .attr('r', (d) => 2 * d.size)
        .attr('fill', this.colorScale)
        .call(this.dragMethod(this.simulation));

      this.node.append('text')
        .text((d) => d.name);

      this.simulation.nodes(nodes).on('tick', this.ticked);
      this.simulation.force('link').links(links);
    },
    dragMethod(simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        // eslint-disable-next-line no-param-reassign
        d.fx = d.x;
        // eslint-disable-next-line no-param-reassign
        d.fy = d.y;
      }

      function dragged(d) {
        // eslint-disable-next-line no-param-reassign
        d.fx = d3.event.x;
        // eslint-disable-next-line no-param-reassign
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        // eslint-disable-next-line no-param-reassign
        d.fx = null;
        // eslint-disable-next-line no-param-reassign
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    },
    // eslint-disable-next-line no-unused-vars
    ticked(d) {
      this.link
        // eslint-disable-next-line no-shadow
        .attr('x1', (d) => d.source.x)
        // eslint-disable-next-line no-shadow
        .attr('y1', (d) => d.source.y)
        // eslint-disable-next-line no-shadow
        .attr('x2', (d) => d.target.x)
        // eslint-disable-next-line no-shadow
        .attr('y2', (d) => d.target.y);
      this.node
        // eslint-disable-next-line no-shadow
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    },
    colorScale(d) {
      return this.color(d.group);
    },
    getWidth() {
      return d3.select('#graph')
        .style('width')
        .slice(0, -2);
    },
    renderGraphNewValues(countries, devTypes) {
      const nodes = this.immutableNodes
        .filter((item) => countries.every((c) => item.country.includes(c)))
        .filter((item) => devTypes.every((dev) => item.devType.includes(dev)));
      const links = this.immutableLinks
        .filter((item) => countries.every((c) => item.country.includes(c)))
        .filter((item) => devTypes.every((dev) => item.devType.includes(dev)));
      const finalObj = { nodes, links };
      this.link.remove();
      this.node.remove();
      this.renderGraph(this.container, finalObj);
    },
  },
};
</script>
<style scoped>

</style>
