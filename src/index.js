import express from 'express';
import userRoutes from './routes/user.route';
import carRoutes from './routes/cars.route';
import orderRoutes from './routes/orders.route';
import flagRoutes from './routes/flag.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use('/api/v1', userRoutes);
app.use('/api/v1', carRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', flagRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
});


app.listen(4200, () => {
  console.log('App is running...');
});

export default app;


