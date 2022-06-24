
/// import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRoutes from './server/routes/main.js';

// set up dependencies
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/api/',mainRoutes);
app.use('/api-product/',mainRoutes);

var url= "mongodb+srv://Toantran-test:toan123456@test.tgsyunq.mongodb.net/Test1?retryWrites=true&w=majority";

// set up mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// set up port
const port = 5035;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
