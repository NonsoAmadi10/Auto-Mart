import users from '../utils/users.db';
import Usermodel from '../model/user.model';


class UserAction {
  static signup(userdata) {
    if (users.find(item => item.email === userdata.email)) return false;
    const newUser = new Usermodel();
    newUser.firstname = userdata.firstname;
    newUser.email = userdata.email;
    newUser.lastname = userdata.lastname;
    newUser.password = userdata.password;
    newUser.is_admin = userdata.is_admin;

    const newUserEntry = {
      id: users.length + 1,
      firstname: newUser.firstname,
      email: newUser.email,
      lastname: newUser.lastname,
      password: newUser.password,
      is_admin: newUser.is_admin,
    };

    users.push(newUserEntry);
    const userdetails = {
      id: newUserEntry.id,
      firstname: newUserEntry.firstname,
      email: newUserEntry.email,
      lastname: newUserEntry.lastname,
    };
    return userdetails;
  }

  static signin(userdata) {
    const findUser = users.find((user => user.email === userdata.email && user.password === userdata.password));
    if (!findUser) return false;
    const userExist = {
      id: findUser.id,
      email: findUser.email,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      is_admin: findUser.is_admin,
    };

    return userExist;
  }
}

export default UserAction;
