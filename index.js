const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const storeRoutes = require('./routes/store');
const userRoutes = require('./routes/user');

const port = process.env.PORT || 8000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(
    `mongodb+srv://RodolpheBeloncle:${process.env.MONGO_PASSWORD}@cluster0.aafic.mongodb.net/wine-cellar?retryWrites=true&w=majority`
  )
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err);
  });

// routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/user', userRoutes);

app.use('/uploads', express.static('uploads'));
// serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
