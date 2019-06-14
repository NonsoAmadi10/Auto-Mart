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
 firstname, lastname, email, password, address, adminSecret 
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
      const registerUser = await pool.query('INSERT INTO users(firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [firstname, lastname, email, hashedPassword, address, isAdmin]);

      return jwt.sign(registerUser.rows[0], process.env.JWT_SECRET, (err, token) => {
        if (err) console.log(err);
        res.status(201).send({
          status: 'success',
          data: {
            token,
            id: registerUser.rows[0].id,
            firstname: registerUser.rows[0].firstname,
            lastname: registerUser.rows[0].lastname,
            email: registerUser.rows[0].email,
            address: registerUser.rows[0].address,
          }
        });
      });

    } catch (error) {
      return res.status(400).send({ error: error.message });
    }

  }

}

export default AuthController;
