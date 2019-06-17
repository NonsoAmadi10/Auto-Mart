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
    adminStatus: 't'
  },
  validUser: {
    id: 2,
    firstname: 'nonso',
    lastname: 'Amadi',
    address: '234567, gdfcvcsyh',
    email: 'amadi@aol.com',
    password: 'pixel2user',
    confirmPassword: 'pixel2user',
    adminStatus: 'f',
  },
};


export {
 generateValidToken,
 users,
}