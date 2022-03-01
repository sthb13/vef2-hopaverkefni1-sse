import dotenv from 'dotenv';
import express from 'express';
import passport from './auth/passport.js';
import { errorHandler, notFoundHandler } from './error.js';
import { router as registerRouter } from './auth/api.js';


dotenv.config();
const { PORT: port = 3000,
        SESSION_SECRET: sessionSecret,
        DATABASE_URL: connectionString, } = process.env;

if (!connectionString) {
  console.error('Vantar env gildi');
  process.exit(1);
}

const app = express();

// Notum JSON middleware til að geta tekið við JSON frá client
app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({
    test:'tests'
  });
});

app.use(registerRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info('Server running at http://localhost:3000/');
});
