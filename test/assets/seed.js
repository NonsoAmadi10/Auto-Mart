import bcrypt from 'bcryptjs';
import '@babel/polyfill';
import pool from '../../src/database/config';
import createQuery from '../../src/database/createTables';
import dropQuery from '../../src/database/dropTable';

const createTables = async () => {
  const password = bcrypt.hashSync('biggie', 10)
  const userPass = bcrypt.hashSync('1234jaycee', 10)
  await pool.query(`${dropQuery}; ${createQuery};`);
  await pool.query('INSERT INTO users (firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6)', ['Chinonso', 'Amadi', 'amadi@gmail.com', password,'239, Epic Towers, ikorodu road', 't']);
  await pool.query('INSERT INTO users (firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6)', ['nonso', 'Amadi', 'amadi@aol.com', userPass, '239, Epic Towers, ikorodu road', 'f']);
  await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11);', [1, 'amadi@gmail.com', new Date(), 'new', 'available', 200000.089, 'bmq', 'ferrai', 'truck', 'https://classcar.com/car?=toyota', false]);
}



export default createTables;