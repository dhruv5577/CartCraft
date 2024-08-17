import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ProductRouter from './Routes/ProductRoutes.js';
import errorhandler from './Middlewares/ErrorHandler.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // Use a default port if not defined

// Unhandle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err}`);
  console.log("Shutting down the services");
  process.exit(1);
});

// DB connection
mongoose.connect(process.env.MONGO_LOCAL_URL)
  .then(() => console.log('DB connected'))
  .catch((e) => {
    console.error('Error connecting to DB:', e);
    process.exit(1);
  });

app.use(express.json());

// Production Routes
app.use('/', ProductRouter);
app.use(errorhandler);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

// Unhandle promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err}`);
  console.log("Shutting down the services");
  server.close(() => {
    process.exit(1);
  });
});
