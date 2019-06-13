import dotenv from 'dotenv'
import pool from './config';
import createQuery from './createTables';
import dropQuery from './dropTable';

dotenv.config();

const dbQuery = `${dropQuery}${createQuery}`;

pool.connect().then((client) => {
  client
    .query(dbQuery)
    .then(() => {
      client.release();
    }).catch((err) => {
      console.log(err);
    });
})
  .catch((error) => {
    /* eslint-disable no-console */
    console.log(error);
  });
 
 