import Validator from '../validator/Validate';

class Sanitize {

  static signupSanitizer(req, res, next) {
    const {
      first_name, last_name, password, email, address,
    } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });

    if (Validator.checkEmpty(email)) return response('email cannot be empty', 400);
    if (Validator.checkEmpty(last_name)) return response('lastname cannot be empty', 400);
    if (Validator.checkEmpty(password)) return response('password cannot be empty', 400);
   // if (Validator.checkEmpty(confirmPassword)) return response('confirm password cannot be empty', 400);
    if (Validator.checkEmpty(first_name)) return response('firstname cannot be empty', 400);
    if (Validator.checkEmpty(address)) return response('address cannot be empty', 400);
    //if (Validator.checkEmpty(adminSecret)) return response('adminSecret cannot be empty', 400);
    //if (!Validator.isMatchingPassword(password, confirmPassword)) return response('Passwords do not match', 400)
    if (!Validator.isEmail(email)) return response('invalid email', 422);
    //if (Validator.isValidParamsLength(firstname, 2)) return response('firstname must be atleast two characters long', 422);
    //if (Validator.isValidParamsLength(lastname, 2)) return response('lastname must be atleast two characters long', 422);
   // if (Validator.isValidParamsLength(password, 5)) return response('password must be greater than five characters', 422);
    if (Validator.isNotNumber(first_name)) return response('firstname cannot  contain number', 422);
    if (Validator.isNotNumber(last_name)) return response('lastname cannot contain numbers', 422);


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
      model, manufacturer, body_type, price, state,
    } = req.body;


    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(model)) return response('Please enter car model', 422);
    if (Validator.checkEmpty(manufacturer)) return response('Please enter car manufacturer', 422);
    if (Validator.checkEmpty(body_type)) return response('Please enter a body type', 422);
    if (Validator.checkEmpty(price)) return response('Please enter price', 422);
    if (Validator.checkEmpty(state)) return response('Please enter car state! e.g used or new', 422);
    //if (!Validator.validImage(req.files[0].originalname)) return response('Only image files are allowed', 422);
    return next();
  }

  static OrderSanitizer(req, res, next) {
    const { car_id, amount } = req.body;
    console.log(req.body)
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(car_id)) return response('Please enter car id', 422);
    if (Validator.checkEmpty(amount)) return response('Please enter an offer', 422);
    //if (isNaN(priceOffered)) return response('Please enter a valid offer', 422);

    return next();
  }

  static updateOrderSanitizer(req, res, next) {
    const { price } = req.body;
    const { id } = req.params;
    console.log(req.body);
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(price)) return response('Please enter a new Offer', 422);
    if (isNaN(price)) return response('Please enter a valid Offer', 422);
    if (isNaN(id)) return response('Invalid Request', 400);

    return next();
  }

  /**
  @params - Check for an invalid request params;
  @requestBody- Check  for empty input
  * */

  static updateStatusSanitizer(req, res, next) {
    const { status } = req.body;
    const { id } = req.params;
    
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(status)) return response('Please enter a valid status. e.g "new" or "used', 422);
    // eslint-disable-next-line no-restricted-globals
    if (status !== 'sold') return response('You Can only update a sold car', 400);
    if (isNaN(id)) return response('Invalid URL parameter', 400);
    if (Validator.isNotNumber(status)) return response('status cannot contain number', 422);

    return next();
  }

  static updatePriceSanitizer(req, res, next) {
    const { price } = req.body;
    console.log(req.body);
    const { id } = req.params;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (Validator.checkEmpty(price)) return response('Please enter price', 422);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) return response('Invalid URL parameter', 400);
  if (isNaN(price)) return response('Enter a valid price number', 422);

    return next();
  }

  static getSpecificCar(req, res, next) {
    const { id } = req.params;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (isNaN(id)) return response('Invalid URL parameter', 400);

    return next();
  }

  static querySanitizer(req, res, next) {
    const { max_price, min_price } = req.query;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (max_price !== undefined && isNaN(max_price)) return response('max_price entered is not a valid entry', 422);
    if (min_price !== undefined && isNaN(min_price)) return response('min_price entered is not a valid entry', 422);

    return next();
  }

  static flagSanitizer(req, res, next) {
    const { carId, reason, description } = req.body;
    const response = (error, code) => res.status(code).send({ status: 'error', error });
    if (!carId) return response('Car id was not specified', 422);
    if (!reason) return response('your reason was not specified', 422);
    if (!description) return response('Your report description was not specified', 422);
    if (isNaN(carId)) return response('Car id must be an integer', 422);
    if (Validator.itsaNumber(reason)) return response('Reason cannot be an integer',422);
    if (Validator.itsaNumber(description)) return response('Description cannot be an integer',422);

    return next();
  }
}

export default Sanitize;
