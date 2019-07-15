import express from 'express';
import '@babel/polyfill';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.route';
import carRoutes from './routes/cars.route';
import OrderRoutes from './routes/orders.route';
import FlagRoutes from './routes/flag.route';
import swaggerDocs from '../swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Enable cors
app.use(cors());

// Serve UI templates

app.use(express.static('UI'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use('/auth', userRoutes);
app.use('/car', carRoutes);
app.use('/order', OrderRoutes);
app.use('/flag', FlagRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-methods', 'GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Catch all Unassigned Routes 
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'no route has been assigned to that URL',
  });
});


app.listen(process.env.PORT || 4200, () => {
  console.log('App is running...');
});

export default app;


