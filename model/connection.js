const mysql = require('mysql2/promise');
require('dotenv').config();
const { Pool } = require('pg');

// const connection = mysql.createPool({
//   host: process.env.HOSTNAME,
//   port: process.env.PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: pucbeerdb,
// });

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = connection;
