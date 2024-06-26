<template>
  <div>
    <h1>Stock List</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Listing Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.id">
          <td>{{ stock.name }}</td>
          <td>{{ stock.listing_date }}</td>
          <td>{{ stock.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3001/api/stocks'); // 更新端口为 3001
        this.stocks = response.data;
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
