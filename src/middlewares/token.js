import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if(typeof authorization !== 'undefined') {
    const bearer = authorization.split(' ');
    const token = bearer[1];
    token.replace(/\s/g, '');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  return next();
}


  res.status(401).send({ status: 'error', error: 'You must be logged in to use this route' });

};

export default authorize;
