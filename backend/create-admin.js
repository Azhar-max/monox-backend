const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    
    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: 'admin@manox.com' });
    
    if (existingAdmin) {
      // Update the password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      existingAdmin.passwordHash = hashedPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin user updated successfully!');
      console.log('Email: admin@manox.com');
      console.log('Password: admin123');
    } else {
      // Create new admin user
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@manox.com',
        passwordHash: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin user created successfully!');
      console.log('Email: admin@manox.com');
      console.log('Password: admin123');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.connection.close();
  }
});