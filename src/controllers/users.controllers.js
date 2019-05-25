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

    return jwt.sign(signup, process.env.JWT_SECRET, (err, token) => {
      res.status(201).send({
        status: 'success',
        data: {
          token,
          ...signup,
        },


      });
    });
  }

  static signinUser(req, res) {
    const user = req.body;
    const signin = userservices.signin(user);
    if (!signin) {
      res.status(404).send({
        status: 'error',
        error: 'invalid credentials! No user exists!',
      });
    }

    return jwt.sign(signin, process.env.JWT_SECRET, (err, token) => {
      res.status(200).send({
        status: 'success',
        data: {
          token,
          ...signin,
        },
      });
    });
  }
}

export default UserControllers;
