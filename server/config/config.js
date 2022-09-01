require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: false
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
