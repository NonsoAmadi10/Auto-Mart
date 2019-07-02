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

app.use('/api/v1', userRoutes);
app.use('/api/v1', carRoutes);
app.use('/api/v1', OrderRoutes);
app.use('/api/v1', FlagRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
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


