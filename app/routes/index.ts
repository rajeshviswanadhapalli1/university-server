import express, { NextFunction, Request, Response } from 'express';
import { registerRoute } from './user.routes';


const routes = express.Router();


routes.get('/', (req: Request, res: Response) => {
    res.send('Welcome to University Api version 1.0 ');
  });
  
  // auth routes /api/v1/auth
  routes.use('/user', registerRoute);

  export = routes;