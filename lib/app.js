import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import cookieParser from 'cookie-parser';
import postController from './controllers/posts.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

if (app) {
  console.log('hi');
}

app.use(authController);
app.use('/api/v1/posts', postController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
