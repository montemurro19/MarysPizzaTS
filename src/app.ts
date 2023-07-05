import express from 'express';
import { router } from './routes/Item';
//import { errorHandler } from './config/error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use(errorHandler);
app.use(router);

export { app };
