
import express,{ NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './app/routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to University Api version 1.0 ');
  });
const DB_URI = 'mongodb+srv://rajesh:E4dc7kd7pGcJrTR@cluster0.bfixr1o.mongodb.net/university_app?retryWrites=true&w=majority';
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.use('/api/v1', routes);
