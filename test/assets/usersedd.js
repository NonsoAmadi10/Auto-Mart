import jwt from 'jsonwebtoken';

function generateValidToken(userObject) {
  return jwt.sign({
    id: userObject.id,
    firstname: userObject.name,
    email: userObject.email,
    userStatus: userObject.adminSecret === process.env.ADMIN_SECRET ? 'admin' : 'customer',
  }, process.env.JWT_SECRET).toString();
}

const users = {
  admin: {
    id: 1,
    firstname: 'Kizito',
    lastname: 'johnny',
    address: '239, ikoroduroad',
    email: 'hovkard@gmail.com',
    password: 'suppersecurepassword',
    confirmPassword: 'suppersecurepassword',
    adminStatus: 't'
  },
  validUser: {
    id: 2,
    name: 'James',
    email: 'daniel@james.com',
    password: 'pixel2user',
    confirmPassword: 'pixel2user',
    adminStatus: 'f',
  },
};


export {
 generateValidToken,
 users,
}