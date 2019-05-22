import users from '../utils/users.db';
import Usermodel from '../model/user.model';


class UserAction {

  static signup(userdata) {
   if(users.find(email=>email == userdata.email) return false)
    const newUser = new Usermodel();
    newUser.firstName = userdata.firstname;
    newUser.email = userdata.email;
    newUser.lastname = userdata.lastname;
    newUser.password = userdata.password;
    newUser.is_admin = userdata.is_admin;

    const newUserEntry = {
      id: users.length + 1,
      firstname: newUser.firstName,
      email: newUser.email,
      lastname: newUser.lastName,
      password: newUser.password,
      is_admin: newUser.is_admin,
    };

    users.push(newUserEntry);
    return newUserEntry;


  }
}
