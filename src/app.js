import dotenv from 'dotenv';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { router as apiRouter } from './api/index.js';
import { router as registerRouter } from './auth/api.js';
import passport from './auth/passport.js';
import { errorHandler, notFoundHandler } from './error.js';


dotenv.config();
const { PORT: port = 3000,
        DATABASE_URL: connectionString, } = process.env;

if (!connectionString) {
  console.error('Vantar env gildi');
  process.exit(1);
}

const app = express();

// Sér um að req.body innihaldi gögn úr formi
app.use(express.urlencoded({ extended: true }));
const path = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(path, '../public')));
app.set('views', join(path, '../views'));
app.set('view engine', 'ejs');



// Notum JSON middleware til að geta tekið við JSON frá client
app.use(express.json());

app.use(passport.initialize());

function availableRoutes(req, res) {
  res.json(apiRouter.stack);
}
app.get('/', availableRoutes);

app.use(registerRouter);
app.use(apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
