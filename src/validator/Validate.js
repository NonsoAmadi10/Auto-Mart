class Validate {
  /**
   * Check if provided email has a valid email address formatting
   * @param {string} email - email address to be validated
   * @returns {boolean} - true is email is properly formatted, false if otherwise
   */
  static isEmail(email) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email.trim().toLowerCase());
  }

  static isValidParamsLength(param, length) {
    return param.length < length;
  }


  
  static checkEmpty(input) {
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

  static isNotNumber(name) {
    const re = /[0-9]/g;
    const testName = re.test(name.trim().toLowerCase());
    return testName;
  }
}

export default Validate;
