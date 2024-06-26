const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('stock_analysis', 'root', 'roy891030891030', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: console.log
});

const Stock = sequelize.define('Stock', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listing_date: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true // 启用时间戳
});

const HistoricalData = sequelize.define('HistoricalData', {
  stock_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Stock,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  open: {
    type: DataTypes.FLOAT
  },
  high: {
    type: DataTypes.FLOAT
  },
  low: {
    type: DataTypes.FLOAT
  },
  close: {
    type: DataTypes.FLOAT
  },
  adjusted_close: {
    type: DataTypes.FLOAT
  },
  volume: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true // 启用时间戳
});

sequelize.sync();

app.get('/api/stocks', async (req, res) => {
  try {
    console.log('Fetching stocks...');
    const stocks = await Stock.findAll();
    console.log('Stocks fetched successfully:', stocks);
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 获取指定股票的历史数据
app.get('/api/stocks/:id/history', async (req, res) => {
    const stockId = req.params.id;
    try {
      const history = await HistoricalData.findAll({
        where: {
          stock_id: stockId
        }
      });
      res.json(history);
    } catch (error) {
      console.error('Error fetching history:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
