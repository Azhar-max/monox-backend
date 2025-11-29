const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/manox')
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });