import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userservices from '../services/users.services';

dotenv.config();

class UserControllers {
  static signupUser(req, res) {
    const user = req.body;
    const signup = userservices.signup(user);
    if (!signup) {
      res.status(409).send({
        status: 'error',
        error: 'email already exist',
      });
    }

    return jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
      res.status(201).send({
        status: 'success',
        data: {
          token,
          ...signup,
        },


      });
    });
  }
}

export default UserControllers;
