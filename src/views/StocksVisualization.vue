<template>
  <div>
    <h1>Stock Volume vs. Price</h1>
    <div ref="chart"></div>
  </div>
</template>

<script>
import axios from 'axios';
import * as d3 from 'd3';

export default {
  data() {
    return {
      stocks: []
    };
  },
  async created() {
    await this.fetchStocks();
  },
  methods: {
    async fetchStocks() {
      try {
        const response = await axios.get('http://localhost:3001/api/stocks');
        const stockIds = response.data.map(stock => stock.id);
        console.log('Fetched stock IDs:', stockIds);

        const historicalDataResponses = await Promise.all(
          stockIds.map(id => axios.get(`http://localhost:3001/api/stocks/${id}/history`)
            .then(response => response.data)
            .catch(error => {
              console.error(`Error fetching history for stock ID ${id}:`, error);
              return []; // 返回空数组以过滤掉错误请求
            })
          )
        );

        this.stocks = historicalDataResponses.flatMap(data => data)
          .filter(data => data.date === '2024-06-26');
        console.log('Filtered stocks for 2024-06-26:', this.stocks);

        if (this.stocks.length > 0) {
          this.createChart();
        } else {
          console.log('No stock data available for 2024-06-26');
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    },
    createChart() {
      const data = this.stocks;
      console.log('Data to be visualized:', data); // 调试输出

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.volume) || 1])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.close) || 1])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.volume))
        .attr('cy', d => y(d.close))
        .attr('r', 5)
        .style('fill', '#69b3a2')
        .on('mouseover', (event, d) => {
          d3.select(event.target)
            .attr('r', 7)
            .style('fill', '#ff6347');
          svg.append('text')
            .attr('id', 'tooltip')
            .attr('x', x(d.volume) + 10)
            .attr('y', y(d.close) - 10)
            .text(`Stock ID: ${d.stock_id}, Volume: ${d.volume}, Close: ${d.close}`);
        })
        .on('mouseout', (event) => {
          d3.select(event.target)
            .attr('r', 5)
            .style('fill', '#69b3a2');
          d3.select('#tooltip').remove();
        });
    }
  }
};
</script>

<style scoped>
svg {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  shape-rendering: crispEdges;
}

.axis text {
  font-size: 12px;
}
</style>
