const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('stock_analysis', 'root', 'roy891030891030', {
  host: 'localhost',
  dialect: 'mysql'
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
});

sequelize.sync();

module.exports = {
  sequelize,
  Stock,
  HistoricalData
};
