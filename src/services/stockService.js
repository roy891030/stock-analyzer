import yahooFinance from 'yahoo-finance2';

export async function getStockData(symbol) {
  try {
    const queryOptions = { period1: '2023-01-01', period2: '2024-01-01', interval: '1d' };
    const result = await yahooFinance.historical(symbol, queryOptions);
    return result;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
}
