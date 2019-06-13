const dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropCars = 'DROP TABLE IF EXISTS cars CASCADE; ';
const dropOrders = 'DROP TABLE IF EXISTS orders CASCADE; ';
const dropFlags = 'DROP TABLE IF EXISTS flags CASCADE; ';

const dropQuery = `${dropUsers}${dropCars}${dropOrders}${dropFlags}`;

export default dropQuery;