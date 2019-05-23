import Validator from '../validator/Validate';

class Sanitize {

  static signupSanitizer(req, res, next) {
    const {
      firstname, lastname, password, email,
    } = req.body;
    const response = error => res.status(400).send({ status: 'error', error });

    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(lastname)) return response('lastname cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (Validator.checkEmpty(firstname)) return response('firstname cannot be empty');
    if (!Validator.isEmail(email)) return response('invalid email');
    if (Validator.isValidParamsLength(firstname, 2)) return response('firstname must be atleast two characters long');
    if (Validator.isValidParamsLength(lastname, 2)) return response('lastname must be atleast two characters long');
    if (Validator.isValidParamsLength(password, 5)) return response('password must be greater than five characters');
    if (Validator.isNotNumber(firstname)) return response('firstname cannot  contain number');
    if (Validator.isNotNumber(lastname)) return response('lastname cannot contain numbers');


    return next();
  }

  static signinSanitizer(req, res, next) {
    const {
      password, email,
    } = req.body;
    const response = error => res.status(400).send({ status: 'error', error });
    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (!Validator.isEmail(email)) return response('invalid email');

    return next();
  }
}

export default Sanitize;

