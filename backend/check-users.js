const mongoose = require('mongoose');
const User = require('./src/models/user');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  try {
    console.log('Connected to MongoDB');
    
    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email} | Role: ${user.role || 'user'} | Name: ${user.name}`);
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.connection.close();
  }
});