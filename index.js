import express from 'express';
import dbConnect from './dbConnect.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes.js';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({
  origin: '*', // Specify the allowed origin(s)
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//ROUTES
app.use('/api', router);

dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});clea