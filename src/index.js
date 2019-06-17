import express from 'express';
import '@babel/polyfill';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.route';
import carRoutes from './routes/cars.route';
import OrderRoutes from './routes/orders.route';
import swaggerDocs from '../swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', userRoutes);
app.use('/api/v1', carRoutes);
app.use('/api/v1', OrderRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
});


app.listen(process.env.PORT || 4200, () => {
  console.log('App is running...');
});

export default app;


