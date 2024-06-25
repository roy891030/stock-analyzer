<template>
  <div>
    <h1>Stocks Visualization</h1>
    <div ref="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import axios from 'axios';

export default {
  data() {
    return {
      stockData: []
    };
  },
  async created() {
    await this.fetchTopStocks();
    this.drawChart();
  },
  methods: {
    async fetchTopStocks() {
      const apiKey = 'cptf6phr01qnvrr8udtgcptf6phr01qnvrr8udu0';
      try {
        // 获取交易量最多的50支股票（假设API返回的数据）
        const response = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`);
        const symbols = response.data.slice(0, 50).map(stock => stock.symbol);
        
        const stockDataPromises = symbols.map(async (symbol) => {
          const quoteResponse = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
          return {
            symbol: symbol,
            name: symbol, // 实际应用中，你可能需要获取股票名称
            volume: quoteResponse.data.v, // 修改为成交量字段
            price: quoteResponse.data.c
          };
        });

        this.stockData = await Promise.all(stockDataPromises);
        this.stockData = this.stockData.filter(data => data.volume && data.price); // 确保过滤掉没有数据的股票
        console.log('Fetched stock data:', this.stockData); // 调试输出

        this.drawChart(); // 在数据获取完后调用绘图函数
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    },
    drawChart() {
      if (!this.stockData.length) {
        console.log('No stock data available to draw chart.'); // 调试输出
        return;
      }

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      d3.select(this.$refs.chart).selectAll('*').remove(); // 清空之前的图表

      const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      x.domain([0, d3.max(this.stockData, d => d.volume)]);
      y.domain([0, d3.max(this.stockData, d => d.price)]);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));

      const tooltip = d3.select(this.$refs.chart).append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      svg.selectAll('circle')
        .data(this.stockData)
        .enter().append('circle')
        .attr('r', 5)
        .attr('cx', d => x(d.volume))
        .attr('cy', d => y(d.price))
        .attr('fill', 'blue')
        .on('mouseover', function(event, d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(`${d.name}<br/>${d.symbol}`)
            .style('left', (event.pageX + 5) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
      
      console.log('Chart drawn with data:', this.stockData); // 调试输出
    }
  }
};
</script>

<style>
.tooltip {
  position: absolute;
  text-align: center;
  width: 60px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}

svg {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  shape-rendering: crispEdges;
}
</style>
