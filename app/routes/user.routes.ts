import express from 'express';
import { login, signup } from '../controllers/user.controller';

const app = express.Router();


app.use('/register',signup)
app.use('/login',login)

export const registerRoute = app;