import app from './app';

app.get('/',(req, res)=>{
 res.send({
  message: "Welcome to Automart"
 })
})

app.listen(3000, ()=>{
 console.log('App is running...')
})

export default app