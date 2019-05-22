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
}

export default UserAction;
