import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRotes from './routes/auth.router.js';
import problemRoute from './routes/problem.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('welcome to codeCracker');
});

app.use('/api/v1/auth', authRotes);
app.use('/api/v1/problems', problemRoute);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Server listening on PORT', port);
});
