const createUsers = 
`CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
   is_admin VARCHAR(20) NOT NULL
);
`;

const createCars = 
`CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    ownerid INTEGER REFERENCES users(id),
    owneremail VARCHAR(50),
    createdon TIMESTAMP NOT NULL,
    state VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    manufacturer VARCHAR(155) NOT NULL,
    model VARCHAR(50) NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    flagged BOOLEAN 
);
`;

const createOrders = 
` CREATE TABLE IF NOT EXISTS orders (
 id SERIAL PRIMARY KEY,
 car_id INTEGER REFERENCES cars(id),
 buyer_id INTEGER REFERENCES users(id),
 amount NUMERIC,
 status CHAR(50)
);
`;

const createFlags =  
` CREATE TABLE IF NOT EXISTS flags (
 id SERIAL PRIMARY KEY,
 car_id INTEGER REFERENCES users(id),
 reason VARCHAR(255) NOT NULL,
 description VARCHAR(255) NOT NULL,
 createdon TIMESTAMP NOT NULL
);
`;

const createQuery = `${createUsers}${createCars}${createOrders}${createFlags}`;

export default createQuery;
