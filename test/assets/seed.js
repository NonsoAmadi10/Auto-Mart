import bcrypt from 'bcryptjs';
import '@babel/polyfill';
import pool from '../../src/database/config';
import createQuery from '../../src/database/createTables';
import dropQuery from '../../src/database/dropTable';

const createTables = async () => {
  const password = bcrypt.hashSync('biggie', 10)
  const userPass = bcrypt.hashSync('1234jaycee', 10)
  await pool.query(`${dropQuery}; ${createQuery};`);

 const newUser = await pool.query('INSERT INTO users (firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', ['Chinonso', 'Amadi', 'amadi@gmail.com', password,'239, Epic Towers, ikorodu road', 't']);
 const newUser2 = await pool.query('INSERT INTO users (firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', ['nonso', 'Amadi', 'amadi@aol.com', userPass, '239, Epic Towers, ikorodu road', 'f']);
  const car = await pool.query('INSERT INTO cars(ownerId, ownerEmail, createdon, state, status, price, manufacturer, model, body_type, image_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING * ;', [newUser.rows[0].id, newUser.rows[0].email, new Date(), 'new', 'available', 200000.089, 'bmq', 'ferrai', 'truck', 'https://classcar.com/car?=toyota', false]);

  const createdOn = new Date().toLocaleDateString();

  const makeOrder = await pool.query('INSERT into orders(car_id, buyer_id, createdon ,amountOffered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [car.rows[0].id, newUser2.rows[0].id, createdOn, 30000.00, 'pending']);
}



export default createTables;