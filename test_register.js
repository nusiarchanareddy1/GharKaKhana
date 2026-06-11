const axios = require('axios');

const testRegister = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User 2',
            email: 'test2@example.com',
            password: 'password',
            role: 'cook',
            bio: 'test bio',
            phone: '1234567890'
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

testRegister();
