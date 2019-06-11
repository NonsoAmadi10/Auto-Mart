# Auto-Mart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

### Build status
[![Build Status](https://travis-ci.org/NonsoAmadi10/Auto-Mart.svg?branch=develop)](https://travis-ci.org/NonsoAmadi10/Auto-Mart)
[![Coverage Status](https://coveralls.io/repos/github/NonsoAmadi10/Auto-Mart/badge.svg?branch=develop)](https://coveralls.io/github/NonsoAmadi10/Auto-Mart?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7cd8c9394ca4e3c2039c/maintainability)](https://codeclimate.com/github/NonsoAmadi10/Auto-Mart/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7cd8c9394ca4e3c2039c/test_coverage)](https://codeclimate.com/github/NonsoAmadi10/Auto-Mart/test_coverage)


### Required Features
1. User can sign up.
2. User can sign in.
3. User (seller) can post a car sale advertisement.
4. User (buyer) can make a purchase order.
5. User (buyer) can update the price of his/her purchase order.
6. User (seller) can mark his/her posted AD as sold.
7. User (seller) can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.

### Extra Feature
- User can report a car advert
  

### Useful Links

- This project is being managed with  [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2346959)
- The UI templates are hosted here [Github pages](https://nonsoamadi10.github.io/Auto-Mart/)
- The API URL has been succesfully deployed to heroku. It can be accessed [here](https://automart-api-2019.herokuapp.com)


### Technologies 
- [NodeJS](https://nodejs.org) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
 
- [Express](https://expressjs.com) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  
- [ES Lint](https://eslint.org) A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

- [Babel](https://babeljs.io) Babel is a JavaScript compiler. Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. 

#### Tools
- [Postman](https://getpostman.com) Postman is the only complete API development environment, and flexibly integrates with the software development cycle.
- [Swagger](https://swagger.io) Swagger aides in development across the entire API lifecycle, from design and documentation, to test and deployment. 
- **Testing**
    - [Mocha](https://mochajs.org) Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. 
    - [Chai](https://chaijs.com) Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.
- [Heroku](https://heroku.com) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Cloudinary](https://cloudinary.com) is a cloud-based image and video management solution. It enables users to upload, store, manage, manipulate and deliver images and video for websites and apps.
- [Travis CI](https://travis-ci.org)  is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
- [Coveralls](https://coveralls.io) Coveralls is a hosted analysis tool, providing statistics about your code coverage. 
- [CodeClimate](https://codeclimate.com) provides automated code review for test coverage, maintainability and more so that you can save time and merge with confidence.


### Installations
 ##### Getting Started
 - You need to have [node](https://nodejs.org) installed on your system 
 - You need to have a [cloudinary](https://cloudinary.com) account in order to get an API secret as well as an API key.
  
 ##### Clone 
 - To clone this repo, you need to open a command line terminal and run : `  git clone https://github.com/NonsoAmadi10/Auto-Mart.git `

##### Install
- Install all depencies used in this project by running ` npm install `

- Set the following environment variables in your .env file:

  - PORT - An Integer specifying the PORT your application will run on.
  - JWT_SECRET - A random string used for generation authorization tokens.
  - CLOUDINARY_NAME => [your name on cloudinary](https://cloudinary.com)
  - CLOUDINARY_API_KEY=> [your cloudinary_ secret key](https://cloudinary.com)
  - CLOUDINARY_API_SECRET=> [your cloudinary secret](https://cloudinary.com)


### Starting the server locally
- Run ` npm run dev-start ` to start the server

#### Testing App with Postman
- Open postman 
- Test with api endpoints found [here](https://automart-api-2019.herokuapp.com/api-docs)
##### Testing with mocha and chai
- ``` Run npm test ``` to see test pass locally


### Author 
- Amadi Justice Chinonso

### Acknowledgement
- I learned how to use swagger using this [resource](https://itnext.io/setting-up-swagger-in-a-node-js-application-d3c4d7aa56d4)
- I learned how to upload to cloudinary using this [article](https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54)
  
