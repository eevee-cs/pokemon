const { Pool } = require('pg');

const username = 'graphquill';
const password = 'graphquill';

// start a new pool of connections
const pool = new Pool({
  connectionString: `postgres://${username}:${password}!!@localhost/graphquillpsql`,
});

// export the pool, it can be queried directly, or clients/connections can be "checked out",
// the connection/client can be queried, and then "released"
module.exports = pool;
