const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "gaurav@5247",
  port: 5432,
  database: "devhub",
});

module.exports = pool;
