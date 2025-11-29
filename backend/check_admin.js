require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox';

async function checkAdmin() {
  await mongoose.connect(MONGO, {});
  
  const admin = await User.findOne({ email: 'admin@manox.com' });
  
  if (admin) {
    console.log('Admin user found:');
    console.log('  ID:', admin._id);
    console.log('  Name:', admin.name);
    console.log('  Email:', admin.email);
    console.log('  Role:', admin.role);
    console.log('  Created At:', admin.createdAt);
  } else {
    console.log('Admin user not found');
  }
  
  await mongoose.connection.close();
}

checkAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});