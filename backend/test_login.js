const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:3002/api/auth/login', {
      email: 'admin@manox.com',
      password: 'admin123'
    });
    
    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
    
    // Check if role is included
    if (response.data.user.role) {
      console.log('Role included in response:', response.data.user.role);
    } else {
      console.log('ERROR: Role NOT included in response');
    }
  } catch (error) {
    console.log('Login failed:', error.response?.data || error.message);
  }
}

testLogin();