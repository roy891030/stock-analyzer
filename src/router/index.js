import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import StocksVisualization from '../views/StocksVisualization.vue';
import RecommendedStocks from '../views/RecommendedStocks.vue';
import AICalculator from '../views/AICalculator.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/stocks-visualization', name: 'StocksVisualization', component: StocksVisualization },
  { path: '/recommended-stocks', name: 'RecommendedStocks', component: RecommendedStocks },
  { path: '/ai-calculator', name: 'AICalculator', component: AICalculator }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
