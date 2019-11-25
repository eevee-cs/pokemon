/**
 * This file is used as the first step of resetting the psql database.
 * It drops the two tables in the psql database.
 */

const Pool = require('./dbConnection');

// using an async function to ensure that these two drops occur before the next script is run.
async function resetDb() {
  console.log('resetting psql database...');
  await Pool.connect()
    .then(async (client) => {
      await client.query('DROP TABLE IF EXISTS ```TABLE NAME``` CASCADE').then(() => {
        console.log('TABLENAME table dropped');
        client.release();
      });
    });

  // line break in console
  console.log('');
}

resetDb();
