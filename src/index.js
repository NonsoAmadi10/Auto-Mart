import express from 'express';
import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());


app.use('/api/v1', userRoutes);


app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Automart',
  });
});


app.listen(3000, ()=>{
  console.log('App is running...')
 })
 
 export default app;


