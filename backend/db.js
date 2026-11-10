const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bb',
  password: 'postgres',
  port: 6543,
});

module.exports = pool;