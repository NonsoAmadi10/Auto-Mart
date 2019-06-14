import dotenv from 'dotenv';

import { Pool } from 'pg';

dotenv.config();

const env = process.env.NODE_ENV;

const pool = env === 'test'? new Pool({connectionString: process.env.TEST_DB }) : new Pool({connectionString: process.env.DB });

export default pool;