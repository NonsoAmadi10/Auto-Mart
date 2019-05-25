import express from 'express';
import babelpolyfill from '@babel/polyfill';
import userRoutes from './routes/user.route';
import carRoutes from './routes/cars.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use('/uploads',express.static('uploads'));

app.use('/api/v1', userRoutes);
app.use('/api/v1', carRoutes);


app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
});


app.listen(8000, ()=>{
  console.log('App is running...')
 })
 
 export default app;


