import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import cookieParser from 'cookie-parser';
import postsController from './controllers/posts.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

if (app) {
  console.log('hi');
}

app.use(authController);
app.use(postsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
