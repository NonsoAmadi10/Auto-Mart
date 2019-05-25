import Validator from '../validator/Validate';

class Sanitize {

  static signupSanitizer(req, res, next) {
    const {
      firstname, lastname, password, email,
    } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });

    if (Validator.checkEmpty(email)) return response('email cannot be empty', 400);
    if (Validator.checkEmpty(lastname)) return response('lastname cannot be empty', 400);
    if (Validator.checkEmpty(password)) return response('password cannot be empty', 400);
    if (Validator.checkEmpty(firstname)) return response('firstname cannot be empty', 400);
    if (!Validator.isEmail(email)) return response('invalid email', 422);
    if (Validator.isValidParamsLength(firstname, 2)) return response('firstname must be atleast two characters long', 422);
    if (Validator.isValidParamsLength(lastname, 2)) return response('lastname must be atleast two characters long', 422);
    if (Validator.isValidParamsLength(password, 5)) return response('password must be greater than five characters', 422);
    if (Validator.isNotNumber(firstname)) return response('firstname cannot  contain number', 422);
    if (Validator.isNotNumber(lastname)) return response('lastname cannot contain numbers', 422);


    return next();
  }

  static signinSanitizer(req, res, next) {
    const {
      password, email,
    } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(email)) return response('email cannot be empty', 400);
    if (Validator.checkEmpty(password)) return response('password cannot be empty', 400);
    if (!Validator.isEmail(email)) return response('invalid email', 422);

    return next();
  }

  static advertSanitizer(req, res, next) {
    const {
      model, manufacturer, bodyType, price, state
    } = req.body;
   
    
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(model)) return response('Please enter car model', 422);
    if (Validator.checkEmpty(manufacturer)) return response('Please enter car manufacturer', 422);
    if (Validator.checkEmpty(bodyType)) return response('Please enter a body type', 422);
    if (Validator.checkEmpty(price)) return response('Please enter price', 422);
    if (Validator.checkEmpty(state)) return response('Please enter car state! e.g used or new', 422);
    if (!Validator.validImage(req.files[0].originalname)) return response('Only image files are allowed', 422);
    return next();
  }
}

export default Sanitize;

