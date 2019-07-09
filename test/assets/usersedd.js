import jwt from 'jsonwebtoken';

function generateValidToken(userObject) {
  return jwt.sign(userObject , process.env.JWT_SECRET).toString();
}

const users = {
  admin: {
    id: 1,
    firstname: 'Kizito',
    lastname: 'johnny',
    address: '239, ikoroduroad',
    email: 'amadi@gmail.com',
    password: 'suppersecurepassword',
    confirmPassword: 'suppersecurepassword',
    is_admin: 't'
  },
  validUser: {
    id: 2,
    first_name: 'nonso',
    last_name: 'Amadi',
    address: '234567, gdfcvcsyh',
    email: 'amadi@aol.com',
    password: 'pixel2user',
    confirmPassword: 'pixel2user',
    is_admin: 'f',
  },
};


export {
 generateValidToken,
 users,
}