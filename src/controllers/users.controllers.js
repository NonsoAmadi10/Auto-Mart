import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database/config';
/**
 @class authcontroller- authorizes and authenticates users of this application
 */

class AuthController {
  /**
  * @handles registration of new users to the application
 */

  static async signupController(req, res) {
    const {
      firstname, lastname, email, password, address, adminSecret,
    } = req.body;
    const isAdmin = adminSecret === process.env.ADMIN_SECRET ? 't' : 'f';

    try {
      /**
    * Check if the email used exist
    */

      const existingUser = await pool.query('SELECT * from users WHERE email=$1;', [email]);
      if (existingUser.rowCount) {
        return res.status(409).send({
          status: 'error',
          error: 'User exist already',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const registerUser = await pool.query('INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [firstname, lastname, email, hashedPassword, address, isAdmin]);

      return jwt.sign(registerUser.rows[0], process.env.JWT_SECRET, (err, token) => {
        if (err) console.log(err);
        res.status(201).send({
          status: 'success',
          data: {
            token,
            id: registerUser.rows[0].id,
            first_name: registerUser.rows[0].first_name,
            last_name: registerUser.rows[0].last_name,
            email: registerUser.rows[0].email,
            address: registerUser.rows[0].address,
          },
        });
      });

    } catch (error) {
      return res.status(400).send({ error: error.message });
    }

  }

  /**
   * @controller - handles the loggin in of registered user
   * It will not log an unregistered user in
   * It will not login on wrong password credentials
   */

  static async signinController(req, res) {
    const { email, password } = req.body;

    try {
      const userExist = await pool.query('SELECT * FROM users WHERE email=$1;', [email]);
      if (userExist.rowCount <= 0) {
        return res.status(404).send({
          status: 'error',
          error: 'invalid credentials! No user exists!',
        });
      }

      const comparePasswords = bcrypt.compareSync(password, userExist.rows[0].password);
      if (!comparePasswords) {
        return res.status(400).send({
          status: 'error',
          error: 'incorrect password!',
        });
      }

      return jwt.sign(userExist.rows[0], process.env.JWT_SECRET, (err, token) => {
        if (err) console.log(err);
        res.status(200).send({
          status: 'success',
          data: {
            token,
            id: userExist.rows[0].id,
            email: userExist.rows[0].email,
            last_name: userExist.rows[0].last_name,
            first_name: userExist.rows[0].first_name,
            is_admin: userExist.rows[0].is_admin,
          },
        });
      });
    } catch (error) {
    return res.status(500).send({ error: error.message });
    }
  }

}

export default AuthController;
